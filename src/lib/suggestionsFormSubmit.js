/** Publiek suggestieformulier → FormSubmit AJAX (gebruiker blijft op de pagina). */

/** Geactiveerd FormSubmit-doel (reizen.focus-wtv.be + dit adres). */
export const SUGGESTIE_RECIPIENT = 'reizen@focus-wtv.be';

const REQUEST_TIMEOUT_MS = 20000;

function isFormSubmitOk(data) {
	if (!data) return true;
	if (data.success === false || data.success === 'false') return false;
	const text = `${data.message || ''} ${data.next || ''}`;
	if (/needs activation|activate form|confirm your email/i.test(text)) return false;
	return true;
}

/**
 * Officiële FormSubmit AJAX: POST naar /ajax/{email} met urlencoded velden
 * (zoals hun jQuery-voorbeeld), niet application/json.
 * @param {{ naam: string, email: string, suggestie: string }} payload
 * @returns {Promise<boolean>}
 */
export async function submitSuggestion({ naam, email, suggestie }) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		const url = `https://formsubmit.co/ajax/${encodeURIComponent(SUGGESTIE_RECIPIENT)}`;
		const body = new URLSearchParams();
		body.set('_subject', 'Suggestie via Focus-WTV reizen-site');
		body.set('_template', 'table');
		body.set('_captcha', 'false');
		body.set('_replyto', email);
		body.set('email', email);
		body.set('Naam', naam);
		body.set('Mailadres', email);
		body.set('Suggestie', suggestie);

		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				Accept: 'application/json',
			},
			body: body.toString(),
			signal: controller.signal,
		});
		if (!res.ok) return false;
		try {
			const data = await res.json();
			return isFormSubmitOk(data);
		} catch {
			return true;
		}
	} catch {
		return false;
	} finally {
		clearTimeout(timeout);
	}
}
