const functions = require('firebase-functions');
const admin = require('firebase-admin');

if (!admin.apps.length) {
	admin.initializeApp();
}

exports.createAdminUser = functions.https.onCall(async (data, context) => {
	if (!context.auth || context.auth.token?.admin !== true) {
		throw new functions.https.HttpsError('permission-denied', 'Admin privileges required');
	}

	const email = (data && data.email) || '';
	const password = (data && data.password) || '';
	if (!email || !password) {
		throw new functions.https.HttpsError('invalid-argument', 'email and password are required');
	}

	try {
		const user = await admin.auth().createUser({ email, password, emailVerified: true, disabled: false });
		await admin.auth().setCustomUserClaims(user.uid, { admin: true });
		return { uid: user.uid, email: user.email, admin: true };
	} catch (err) {
		throw new functions.https.HttpsError('internal', err?.message || String(err));
	}
});
