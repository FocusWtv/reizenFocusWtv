/** Publiek suggestieformulier → FormSubmit AJAX (los van Flexmail en infoavond-flow). */

export const SUGGESTIE_RECIPIENT = 'reizen@focus-wtv.be';

const REQUEST_TIMEOUT_MS = 8000;

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
				Naam: naam,
				Mailadres: email,
				Suggestie: suggestie,
			}),
			signal: controller.signal,
		});
		if (!res.ok) return false;
		try {
			const data = await res.json();
			if (data && data.success === false) return false;
		} catch {
			// FormSubmit kan ok zijn zonder parsebare JSON
		}
		return true;
	} catch {
		return false;
	} finally {
		clearTimeout(timeout);
	}
}
