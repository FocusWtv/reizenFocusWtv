import {
	isAlreadySubscribedError,
	isBlacklistErrorMessage,
	isBlacklistedContact,
	isValidSubscribeEmail,
	normalizeSubscribeEmail,
} from '../api/_lib/flexmailClient.js';
import { markBlacklistNotified, shouldSkipBlacklistNotify } from '../api/_lib/blacklistNotify.js';

let failed = 0;

function assert(name, condition) {
	if (!condition) {
		console.error('FAIL:', name);
		failed += 1;
	} else {
		console.log('OK:', name);
	}
}

assert('normalize email', normalizeSubscribeEmail('  Test@Example.COM ') === 'test@example.com');
assert('valid email', isValidSubscribeEmail('a@b.co'));
assert('invalid email', !isValidSubscribeEmail('not-an-email'));

assert('blacklist contact status', isBlacklistedContact({ status: 'blacklisted' }));
assert('blacklist flag', isBlacklistedContact({ blacklisted: true }));
assert('not blacklist', !isBlacklistedContact({ status: 'confirmed' }));

assert('blacklist message', isBlacklistErrorMessage('Contact is on the blacklist'));
assert(
	'already subscribed',
	isAlreadySubscribedError(409, 'Contact is already subscribed to interest'),
);

const dedupeEmail = 'dup@example.com';
assert('notify first time', !shouldSkipBlacklistNotify(dedupeEmail));
markBlacklistNotified(dedupeEmail);
assert('notify dedupe', shouldSkipBlacklistNotify(dedupeEmail));

if (failed) {
	process.exit(1);
}
console.log('All logic checks passed.');
