/** Flexmail REST client — gebaseerd op geteste PHP-flow (zoeken → aanmaken → interest). */

const FLEXMAIL_API_BASE = 'https://api.flexmail.eu';

export const REISUPDATES_INTEREST_ID = 'ca212b19-f08e-4341-a667-2ec1d5389c3f';
export const REISUPDATES_SOURCE_ID = 315012;
export const DEFAULT_CONTACT_LANGUAGE = 'nl';

const REQUEST_TIMEOUT_MS = 15000;

function getFlexmailAuthHeader() {
	const accountId = process.env.FLEXMAIL_ACCOUNT_ID;
	const token = process.env.FLEXMAIL_PERSONAL_ACCESS_TOKEN;
	if (!accountId || !token) {
		throw new Error('FLEXMAIL_CONFIG_MISSING');
	}
	const encoded = Buffer.from(`${accountId}:${token}`).toString('base64');
	return `Basic ${encoded}`;
}

export function normalizeSubscribeEmail(email) {
	return String(email || '').trim().toLowerCase();
}

export function isValidSubscribeEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function extractFlexmailErrorMessage(data) {
	if (!data) return '';
	if (typeof data === 'string') return data;
	if (typeof data.message === 'string') return data.message;
	if (typeof data.detail === 'string') return data.detail;
	if (Array.isArray(data.errors)) {
		return data.errors
			.map((e) => (typeof e === 'string' ? e : e?.message || e?.title || ''))
			.filter(Boolean)
			.join(' ');
	}
	return '';
}

export function isBlacklistedContact(contact) {
	if (!contact || typeof contact !== 'object') return false;
	if (contact.blacklisted === true) return true;
	const status = String(contact.status || contact.subscription_status || '').toLowerCase();
	return status.includes('blacklist');
}

export function isBlacklistErrorMessage(message) {
	return /blacklist/i.test(String(message || ''));
}

export function isAlreadySubscribedError(status, message) {
	if (status === 409 && /already subscribed to interest/i.test(message)) return true;
	return /contact is already subscribed to interest/i.test(message);
}

export function getContactFromSearchPayload(payload) {
	const embedded = payload?._embedded?.item;
	if (Array.isArray(embedded) && embedded.length > 0) return embedded[0];
	if (embedded && typeof embedded === 'object' && embedded.id != null) return embedded;
	return null;
}

/** Contact uit zoekresultaat of POST /contacts (PHP: $contact['id']). */
export function resolveContactRecord(payload) {
	const fromHal = getContactFromSearchPayload(payload);
	if (fromHal) return fromHal;
	if (payload && typeof payload === 'object' && payload.id != null) return payload;
	return null;
}

export function resolveContactId(payload) {
	const record = resolveContactRecord(payload);
	return record?.id != null ? String(record.id) : null;
}

async function flexmailRequest(path, { method = 'GET', body } = {}) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		const headers = {
			Authorization: getFlexmailAuthHeader(),
			Accept: 'application/json',
		};
		const init = { method, headers, signal: controller.signal };
		if (body != null) {
			headers['Content-Type'] = 'application/json';
			init.body = JSON.stringify(body);
		}
		const res = await fetch(`${FLEXMAIL_API_BASE}${path}`, init);
		const text = await res.text();
		let data = null;
		if (text) {
			try {
				data = JSON.parse(text);
			} catch {
				data = { raw: text };
			}
		}
		return { ok: res.ok, status: res.status, data };
	} finally {
		clearTimeout(timeout);
	}
}

async function searchContactByEmail(email) {
	const q = encodeURIComponent(email);
	const { ok, status, data } = await flexmailRequest(`/contacts?email=${q}`);
	if (!ok && status !== 404) {
		const msg = extractFlexmailErrorMessage(data);
		throw new Error(msg || `Flexmail zoeken mislukt (${status})`);
	}
	return resolveContactRecord(data);
}

async function createContact(email) {
	const payload = {
		email,
		language: DEFAULT_CONTACT_LANGUAGE,
		source: REISUPDATES_SOURCE_ID,
	};
	const { ok, status, data } = await flexmailRequest('/contacts', {
		method: 'POST',
		body: payload,
	});
	if (!ok) {
		const msg = extractFlexmailErrorMessage(data);
		return { ok: false, status, message: msg };
	}
	let contact = resolveContactRecord(data);
	if (!contact) {
		contact = await searchContactByEmail(email);
	}
	return { ok: Boolean(contact), contact, message: '' };
}

async function subscribeContactToInterest(contactId, interestId) {
	const encodedId = encodeURIComponent(String(contactId));
	const { ok, status, data } = await flexmailRequest(
		`/contacts/${encodedId}/interest-subscriptions`,
		{
			method: 'POST',
			body: { interest_id: interestId },
		},
	);
	const message = extractFlexmailErrorMessage(data);
	return { ok, status, message, data };
}

/**
 * @returns {'success'|'already'|'blacklist'|'error'}
 */
export async function subscribeToReisupdatesInterest(rawEmail) {
	const email = normalizeSubscribeEmail(rawEmail);
	if (!isValidSubscribeEmail(email)) {
		return 'error';
	}

	let contact = await searchContactByEmail(email);

	if (contact && isBlacklistedContact(contact)) {
		return 'blacklist';
	}

	if (!contact) {
		const created = await createContact(email);
		if (!created.ok) {
			if (isBlacklistErrorMessage(created.message)) {
				return 'blacklist';
			}
			return 'error';
		}
		contact = created.contact;
		if (!contact) {
			contact = await searchContactByEmail(email);
		}
	}

	const contactId = resolveContactId(contact);
	if (!contactId) {
		return 'error';
	}

	if (isBlacklistedContact(contact)) {
		return 'blacklist';
	}

	const sub = await subscribeContactToInterest(contactId, REISUPDATES_INTEREST_ID);
	if (sub.ok) {
		return 'success';
	}
	if (isAlreadySubscribedError(sub.status, sub.message)) {
		return 'already';
	}
	if (isBlacklistErrorMessage(sub.message)) {
		return 'blacklist';
	}
	return 'error';
}
