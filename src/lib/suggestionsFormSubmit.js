/** Publiek suggestieformulier → eigen /api/suggestie (gebruiker blijft op de pagina). */

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
const REQUEST_TIMEOUT_MS = 15000;

/**
 * @param {{ naam: string, email: string, suggestie: string }} payload
 * @returns {Promise<boolean>}
 */
export async function submitSuggestion({ naam, email, suggestie }) {
	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
	try {
		const res = await fetch(`${API_BASE}/api/suggestie`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ naam, email, suggestie }),
			signal: controller.signal,
		});
		if (!res.ok) return false;
		try {
			const data = await res.json();
			return data?.ok === true;
		} catch {
			return false;
		}
	} catch {
		return false;
	} finally {
		clearTimeout(timeout);
	}
}
