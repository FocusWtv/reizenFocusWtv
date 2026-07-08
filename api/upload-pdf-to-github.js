import { withAdminAuth } from './_lib/withAdminAuth.js';

async function handler(req, res) {
	if (req.method !== 'POST') {
		return res.status(405).json({ error: 'Method not allowed' });
	}

	const githubToken = process.env.GITHUB_TOKEN;
	const githubOwner = process.env.GITHUB_OWNER;
	const githubRepo = process.env.GITHUB_REPO;
	const githubBranch = process.env.GITHUB_BRANCH || 'main';

	if (!githubToken || !githubOwner || !githubRepo) {
		return res.status(500).json({
			error: 'GitHub configuratie ontbreekt op de server (GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO).',
		});
	}

	try {
		const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
		const { fileData, fileName } = body;

		if (!fileData || !fileName) {
			return res.status(400).json({ error: 'fileData en fileName zijn verplicht' });
		}

		const base64Content = fileData.replace(/^data:[^;]+;base64,/, '');
		const timestamp = Date.now();
		const safeFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
		const filePath = `brochures/${timestamp}-${safeFileName}`;

		const apiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${filePath}`;

		const ghResponse = await fetch(apiUrl, {
			method: 'PUT',
			headers: {
				Authorization: `Bearer ${githubToken}`,
				'Content-Type': 'application/json',
				Accept: 'application/vnd.github.v3+json',
			},
			body: JSON.stringify({
				message: `Upload brochure: ${safeFileName}`,
				content: base64Content,
				branch: githubBranch,
			}),
		});

		if (!ghResponse.ok) {
			const errorData = await ghResponse.json().catch(() => ({}));
			console.error('GitHub upload error:', errorData);
			return res.status(ghResponse.status).json({
				error: errorData.message || `GitHub upload mislukt (${ghResponse.status})`,
			});
		}

		const rawUrl = `https://raw.githubusercontent.com/${githubOwner}/${githubRepo}/${githubBranch}/${filePath}`;
		return res.status(200).json({ url: rawUrl });
	} catch (error) {
		console.error('GitHub PDF upload error:', error);
		return res.status(500).json({ error: error.message || 'Onbekende fout' });
	}
}

export default withAdminAuth(handler);
