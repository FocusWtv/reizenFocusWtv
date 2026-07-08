import admin from 'firebase-admin';

let cached = null;

/**
 * Lazy Firebase Admin init. Wordt pas uitgevoerd bij een echte request,
 * zodat een ontbrekende/foute config een nette foutmelding geeft
 * i.p.v. een crash bij het laden van de functie (FUNCTION_INVOCATION_FAILED).
 */
export function getFirebaseAdmin() {
	if (cached) return cached;

	const projectId = process.env.FIREBASE_PROJECT_ID;
	const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
	const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

	const missing = [
		!projectId && 'FIREBASE_PROJECT_ID',
		!clientEmail && 'FIREBASE_CLIENT_EMAIL',
		!privateKey && 'FIREBASE_PRIVATE_KEY',
	].filter(Boolean);
	if (missing.length > 0) {
		throw new Error(`Firebase server-config ontbreekt: ${missing.join(', ')}`);
	}

	const app = admin.apps.length
		? admin.app()
		: admin.initializeApp({
				credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
			});

	cached = {
		admin,
		app,
		authAdmin: admin.auth(),
		dbAdmin: admin.firestore(),
		storageAdmin: admin.storage(),
	};
	return cached;
}
