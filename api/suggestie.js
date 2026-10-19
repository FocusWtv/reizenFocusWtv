import {
	isValidSuggestiePayload,
	normalizeSuggestiePayload,
	sendSuggestieMail,
} from './_lib/suggestieMail.js';

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

		const sent = await sendSuggestieMail(payload);
		if (!sent) {
			return res.status(502).json({ ok: false });
		}

		return res.status(200).json({ ok: true });
	} catch {
		return res.status(500).json({ ok: false });
	}
}

export default handler;
