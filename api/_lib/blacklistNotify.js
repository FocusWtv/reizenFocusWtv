/** Interne melding bij blacklist-poging reisupdates (aparte ontvanger, geen globale mailconfig). */

const NOTIFY_TO = 'lindsey.verbauwhede@focus-wtv.be';
const DEDUPE_MS = 15 * 60 * 1000;

/** @type {Map<string, number>} */
const lastNotifiedAt = new Map();

export function shouldSkipBlacklistNotify(email) {
	const key = String(email || '').trim().toLowerCase();
	if (!key) return true;
	const last = lastNotifiedAt.get(key);
	if (last && Date.now() - last < DEDUPE_MS) return true;
	return false;
}

export function markBlacklistNotified(email) {
	const key = String(email || '').trim().toLowerCase();
	if (key) lastNotifiedAt.set(key, Date.now());
}

/**
 * Zelfde FormSubmit AJAX-patroon als publieke formulieren, maar server-side en
 * uitsluitend voor deze blacklist-melding.
 */
export async function sendBlacklistReisupdatesNotification(email) {
	const normalized = String(email || '').trim().toLowerCase();
	if (!normalized || shouldSkipBlacklistNotify(normalized)) {
		return;
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), 8000);
	try {
		const url = `https://formsubmit.co/ajax/${encodeURIComponent(NOTIFY_TO)}`;
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				_subject: 'Reisupdates: inschrijfpoging (blacklist)',
				email: normalized,
				bericht:
					`E-mailadres: ${normalized}\n\n` +
					'Deze persoon wil reisupdates ontvangen via het formulier op de Focus-WTV reizen-site, ' +
					'maar het adres staat op de Flexmail-blacklist.',
				_captcha: 'false',
			}),
			signal: controller.signal,
		});
		if (res.ok) {
			markBlacklistNotified(normalized);
		}
	} catch {
		// Geen details loggen; gebruiker ziet generieke blacklist-melding.
	} finally {
		clearTimeout(timeout);
	}
}
