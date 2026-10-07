const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

/**
 * @returns {Promise<'success'|'already'|'blacklist'|'error'>}
 */
export async function subscribeReisupdates(email) {
	const response = await fetch(`${API_BASE}/api/subscribe-reisupdates`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email: String(email || '').trim() }),
	});

	let data = {};
	try {
		data = await response.json();
	} catch {
		data = {};
	}

	if (data?.outcome === 'success' || data?.outcome === 'already' || data?.outcome === 'blacklist') {
		return data.outcome;
	}
	return 'error';
}
