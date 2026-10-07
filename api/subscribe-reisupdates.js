import {
	isValidSubscribeEmail,
	normalizeSubscribeEmail,
	subscribeToReisupdatesInterest,
} from './_lib/flexmailClient.js';
import { sendBlacklistReisupdatesNotification } from './_lib/blacklistNotify.js';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ outcome: 'error' });
	}

	if (!process.env.FLEXMAIL_ACCOUNT_ID || !process.env.FLEXMAIL_PERSONAL_ACCESS_TOKEN) {
		return res.status(500).json({ outcome: 'error' });
	}

	try {
		const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
		const email = normalizeSubscribeEmail(body.email);

		if (!isValidSubscribeEmail(email)) {
			return res.status(400).json({ outcome: 'error' });
		}

		const outcome = await subscribeToReisupdatesInterest(email);

		if (outcome === 'blacklist') {
			await sendBlacklistReisupdatesNotification(email);
		}

		return res.status(200).json({ outcome });
	} catch (err) {
		if (err?.message === 'FLEXMAIL_CONFIG_MISSING') {
			return res.status(500).json({ outcome: 'error' });
		}
		console.error('subscribe-reisupdates:', err?.name === 'AbortError' ? 'timeout' : 'failed');
		return res.status(500).json({ outcome: 'error' });
	}
}

export default handler;
