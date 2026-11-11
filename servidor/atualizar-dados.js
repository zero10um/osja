// Atualiza os dados do DataJud usados pelo site:
//   assets/datajud.js     panorama, processos em tramitação e andamento dos processos das fichas
//   assets/processos.json lista completa dos processos ambientais do 2º grau do TJRO
// Uso: node servidor/atualizar-dados.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const dj = require('./datajud');
const { montarPanorama } = require('./panorama');

const RAIZ = path.join(__dirname, '..');

function lerJanela(arquivo, variavel) {
  try {
    const contexto = { window: {} };
    vm.runInNewContext(fs.readFileSync(path.join(RAIZ, 'assets', arquivo), 'utf8'), contexto);
    return contexto.window[variavel];
  } catch (e) { return null; }
}

async function principal() {
  const D = lerJanela('dados.js', 'OJSA');
  const numeros = D.fichas.map(f => f.processo).concat(...D.fichas.map(f => f.processosConexos || [])).filter(n => /\d{7}-/.test(n || ''));

  // a tabela de comarcas muda pouco; reaproveita a anterior quando existir
  const anterior = lerJanela('datajud.js', 'DATAJUD');
  const comarcas = anterior && anterior.panorama && anterior.panorama.comarcas;

  console.log('Montando panorama...');
  const { panorama, lista } = await montarPanorama(comarcas);
  console.log('  ' + panorama.total + ' processos, ' + panorama.civeis + ' cíveis, ' + panorama.julgados + ' com julgamento registrado');

  const processos = {};
  for (const n of numeros) {
    process.stdout.write('  processo ' + n + '... ');
    try { processos[n] = await dj.processo(n); console.log(processos[n].length + ' registro(s)'); }
    catch (e) {
      console.log('falhou (' + e.message + '), mantida a cópia anterior');
      if (anterior && anterior.processos && anterior.processos[n]) processos[n] = anterior.processos[n];
    }
  }

  const momento = new Date().toLocaleString('pt-BR');
  const saida = '// Cópia dos dados do DataJud (CNJ). Gerada por servidor/atualizar-dados.js em ' + momento + '.\n' +
    'window.DATAJUD = ' + JSON.stringify({ panorama, processos }) + ';\n';
  fs.writeFileSync(path.join(RAIZ, 'assets', 'datajud.js'), saida);
  fs.writeFileSync(path.join(RAIZ, 'assets', 'processos.json'), JSON.stringify({ extraidoEm: panorama.extraidoEm, fonte: panorama.fonte, criterio: panorama.criterio, processos: lista }));
  console.log('Gravados assets/datajud.js (' + Math.round(saida.length / 1024) + ' KB) e assets/processos.json (' + lista.length + ' processos)');
}

principal().catch(e => { console.error('Erro:', e.message); process.exit(1); });
