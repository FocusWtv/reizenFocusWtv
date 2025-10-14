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

/**
 * Cloudinary PDF upload functie (DEPRECATED - gebruik githubUploadPdf voor gratis alternatief)
 */
export const cloudinaryUploadPdf = async (file) => {
	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
	const pdfUploadPreset = import.meta.env.VITE_CLOUDINARY_PDF_UPLOAD_PRESET || import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
	if (!cloudName || !pdfUploadPreset) {
		throw new Error('Cloudinary niet geconfigureerd');
	}
	const formData = new FormData();
	formData.append('file', file);
	formData.append('upload_preset', pdfUploadPreset);
	const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`, { 
		method: 'POST', 
		body: formData
	});
	const data = await res.json();
	if (!data.secure_url) {
		console.error('PDF upload error:', data);
		throw new Error(data.error?.message || 'PDF upload mislukt - controleer Cloudinary upload preset configuratie voor raw uploads');
	}
	return data.secure_url;
};

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
 * Cloudinary image upload functie met automatische resize
 */
export const cloudinaryUpload = async (file) => {
	const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
	const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
	if (!cloudName || !uploadPreset) {
		throw new Error('Cloudinary niet geconfigureerd');
	}

	// Check file size (10MB limit)
	const maxSize = 10 * 1024 * 1024; // 10MB
	let fileToUpload = file;

	if (file.size > maxSize) {
		console.log(`Image te groot (${Math.round(file.size / 1024 / 1024)}MB), resizen...`);
		try {
			fileToUpload = await resizeImage(file, 1920, 1080, 0.8);
			console.log(`Geresized naar ${Math.round(fileToUpload.size / 1024 / 1024)}MB`);
		} catch (error) {
			console.error('Resize error:', error);
			throw new Error('Afbeelding kon niet worden verwerkt. Probeer een kleinere afbeelding.');
		}
	}

	const formData = new FormData();
	formData.append('file', fileToUpload);
	formData.append('upload_preset', uploadPreset);
	const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { 
		method: 'POST', 
		body: formData
	});
	const data = await res.json();
	if (!data.secure_url) {
		console.error('Image upload error:', data);
		throw new Error(data.error?.message || 'Image upload mislukt');
	}
	return data.secure_url;
};