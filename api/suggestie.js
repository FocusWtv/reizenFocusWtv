import {
	isValidSuggestiePayload,
	normalizeSuggestiePayload,
	sendSuggestieMail,
} from './_lib/suggestieMail.js';
import { saveSuggestie } from './_lib/suggestieStore.js';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ ok: false });
	}

	try {
		const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
		const payload = normalizeSuggestiePayload(body);

		if (!isValidSuggestiePayload(payload)) {
			return res.status(400).json({ ok: false });
		}

		let saved = false;
		try {
			saved = await saveSuggestie(payload);
		} catch (err) {
			console.error('suggestie save:', err?.message || 'failed');
		}

		let mailed = false;
		try {
			mailed = await sendSuggestieMail(payload);
		} catch (err) {
			console.error('suggestie mail:', err?.message || 'failed');
		}

		if (!saved && !mailed) {
			return res.status(502).json({ ok: false });
		}

		return res.status(200).json({ ok: true });
	} catch {
		return res.status(500).json({ ok: false });
	}
}

export default handler;
