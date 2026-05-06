/**
 * Lokale dev-server voor POST /api/upload-to-r2.
 * Draai naast `npm run dev` (Vite): `npm run dev:r2-api`
 */
import http from 'http';
import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env') });
config({ path: resolve(__dirname, '../.env.local'), override: true });

const { default: handler } = await import('../api/upload-to-r2.js');

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

const server = http.createServer(async (nodeReq, nodeRes) => {
  const urlPath = nodeReq.url?.split('?')[0] || '';

  if (nodeReq.method === 'OPTIONS') {
    nodeRes.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    nodeRes.end();
    return;
  }

  if (urlPath !== '/api/upload-to-r2' && urlPath !== '/api/upload-to-r2/') {
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

  const req = { method: nodeReq.method, body };
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
  console.log(`[dev:r2-api] http://127.0.0.1:${PORT}/api/upload-to-r2`);
});
