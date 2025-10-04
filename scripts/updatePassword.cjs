require('dotenv').config();
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

function requireEnv(name) {
	const v = process.env[name];
	if (!v) throw new Error(`Missing env var: ${name}`);
	return v;
}

(async () => {
	try {
		const email = process.argv[2];
		const newPassword = process.argv[3];
		if (!email || !newPassword) {
			console.error('Gebruik: node scripts/updatePassword.cjs <email> <nieuw-wachtwoord>');
			process.exit(1);
		}

		const jsonPath = path.join(process.cwd(), 'firebase-service-account.json');
		if (fs.existsSync(jsonPath)) {
			const svc = require(jsonPath);
			if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert(svc) });
		} else {
			const projectId = requireEnv('FIREBASE_PROJECT_ID');
			const clientEmail = requireEnv('FIREBASE_CLIENT_EMAIL');
			const privateKey = requireEnv('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');
			if (!admin.apps.length) admin.initializeApp({ credential: admin.credential.cert({ projectId, clientEmail, privateKey }) });
		}

		const user = await admin.auth().getUserByEmail(email);
		await admin.auth().updateUser(user.uid, { password: newPassword });
		console.log(`OK: wachtwoord gewijzigd voor ${email}`);
		process.exit(0);
	} catch (err) {
		console.error('Fout:', err?.message || String(err));
		process.exit(1);
	}
})();
