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
 * Cloudflare R2 image upload functie via Firebase Function
 * Upload afbeeldingen naar Cloudflare R2 bucket met compressie
 */
export const cloudflareUploadImage = async (file) => {
	// Zorg dat het inkomende bestand een naam heeft
	const originalName = (file && file.name) ? file.name : 'upload.jpg';

	// Log bronbestand
	console.log(`Originele foto: ${Math.round((file?.size || 0) / 1024)}KB, comprimeren...`);

	// Stap 1: begin met redelijke dimensies en kwaliteit
	let workingBlob;
	try {
		workingBlob = await resizeImage(file, 1920, 1080, 0.7);
		console.log(`Eerste compressie: ${Math.round(workingBlob.size / 1024)}KB`);
	} catch (error) {
		console.error('Compressie error:', error);
		throw new Error('Afbeelding kon niet worden gecomprimeerd. Probeer een kleinere afbeelding.');
	}

	// Stap 2: indien nodig, iteratief onder 600KB brengen
	const ensureUnderLimit = async (blob, maxBytes = 600 * 1024) => {
		if (blob.size <= maxBytes) return blob;
		const asFile = new File([blob], originalName, { type: 'image/jpeg' });
		const tmpImg = new Image();
		await new Promise((resolve, reject) => {
			const fr = new FileReader();
			fr.onload = (e) => { tmpImg.src = e.target.result; };
			fr.onerror = reject;
			tmpImg.onload = resolve;
			tmpImg.onerror = reject;
			fr.readAsDataURL(asFile);
		});

		let width = tmpImg.width;
		let height = tmpImg.height;
		let quality = 0.7;
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		for (let i = 0; i < 10; i++) {
			canvas.width = width;
			canvas.height = height;
			ctx.drawImage(tmpImg, 0, 0, width, height);
			const out = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
			if (out && out.size <= maxBytes) return out;
			if (quality > 0.5) {
				quality = Math.max(0.4, quality - 0.1);
			} else {
				width = Math.round(width * 0.85);
				height = Math.round(height * 0.85);
			}
		}
		return blob;
	};

	workingBlob = await ensureUnderLimit(workingBlob);
	console.log(`Definitieve grootte: ${Math.round(workingBlob.size / 1024)}KB`);

	// Converteer blob naar base64 voor Firebase Function
	const base64Data = await new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result);
		reader.onerror = reject;
		reader.readAsDataURL(workingBlob);
	});

	const response = await fetch('/api/upload-to-r2', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			fileData: base64Data,
			fileName: originalName,
			contentType: workingBlob.type || 'image/jpeg',
		}),
	});

	// Body maar één keer lezen: na mislukte .json() faalt .text() (stream verbruikt).
	const raw = await response.text();
	let result;
	try {
		result = raw ? JSON.parse(raw) : {};
	} catch {
		const hint = raw ? raw.slice(0, 240) : response.statusText;
		throw new Error(
			`Upload-antwoord is geen geldige JSON (${response.status}): ${hint}`,
		);
	}

	if (!response.ok) {
		const errorMessage = result?.error || raw || 'Cloudflare R2 upload mislukt';
		console.error('R2 upload error:', errorMessage, 'Status:', response.status);
		throw new Error(errorMessage);
	}

	const url = result?.url;
	if (!url) throw new Error('Geen URL in upload-antwoord');
	console.log('Image succesvol geüpload naar Cloudflare R2:', url);
	return url;
};

/**
 * Vercel Blob image upload functie (DEPRECATED - gebruik cloudflareUploadImage)
 * @deprecated Gebruik cloudflareUploadImage in plaats van deze functie
 */
export const vercelUploadImage = cloudflareUploadImage;
