// Gera assets/mapa-ro.js a partir da malha municipal do IBGE (projeção simples, caminhos SVG prontos)
const fs = require('fs');
const path = require('path');
const geo = JSON.parse(fs.readFileSync(path.join(__dirname, 'ro-municipios.geojson'), 'utf8'));
const nomes = JSON.parse(fs.readFileSync(path.join(__dirname, 'ro-nomes.json'), 'utf8'));
const nomePorId = Object.fromEntries(nomes.map(m => [String(m.id), m.nome]));
let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
const latc = -10.9 * Math.PI / 180, k = Math.cos(latc);
const proj = ([lon, lat]) => [lon * k, -lat];
const polys = f => f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
geo.features.forEach(f => polys(f).forEach(p => p[0].forEach(c => { const [x, y] = proj(c); minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); })));
const W = 1000, s = W / (maxX - minX), H = Math.round((maxY - minY) * s);
const pt = c => { const [x, y] = proj(c); return [((x - minX) * s).toFixed(1), ((y - minY) * s).toFixed(1)]; };
const out = geo.features.map(f => {
  const id = String(f.properties.codarea);
  let cx = 0, cy = 0, n = 0;
  const d = polys(f).map(p => p.map(ring => 'M' + ring.map(c => { const q = pt(c); cx += +q[0]; cy += +q[1]; n++; return q.join(','); }).join('L') + 'Z').join('')).join('');
  return { id, nome: nomePorId[id] || id, d, cx: +(cx / n).toFixed(1), cy: +(cy / n).toFixed(1) };
}).sort((a, b) => a.nome.localeCompare(b.nome, 'pt'));
fs.writeFileSync(path.join(__dirname, '..', 'assets', 'mapa-ro.js'),
  '// Malha municipal de Rondônia. Fonte: IBGE, API de malhas v3 (qualidade mínima), coletada em 09/11/2026.\n' +
  'window.MAPA_RO = ' + JSON.stringify({ largura: W, altura: H, municipios: out }) + ';\n');
console.log(out.length, 'municípios', W + 'x' + H, Object.keys(geo.features[0].properties));
