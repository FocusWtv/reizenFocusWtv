import { auth } from '../config/firebase';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Authenticated fetch helper voor admin endpoints.
 * Gebruik: apiFetch('/api/admin/users/create', { method: 'POST', body: JSON.stringify({...}) })
 */
export async function apiFetch(path, options = {}) {
	const user = auth.currentUser;
	if (!user) {
		throw new Error('Niet ingelogd als admin');
	}

	const idToken = await user.getIdToken();

	const headers = new Headers(options.headers || {});
	headers.set('Authorization', `Bearer ${idToken}`);
	if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
		headers.set('Content-Type', 'application/json');
	}

	const url = `${API_BASE}${path}`;
	const response = await fetch(url, { ...options, headers });
	if (!response.ok) {
		let details = '';
		try {
			const data = await response.json();
			details = data?.error || response.statusText;
		} catch (_e) {
			details = response.statusText;
		}
		throw new Error(`API fout (${response.status}): ${details}`);
	}
	return response;
}

/**
 * GitHub PDF upload functie - gratis en onbeperkt
 * Upload PDF naar GitHub repository en retourneer de raw.githubusercontent.com URL
 */
export const githubUploadPdf = async (file) => {
	const githubToken = import.meta.env.VITE_GITHUB_TOKEN;
	const githubOwner = import.meta.env.VITE_GITHUB_OWNER; // Username of organisatie
	const githubRepo = import.meta.env.VITE_GITHUB_REPO; // Repository naam
	const githubBranch = import.meta.env.VITE_GITHUB_BRANCH || 'main'; // Default: main
	
	if (!githubToken || !githubOwner || !githubRepo) {
		throw new Error('GitHub configuratie ontbreekt. Controleer je .env variabelen (VITE_GITHUB_TOKEN, VITE_GITHUB_OWNER, VITE_GITHUB_REPO)');
	}

	// Genereer een unieke bestandsnaam met timestamp om overschrijving te voorkomen
	const timestamp = Date.now();
	const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
	const fileName = `brochures/${timestamp}-${safeFileName}`;

	// Converteer file naar base64 (GitHub API vereist base64)
	const base64Content = await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const base64 = reader.result.split(',')[1]; // Verwijder data:application/pdf;base64, prefix
			resolve(base64);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});

	// Upload naar GitHub via Contents API
	const apiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${fileName}`;
	
	const response = await fetch(apiUrl, {
		method: 'PUT',
		headers: {
			'Authorization': `Bearer ${githubToken}`,
			'Content-Type': 'application/json',
			'Accept': 'application/vnd.github.v3+json'
		},
		body: JSON.stringify({
			message: `Upload brochure: ${safeFileName}`,
			content: base64Content,
			branch: githubBranch
		})
	});

	if (!response.ok) {
		const errorData = await response.json().catch(() => ({}));
		console.error('GitHub upload error:', errorData);
		throw new Error(errorData.message || `GitHub upload mislukt (${response.status})`);
	}

	const data = await response.json();
	
	// Retourneer de raw.githubusercontent.com URL (gratis CDN)
	const rawUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${githubBranch}/${fileName}`;
	
	console.log('PDF succesvol geupload naar GitHub:', rawUrl);
	return rawUrl;
};

// Cloudinary PDF upload functie was deprecated en is verwijderd.

/**
 * Resize image to fit within max dimensions while maintaining aspect ratio
 */
const resizeImage = (file, maxWidth = 1920, maxHeight = 1080, quality = 0.8) => {
	return new Promise((resolve) => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		const img = new Image();
		
		img.onload = () => {
			// Calculate new dimensions maintaining aspect ratio
			let { width, height } = img;
			
			if (width > maxWidth || height > maxHeight) {
				const ratio = Math.min(maxWidth / width, maxHeight / height);
				width = width * ratio;
				height = height * ratio;
			}
			
			canvas.width = width;
			canvas.height = height;
			
			// Draw and compress
			ctx.drawImage(img, 0, 0, width, height);
			canvas.toBlob(resolve, 'image/jpeg', quality);
		};
		
		img.src = URL.createObjectURL(file);
	});
};

/**
 * Vercel Blob image upload functie met verbeterde compressie
 * Gratis alternatief voor Cloudinary - 1GB opslag, 10GB bandwidth per maand
 */
export const vercelUploadImage = async (file) => {
	const blobReadWriteToken = import.meta.env.VITE_BLOB_READ_WRITE_TOKEN;
	if (!blobReadWriteToken) {
		throw new Error('Vercel Blob niet geconfigureerd. Voeg VITE_BLOB_READ_WRITE_TOKEN toe aan je .env.local');
	}

	// Verbeterde compressie: ALLE foto's comprimeren voor optimale grootte
	let fileToUpload = file;

	// Comprimeer ALLE foto's (niet alleen grote)
	console.log(`Originele foto: ${Math.round(file.size / 1024)}KB, comprimeren...`);
	try {
		// Verbeterde compressie: kleinere max dimensies en lagere kwaliteit
		fileToUpload = await resizeImage(file, 1920, 1080, 0.7);
		console.log(`Gecomprimeerd naar ${Math.round(fileToUpload.size / 1024)}KB (${Math.round((1 - fileToUpload.size / file.size) * 100)}% kleiner)`);
	} catch (error) {
		console.error('Compressie error:', error);
		throw new Error('Afbeelding kon niet worden gecomprimeerd. Probeer een kleinere afbeelding.');
	}

	// Genereer unieke bestandsnaam
	const timestamp = Date.now();
	const fileExtension = file.name.split('.').pop() || 'jpg';
	const fileName = `images/${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`;

	// Gebruik Vercel Blob SDK voor correcte API calls
	const { put } = await import('@vercel/blob');
	
	try {
		const blob = await put(fileName, fileToUpload, {
			access: 'public',
			token: blobReadWriteToken
		});

		console.log('Image succesvol geüpload naar Vercel Blob:', blob.url);
		return blob.url;
	} catch (error) {
		console.error('Vercel Blob upload error:', error);
		throw new Error(error.message || 'Vercel Blob upload mislukt');
	}
};
// Cloudinary image upload functie is verwijderd; nieuwe uploads gaan via Vercel Blob.