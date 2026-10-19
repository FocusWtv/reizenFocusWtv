import { getFirebaseAdmin } from './firebaseAdmin.js';

/** Bewaar suggestie server-side (Admin SDK, los van Flexmail en infoavond). */
export async function saveSuggestie(payload) {
	const { dbAdmin } = getFirebaseAdmin();
	await dbAdmin.collection('reis_suggesties').add({
		naam: payload.naam,
		email: payload.email,
		suggestie: payload.suggestie,
		source: 'homepage',
		createdAt: new Date().toISOString(),
	});
	return true;
}
