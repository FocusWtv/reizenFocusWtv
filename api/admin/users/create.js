import { getFirebaseAdmin } from '../../_lib/firebaseAdmin.js';
import { withAdminAuth } from '../../_lib/withAdminAuth.js';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method Not Allowed' });
	}

	try {
		const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
		const { email, password } = body;

		if (!email || !password) {
			return res.status(400).json({ error: 'email en password zijn verplicht' });
		}

		const { authAdmin } = getFirebaseAdmin();
		const userRecord = await authAdmin.createUser({ email, password, emailVerified: true, disabled: false });

		await authAdmin.setCustomUserClaims(userRecord.uid, { admin: true });

		return res.status(201).json({ uid: userRecord.uid, email: userRecord.email, admin: true });
	} catch (err) {
		return res.status(500).json({ error: 'Kon gebruiker niet aanmaken', details: err?.message || String(err) });
	}
}

export default withAdminAuth(handler);
