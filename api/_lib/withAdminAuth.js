import { getFirebaseAdmin } from './firebaseAdmin.js';

/**
 * Wrap een handler met Firebase ID token verificatie en admin-claim check.
 * Verwacht een Authorization header: "Bearer <idToken>".
 */
export function withAdminAuth(handler) {
	return async (req, res) => {
		let authAdmin;
		try {
			({ authAdmin } = getFirebaseAdmin());
		} catch (err) {
			return res.status(500).json({
				error: 'Serverconfiguratie onvolledig',
				details: err?.message || String(err),
			});
		}

		try {
			const authHeader = req.headers.authorization || '';
			const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
			if (!token) {
				return res.status(401).json({ error: 'Unauthorized: ontbrekende token' });
			}

			const decoded = await authAdmin.verifyIdToken(token, true);
			if (!decoded || !decoded.admin) {
				return res.status(403).json({ error: 'Forbidden: geen admin rechten' });
			}

			// doorgaan naar de eigenlijke handler
			return handler(req, res, decoded);
		} catch (err) {
			return res.status(401).json({ error: 'Unauthorized', details: err?.message || String(err) });
		}
	};
}
