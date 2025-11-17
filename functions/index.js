const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

if (!admin.apps.length) {
	admin.initializeApp();
}

// Cloudflare R2 configuratie (S3-compatible)
const R2_ACCOUNT_ID = functions.config().r2?.account_id || process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = functions.config().r2?.access_key_id || process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = functions.config().r2?.secret_access_key || process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = functions.config().r2?.bucket_name || process.env.R2_BUCKET_NAME || 'reizen';
// Public URL kan een custom domain zijn of de R2 public URL (https://pub-ACCOUNT_ID.r2.dev)
const R2_PUBLIC_URL = functions.config().r2?.public_url || process.env.R2_PUBLIC_URL || (R2_ACCOUNT_ID ? `https://pub-${R2_ACCOUNT_ID}.r2.dev` : null);

// S3 Client voor R2
const s3Client = new S3Client({
	region: 'auto',
	endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: R2_ACCESS_KEY_ID,
		secretAccessKey: R2_SECRET_ACCESS_KEY,
	},
});

// Nederlandse maandnamen mapping
const monthNames = {
	'januari': 0, 'februari': 1, 'maart': 2, 'april': 3,
	'mei': 4, 'juni': 5, 'juli': 6, 'augustus': 7,
	'september': 8, 'oktober': 9, 'november': 10, 'december': 11
};

/**
 * Parseert Nederlandse datum tekst naar Date object
 */
function parseDutchDate(dateString) {
	if (!dateString || typeof dateString !== 'string') {
		return null;
	}

	// Probeer verschillende formaten te matchen
	const patterns = [
		// "woensdag 3 december 2025" of "3 december 2025"
		/(?:(?:maandag|dinsdag|woensdag|donderdag|vrijdag|zaterdag|zondag)\s+)?(\d{1,2})\s+(\w+)\s+(\d{4})/i,
		// "3/12/2025" of "3-12-2025"
		/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/,
		// "2025-12-03" (ISO format)
		/(\d{4})-(\d{1,2})-(\d{1,2})/
	];

	for (const pattern of patterns) {
		const match = dateString.match(pattern);
		if (match) {
			let day, month, year;

			if (pattern === patterns[0]) {
				// Nederlandse maand naam
				day = parseInt(match[1]);
				const monthName = match[2].toLowerCase();
				month = monthNames[monthName];
				year = parseInt(match[3]);
			} else if (pattern === patterns[1]) {
				// DD/MM/YYYY of DD-MM-YYYY
				day = parseInt(match[1]);
				month = parseInt(match[2]) - 1; // JavaScript maanden zijn 0-based
				year = parseInt(match[3]);
			} else if (pattern === patterns[2]) {
				// YYYY-MM-DD (ISO)
				year = parseInt(match[1]);
				month = parseInt(match[2]) - 1; // JavaScript maanden zijn 0-based
				day = parseInt(match[3]);
			}

			if (month !== undefined && day && year) {
				// Maak Date object
				const date = new Date(year, month, day);
				// Valideer dat de datum correct is
				if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
					return date;
				}
			}
		}
	}

	return null;
}

/**
 * Controleert of een datum verstreken is
 */
function isDatePassed(dateInput) {
	if (!dateInput) return false;
	
	let date;
	if (typeof dateInput === 'string') {
		date = parseDutchDate(dateInput);
	} else if (dateInput instanceof Date) {
		date = dateInput;
	} else {
		return false;
	}

	if (!date) return false;

	// Huidige datum
	const now = new Date();
	
	// Vergelijk alleen de datum (niet de tijd)
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
	const eventDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
	
	return eventDate < today;
}

exports.createAdminUser = functions.https.onCall(async (data, context) => {
	if (!context.auth || context.auth.token?.admin !== true) {
		throw new functions.https.HttpsError('permission-denied', 'Admin privileges required');
	}

	const email = (data && data.email) || '';
	const password = (data && data.password) || '';
	if (!email || !password) {
		throw new functions.https.HttpsError('invalid-argument', 'email and password are required');
	}

	try {
		const user = await admin.auth().createUser({ email, password, emailVerified: true, disabled: false });
		await admin.auth().setCustomUserClaims(user.uid, { admin: true });
		return { uid: user.uid, email: user.email, admin: true };
	} catch (err) {
		throw new functions.https.HttpsError('internal', err?.message || String(err));
	}
});

/**
 * Cloud Function die dagelijks controleert op verstreken infoavonden
 * en deze automatisch depubliceert
 */
exports.checkExpiredInfoavonden = functions.pubsub.schedule('0 2 * * *').timeZone('Europe/Brussels').onRun(async (context) => {
	console.log('Starting daily check for expired infoavonden...');
	
	try {
		const db = admin.firestore();
		
		// Haal alle events op
		const eventsSnapshot = await db.collection('events').get();
		const expiredEvents = [];
		
		for (const doc of eventsSnapshot.docs) {
			const eventData = doc.data();
			const eventId = doc.id;
			
			// Controleer of event gepubliceerd is en datum verstreken
			if (eventData.published && eventData.dateTime && isDatePassed(eventData.dateTime)) {
				expiredEvents.push({
					id: eventId,
					title: eventData.title,
					dateTime: eventData.dateTime
				});
				
				// Depubliceer het event
				await db.collection('events').doc(eventId).update({
					published: false,
					expiredAt: admin.firestore.FieldValue.serverTimestamp(),
					updatedAt: admin.firestore.FieldValue.serverTimestamp()
				});
				
				console.log(`Depublished expired event: ${eventData.title} (${eventData.dateTime})`);
			}
		}
		
		// Controleer ook trips die verwijzen naar verstreken events
		const tripsSnapshot = await db.collection('trips').get();
		let updatedTrips = 0;
		
		for (const doc of tripsSnapshot.docs) {
			const tripData = doc.data();
			const tripId = doc.id;
			
			if (tripData.sections?.infoavond?.slug) {
				// Zoek het event
				const eventQuery = await db.collection('events')
					.where('slug', '==', tripData.sections.infoavond.slug)
					.limit(1)
					.get();
				
				if (!eventQuery.empty) {
					const eventDoc = eventQuery.docs[0];
					const eventData = eventDoc.data();
					
					// Als event verstreken is, verwijder infoavond sectie van trip
					if (eventData.dateTime && isDatePassed(eventData.dateTime)) {
						await db.collection('trips').doc(tripId).update({
							'sections.infoavond': admin.firestore.FieldValue.delete(),
							updatedAt: admin.firestore.FieldValue.serverTimestamp()
						});
						
						updatedTrips++;
						console.log(`Removed expired infoavond from trip: ${tripData.title}`);
					}
				}
			}
		}
		
		console.log(`Check completed. Depublished ${expiredEvents.length} events and updated ${updatedTrips} trips.`);
		
		return {
			success: true,
			expiredEvents: expiredEvents.length,
			updatedTrips: updatedTrips,
			timestamp: new Date().toISOString()
		};
		
	} catch (error) {
		console.error('Error in checkExpiredInfoavonden:', error);
		throw error;
	}
});

/**
 * Handmatige functie om verstreken infoavonden te controleren (voor testing)
 */
exports.manualCheckExpiredInfoavonden = functions.https.onCall(async (data, context) => {
	// Alleen admins kunnen deze functie aanroepen
	if (!context.auth || context.auth.token?.admin !== true) {
		throw new functions.https.HttpsError('permission-denied', 'Admin privileges required');
	}
	
	console.log('Manual check for expired infoavonden triggered by admin...');
	
	try {
		const db = admin.firestore();
		
		// Haal alle events op
		const eventsSnapshot = await db.collection('events').get();
		const expiredEvents = [];
		
		for (const doc of eventsSnapshot.docs) {
			const eventData = doc.data();
			const eventId = doc.id;
			
			// Controleer of event gepubliceerd is en datum verstreken
			if (eventData.published && eventData.dateTime && isDatePassed(eventData.dateTime)) {
				expiredEvents.push({
					id: eventId,
					title: eventData.title,
					dateTime: eventData.dateTime
				});
				
				// Depubliceer het event
				await db.collection('events').doc(eventId).update({
					published: false,
					expiredAt: admin.firestore.FieldValue.serverTimestamp(),
					updatedAt: admin.firestore.FieldValue.serverTimestamp()
				});
			}
		}
		
		// Controleer ook trips die verwijzen naar verstreken events
		const tripsSnapshot = await db.collection('trips').get();
		let updatedTrips = 0;
		
		for (const doc of tripsSnapshot.docs) {
			const tripData = doc.data();
			const tripId = doc.id;
			
			if (tripData.sections?.infoavond?.slug) {
				// Zoek het event
				const eventQuery = await db.collection('events')
					.where('slug', '==', tripData.sections.infoavond.slug)
					.limit(1)
					.get();
				
				if (!eventQuery.empty) {
					const eventDoc = eventQuery.docs[0];
					const eventData = eventDoc.data();
					
					// Als event verstreken is, verwijder infoavond sectie van trip
					if (eventData.dateTime && isDatePassed(eventData.dateTime)) {
						await db.collection('trips').doc(tripId).update({
							'sections.infoavond': admin.firestore.FieldValue.delete(),
							updatedAt: admin.firestore.FieldValue.serverTimestamp()
						});
						
						updatedTrips++;
					}
				}
			}
		}
		
		return {
			success: true,
			expiredEvents: expiredEvents.length,
			updatedTrips: updatedTrips,
			expiredEventsList: expiredEvents,
			timestamp: new Date().toISOString()
		};
		
	} catch (error) {
		console.error('Error in manual check:', error);
		throw new functions.https.HttpsError('internal', error.message);
	}
});

/**
 * Cloudflare R2 image upload functie
 * Upload afbeeldingen naar Cloudflare R2 bucket via Firebase Function
 */
exports.uploadImageToR2 = functions.https.onCall(async (data, context) => {
	// Alleen admins kunnen uploaden
	if (!context.auth || context.auth.token?.admin !== true) {
		throw new functions.https.HttpsError('permission-denied', 'Admin privileges required');
	}

	if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
		throw new functions.https.HttpsError('failed-precondition', 'R2 credentials niet geconfigureerd');
	}

	try {
		const { fileData, fileName, contentType } = data;

		if (!fileData || !fileName) {
			throw new functions.https.HttpsError('invalid-argument', 'fileData en fileName zijn verplicht');
		}

		// Converteer base64 naar buffer
		const base64Data = fileData.replace(/^data:image\/\w+;base64,/, '');
		const buffer = Buffer.from(base64Data, 'base64');

		// Genereer unieke bestandsnaam
		const timestamp = Date.now();
		const ext = fileName.split('.').pop() || 'jpg';
		const uniqueFileName = `images/${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`;

		// Upload naar R2
		const command = new PutObjectCommand({
			Bucket: R2_BUCKET_NAME,
			Key: uniqueFileName,
			Body: buffer,
			ContentType: contentType || 'image/jpeg',
			CacheControl: 'public, max-age=31536000', // 1 jaar cache
		});

		await s3Client.send(command);

		// Retourneer publieke URL
		const publicUrl = `${R2_PUBLIC_URL}/${uniqueFileName}`;
		console.log('Image succesvol geüpload naar R2:', publicUrl);

		return { url: publicUrl };
	} catch (error) {
		console.error('R2 upload error:', error);
		throw new functions.https.HttpsError('internal', error.message || 'Upload mislukt');
	}
});
