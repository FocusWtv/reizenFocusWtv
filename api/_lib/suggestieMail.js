/** Suggestiemail naar reizen@ — los van Flexmail, infoavond en blacklist-notify. */

export const SUGGESTIE_RECIPIENT = 'reizen@focus-wtv.be';

/** Interne kopie, apart verstuurd (geen CC in Caroline haar mail). */
const SUGGESTIE_COPY_TO = 'lindsey.verbauwhede@focus-wtv.be';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SUGGESTIE_MIN_LENGTH = 10;
const REQUEST_TIMEOUT_MS = 8000;

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

function isFormSubmitOk(data) {
	if (!data) return true;
	if (data.success === false || data.success === 'false') return false;
	const text = `${data.message || ''} ${data.next || ''}`;
	if (/needs activation|activate form|confirm your email/i.test(text)) return false;
	return true;
}

async function postFormSubmit(recipient, fields) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		const url = `https://formsubmit.co/ajax/${encodeURIComponent(recipient)}`;
		const body = new URLSearchParams(fields);
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

function suggestieFields({ naam, email, suggestie }, subject) {
	return {
		_subject: subject,
		_template: 'table',
		_captcha: 'false',
		_replyto: email,
		email,
		Naam: naam,
		Mailadres: email,
		Suggestie: suggestie,
	};
}

/** Officiële FormSubmit AJAX, server-side. Bezoeker blijft op de site. */
export async function sendSuggestieMail(payload) {
	const toCaroline = postFormSubmit(
		SUGGESTIE_RECIPIENT,
		suggestieFields(payload, 'Suggestie via Focus-WTV reizen-site'),
	);
	const toCopy = postFormSubmit(
		SUGGESTIE_COPY_TO,
		suggestieFields(payload, 'Kopie suggestie (reizen-site)'),
	);

	const [carolineOk] = await Promise.all([toCaroline, toCopy]);
	return carolineOk;
}
