/**
 * Lokale dev-server voor admin API-routes (R2 + GitHub PDF).
 * Draai naast `npm run dev` (Vite): `npm run dev:r2-api`
 */
import http from 'http';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
config({ path: resolve(__dirname, '../.env') });
config({ path: resolve(__dirname, '../.env.local'), override: true });

const routes = {
	'/api/upload-to-r2': require('../api/upload-to-r2.js'),
	'/api/upload-pdf-to-github': require('../api/upload-pdf-to-github.js'),
};

function attachResHelpers(nodeRes) {
	return {
		status(code) {
			nodeRes.statusCode = code;
			return this;
		},
		json(obj) {
			if (!nodeRes.headersSent) {
				nodeRes.setHeader('Content-Type', 'application/json; charset=utf-8');
			}
			nodeRes.end(JSON.stringify(obj));
		},
	};
}

function normalizePath(urlPath) {
	const path = urlPath?.split('?')[0] || '';
	return path.endsWith('/') && path.length > 1 ? path.slice(0, -1) : path;
}

const server = http.createServer(async (nodeReq, nodeRes) => {
	const urlPath = normalizePath(nodeReq.url);

	if (nodeReq.method === 'OPTIONS') {
		nodeRes.writeHead(204, {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type, Authorization',
		});
		nodeRes.end();
		return;
	}

	const handler = routes[urlPath];
	if (!handler) {
		nodeRes.statusCode = 404;
		nodeRes.end();
		return;
	}

	const chunks = [];
	for await (const chunk of nodeReq) chunks.push(chunk);
	const raw = Buffer.concat(chunks).toString('utf8');

	let body;
	try {
		body = raw ? JSON.parse(raw) : {};
	} catch {
		attachResHelpers(nodeRes).status(400).json({ error: 'Ongeldige JSON body' });
		return;
	}

	const req = {
		method: nodeReq.method,
		body,
		headers: { authorization: nodeReq.headers.authorization || '' },
	};
	const res = attachResHelpers(nodeRes);

	try {
		await handler(req, res);
	} catch (err) {
		if (!nodeRes.headersSent) {
			attachResHelpers(nodeRes)
				.status(500)
				.json({ error: err?.message || 'Serverfout' });
		}
	}
});

const PORT = Number(process.env.R2_UPLOAD_LOCAL_PORT || 8787);
server.listen(PORT, '127.0.0.1', () => {
	console.log(`[dev:api] http://127.0.0.1:${PORT}`);
	console.log('  POST /api/upload-to-r2');
	console.log('  POST /api/upload-pdf-to-github');
});
