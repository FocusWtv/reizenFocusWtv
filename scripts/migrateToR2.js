/**
 * Migratie script om bestaande Vercel Blob foto's naar Cloudflare R2 te verplaatsen
 * 
 * Gebruik:
 * 1. Zorg dat je R2 credentials hebt ingesteld in Firebase Functions config
 * 2. Run: node scripts/migrateToR2.js
 * 
 * Dit script:
 * - Haalt alle trips, homepage_cards en events op uit Firestore
 * - Downloadt foto's van Vercel Blob URLs
 * - Uploadt ze naar Cloudflare R2
 * - Update de URLs in Firestore
 */

const admin = require('firebase-admin');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const https = require('https');
const http = require('http');

// Initialize Firebase Admin
const serviceAccount = require('../firebase-service-account.json');
admin.initializeApp({
	credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// R2 Configuratie - pas deze aan met je eigen credentials
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME || 'reizen';
const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL || `https://pub-${R2_ACCOUNT_ID}.r2.dev`;

if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
	console.error('❌ R2 credentials ontbreken!');
	console.error('Zet deze environment variabelen:');
	console.error('  R2_ACCOUNT_ID');
	console.error('  R2_ACCESS_KEY_ID');
	console.error('  R2_SECRET_ACCESS_KEY');
	console.error('  R2_PUBLIC_URL (optioneel)');
	process.exit(1);
}

const s3Client = new S3Client({
	region: 'auto',
	endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: R2_ACCESS_KEY_ID,
		secretAccessKey: R2_SECRET_ACCESS_KEY,
	},
});

// Helper om bestand te downloaden
function downloadFile(url) {
	return new Promise((resolve, reject) => {
		const protocol = url.startsWith('https') ? https : http;
		protocol.get(url, (response) => {
			if (response.statusCode !== 200) {
				reject(new Error(`Failed to download: ${response.statusCode}`));
				return;
			}
			const chunks = [];
			response.on('data', (chunk) => chunks.push(chunk));
			response.on('end', () => resolve(Buffer.concat(chunks)));
			response.on('error', reject);
		}).on('error', reject);
	});
}

// Helper om bestand te uploaden naar R2
async function uploadToR2(buffer, fileName, contentType = 'image/jpeg') {
	const command = new PutObjectCommand({
		Bucket: R2_BUCKET_NAME,
		Key: fileName,
		Body: buffer,
		ContentType: contentType,
		CacheControl: 'public, max-age=31536000',
	});

	await s3Client.send(command);
	return `${R2_PUBLIC_URL}/${fileName}`;
}

// Check of URL een Vercel Blob URL is
function isVercelBlobUrl(url) {
	return url && (url.includes('blob.vercel-storage.com') || url.includes('public.blob.vercel-storage.com'));
}

// Extract bestandsnaam en extensie van URL
function getFileNameFromUrl(url, prefix = 'images') {
	const urlParts = url.split('/');
	const originalFileName = urlParts[urlParts.length - 1].split('?')[0];
	const ext = originalFileName.split('.').pop() || 'jpg';
	const timestamp = Date.now();
	return `${prefix}/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;
}

// Recursief zoeken naar URLs in object
function findImageUrls(obj, path = '') {
	const urls = [];
	
	if (typeof obj !== 'object' || obj === null) return urls;
	
	for (const [key, value] of Object.entries(obj)) {
		const currentPath = path ? `${path}.${key}` : key;
		
		if (typeof value === 'string' && isVercelBlobUrl(value)) {
			urls.push({ url: value, path: currentPath });
		} else if (Array.isArray(value)) {
			value.forEach((item, index) => {
				if (typeof item === 'string' && isVercelBlobUrl(item)) {
					urls.push({ url: item, path: `${currentPath}[${index}]` });
				} else if (typeof item === 'object' && item !== null) {
					urls.push(...findImageUrls(item, `${currentPath}[${index}]`));
				}
			});
		} else if (typeof value === 'object' && value !== null) {
			urls.push(...findImageUrls(value, currentPath));
		}
	}
	
	return urls;
}

// Update URL in object op basis van pad
function updateUrlInObject(obj, path, newUrl) {
	const parts = path.split('.');
	let current = obj;
	
	for (let i = 0; i < parts.length - 1; i++) {
		const part = parts[i];
		const arrayMatch = part.match(/^(.+)\[(\d+)\]$/);
		
		if (arrayMatch) {
			const [, key, index] = arrayMatch;
			current = current[key][parseInt(index)];
		} else {
			current = current[part];
		}
	}
	
	const lastPart = parts[parts.length - 1];
	const arrayMatch = lastPart.match(/^(.+)\[(\d+)\]$/);
	
	if (arrayMatch) {
		const [, key, index] = arrayMatch;
		current[key][parseInt(index)] = newUrl;
	} else {
		current[lastPart] = newUrl;
	}
}

// Migreer één document
async function migrateDocument(collectionName, docId, docData) {
	const imageUrls = findImageUrls(docData);
	
	if (imageUrls.length === 0) {
		return { migrated: 0, skipped: true };
	}
	
	console.log(`\n📄 ${collectionName}/${docId}: ${imageUrls.length} foto(s) gevonden`);
	
	const updates = {};
	let migrated = 0;
	
	for (const { url, path } of imageUrls) {
		try {
			console.log(`  ⬇️  Downloaden: ${url.substring(0, 60)}...`);
			const buffer = await downloadFile(url);
			
			const fileName = getFileNameFromUrl(url);
			console.log(`  ⬆️  Uploaden naar R2: ${fileName}`);
			const newUrl = await uploadToR2(buffer, fileName);
			
			updateUrlInObject(updates, path, newUrl);
			migrated++;
			console.log(`  ✅ Gemigreerd: ${newUrl}`);
		} catch (error) {
			console.error(`  ❌ Fout bij migratie van ${url}:`, error.message);
		}
	}
	
	if (migrated > 0) {
		// Merge updates met bestaande data
		const updatedData = { ...docData };
		for (const [path, newUrl] of Object.entries(updates)) {
			updateUrlInObject(updatedData, path, newUrl);
		}
		
		// Update Firestore
		await db.collection(collectionName).doc(docId).update({
			...updatedData,
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		});
		
		console.log(`  💾 Firestore bijgewerkt`);
	}
	
	return { migrated, skipped: false };
}

// Hoofdfunctie
async function main() {
	console.log('🚀 Start migratie van Vercel Blob naar Cloudflare R2\n');
	
	const collections = ['trips', 'homepage_cards', 'events'];
	let totalMigrated = 0;
	let totalSkipped = 0;
	
	for (const collectionName of collections) {
		console.log(`\n📦 Verwerken van collectie: ${collectionName}`);
		const snapshot = await db.collection(collectionName).get();
		
		if (snapshot.empty) {
			console.log(`  ⚠️  Geen documenten gevonden`);
			continue;
		}
		
		console.log(`  📊 ${snapshot.size} document(en) gevonden`);
		
		for (const doc of snapshot.docs) {
			const result = await migrateDocument(collectionName, doc.id, doc.data());
			if (result.skipped) {
				totalSkipped++;
			} else {
				totalMigrated += result.migrated;
			}
			
			// Kleine pauze om rate limiting te voorkomen
			await new Promise(resolve => setTimeout(resolve, 500));
		}
	}
	
	console.log('\n✅ Migratie voltooid!');
	console.log(`   📊 Totaal gemigreerd: ${totalMigrated} foto(s)`);
	console.log(`   ⏭️  Overgeslagen: ${totalSkipped} document(en)`);
}

main().catch(console.error).finally(() => process.exit(0));

