// Servidor local do OJSA: entrega o site e a API (a mesma que roda na Vercel).
// Uso: node servidor/servidor.js   (depois abra http://localhost:5173)
const http = require('http');
const fs = require('fs');
const path = require('path');
const { tratar } = require('./api');

const RAIZ = path.resolve(__dirname, '..');
const PORTA = Number(process.env.PORT) || 5173;
const TIPOS = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8' };

http.createServer((req, res) => {
  const caminho = decodeURIComponent(req.url.split('?')[0]);
  if (caminho.startsWith('/api/')) return tratar(req, res);
  const arquivo = path.join(RAIZ, caminho === '/' ? 'index.html' : caminho);
  if (!arquivo.startsWith(RAIZ) || arquivo.includes(path.sep + 'servidor' + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(arquivo, (erro, dados) => {
    if (erro) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Arquivo não encontrado'); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arquivo)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(dados);
  });
}).listen(PORTA, () => console.log('OJSA no ar em http://localhost:' + PORTA));
