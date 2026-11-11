// Atualiza a cópia local dos dados do DataJud (assets/datajud.js), usada quando o site é aberto sem o servidor.
// Uso: node servidor/atualizar-dados.js
const fs = require('fs');
const path = require('path');
const dj = require('./datajud');
const { montarPanorama } = require('./panorama');

const RAIZ = path.join(__dirname, '..');

async function principal() {
  // números de processo das fichas
  global.window = {};
  eval(fs.readFileSync(path.join(RAIZ, 'assets', 'dados.js'), 'utf8'));
  const numeros = window.OJSA.fichas.map(f => f.processo).concat(...window.OJSA.fichas.map(f => f.processosConexos || [])).filter(n => /\d{7}-/.test(n));

  console.log('Montando panorama...');
  const panorama = await montarPanorama();
  console.log('  ' + panorama.total + ' processos, ' + panorama.civeis + ' cíveis');

  const processos = {};
  for (const n of numeros) {
    process.stdout.write('  processo ' + n + '... ');
    try { processos[n] = await dj.processo(n); console.log(processos[n].length + ' registro(s)'); }
    catch (e) { console.log('falhou (' + e.message + ')'); }
  }

  const saida = '// Cópia local dos dados do DataJud (CNJ). Gerada por servidor/atualizar-dados.js em ' + new Date().toLocaleString('pt-BR') + '.\n' +
    'window.DATAJUD = ' + JSON.stringify({ panorama, processos }) + ';\n';
  fs.writeFileSync(path.join(RAIZ, 'assets', 'datajud.js'), saida);
  console.log('Gravado assets/datajud.js (' + Math.round(saida.length / 1024) + ' KB)');
}

principal().catch(e => { console.error('Erro:', e.message); process.exit(1); });
