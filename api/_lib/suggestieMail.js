/** Suggestiemail via Resend — los van Flexmail, infoavond en FormSubmit. */

/** Productie-ontvanger suggesties (Resend). */
export const SUGGESTIE_RECIPIENT = 'reizen@focus-wtv.be';

const RESEND_FROM = 'Focus-WTV reizen <onboarding@resend.dev>';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUGGESTIE_MIN_LENGTH = 10;

export function normalizeSuggestiePayload(body) {
	const naam = String(body?.naam || '').trim();
	const email = String(body?.email || '').trim();
	const suggestie = String(body?.suggestie || '').trim();
	return { naam, email, suggestie };
}

export function isValidSuggestiePayload({ naam, email, suggestie }) {
	if (!naam) return false;
	if (!EMAIL_PATTERN.test(email)) return false;
	if (suggestie.length < SUGGESTIE_MIN_LENGTH) return false;
	return true;
}

function escapeHtml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

export async function sendSuggestieMail({ naam, email, suggestie }) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.error('suggestie mail: RESEND_API_KEY missing');
		return false;
	}

	const res = await fetch('https://api.resend.com/emails', {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiKey}`,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			from: RESEND_FROM,
			to: [SUGGESTIE_RECIPIENT],
			reply_to: email,
			subject: 'Suggestie via Focus-WTV reizen-site',
			html: [
				'<p>Nieuwe suggestie via de reizen-site.</p>',
				`<p><strong>Naam:</strong> ${escapeHtml(naam)}</p>`,
				`<p><strong>Mailadres:</strong> ${escapeHtml(email)}</p>`,
				`<p><strong>Suggestie:</strong><br>${escapeHtml(suggestie).replace(/\n/g, '<br>')}</p>`,
			].join(''),
		}),
	});

	if (!res.ok) {
		console.error('suggestie Resend', res.status);
		return false;
	}
	return true;
}
