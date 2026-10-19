/** Publiek suggestieformulier → FormSubmit AJAX (los van Flexmail en infoavond-flow). */

/** Geactiveerd FormSubmit-doel (reizen.focus-wtv.be + dit adres). */
export const SUGGESTIE_RECIPIENT = 'reizen@focus-wtv.be';

const REQUEST_TIMEOUT_MS = 8000;

function isFormSubmitOk(data) {
	if (!data) return true;
	if (data.success === false || data.success === 'false') return false;
	const text = `${data.message || ''} ${data.next || ''}`;
	if (/needs activation|activate form|confirm your email/i.test(text)) return false;
	return true;
}

/**
 * @param {{ naam: string, email: string, suggestie: string }} payload
 * @returns {Promise<boolean>}
 */
export async function submitSuggestion({ naam, email, suggestie }) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		const url = `https://formsubmit.co/ajax/${encodeURIComponent(SUGGESTIE_RECIPIENT)}`;
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				_subject: 'Suggestie via Focus-WTV reizen-site',
				_captcha: 'false',
				_template: 'table',
				email,
				Naam: naam,
				Mailadres: email,
				Suggestie: suggestie,
			}),
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
