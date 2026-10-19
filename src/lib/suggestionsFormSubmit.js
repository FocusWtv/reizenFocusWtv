/** Publiek suggestieformulier → FormSubmit AJAX (los van Flexmail en infoavond-flow). */

/** FormSubmit-hash i.p.v. naakt e-mailadres (minder activatie-mails + e-mail niet in de bundle). */
export const SUGGESTIE_FORMSUBMIT_ID = 'b6d28924f173a361f695be9360ee7276';

const REQUEST_TIMEOUT_MS = 8000;

function isActivationPendingMessage(data) {
	const text = `${data?.message || ''} ${data?.next || ''}`.toLowerCase();
	return /activat|confirm your email|check your email/i.test(text);
}

/**
 * @param {{ naam: string, email: string, suggestie: string }} payload
 * @returns {Promise<boolean>}
 */
export async function submitSuggestion({ naam, email, suggestie }) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		const url = `https://formsubmit.co/ajax/${encodeURIComponent(SUGGESTIE_FORMSUBMIT_ID)}`;
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
			if (isActivationPendingMessage(data)) return false;
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
