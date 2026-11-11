// Monta o panorama dos processos ambientais do TJRO a partir do DataJud.
// Usado pelo servidor (dados ao vivo) e pelo script atualizar-dados.js (cópia local em assets/datajud.js).
const dj = require('./datajud');

const CAMPOS = ['numeroProcesso', 'classe.nome', 'assuntos.nome', 'orgaoJulgador.nome', 'dataAjuizamento', 'dataHoraUltimaAtualizacao', 'grau'];

async function todosAmbientais() {
  const lista = [];
  let depois = null;
  for (let pagina = 0; pagina < 10; pagina++) {
    const corpo = { size: 1000, _source: CAMPOS, query: dj.filtroAmbiental('G2'), sort: [{ dataHoraUltimaAtualizacao: 'desc' }, { 'numeroProcesso.keyword': 'asc' }] };
    if (depois) corpo.search_after = depois;
    const r = await dj.consultar(corpo);
    const hits = r.hits.hits;
    hits.forEach(h => lista.push(h._source));
    if (hits.length < 1000) break;
    depois = hits[hits.length - 1].sort;
  }
  return lista;
}

// Código de origem (4 últimos dígitos do número CNJ) para nome da comarca, aprendido dos processos de 1º grau
async function tabelaComarcas() {
  const tabela = {};
  let depois = null;
  for (let pagina = 0; pagina < 3; pagina++) {
    const corpo = { size: 1000, _source: ['numeroProcesso', 'orgaoJulgador.nome'], query: { match: { grau: 'G1' } }, sort: [{ dataHoraUltimaAtualizacao: 'desc' }, { 'numeroProcesso.keyword': 'asc' }] };
    if (depois) corpo.search_after = depois;
    const r = await dj.consultar(corpo);
    r.hits.hits.forEach(h => {
      const cod = String(h._source.numeroProcesso).slice(-4);
      const nome = ((h._source.orgaoJulgador || {}).nome || '').split(' - ')[0].trim();
      if (!nome || /GABINETE|TURMA|CÂMARA/i.test(nome)) return;
      tabela[cod] = tabela[cod] || {};
      tabela[cod][nome] = (tabela[cod][nome] || 0) + 1;
    });
    if (r.hits.hits.length < 1000) break;
    depois = r.hits.hits[r.hits.hits.length - 1].sort;
  }
  const final = {};
  Object.keys(tabela).forEach(cod => {
    final[cod] = Object.entries(tabela[cod]).sort((a, b) => b[1] - a[1])[0][0];
  });
  return final;
}

function contar(itens, chave) {
  const m = {};
  itens.forEach(i => [].concat(chave(i)).forEach(k => { if (k) m[k] = (m[k] || 0) + 1; }));
  return Object.entries(m).map(([rot, n]) => ({ rot, n })).sort((a, b) => b.n - a.n || a.rot.localeCompare(b.rot, 'pt'));
}

function titulo(s) {
  return s.toLowerCase().replace(/(^|[\s'-])(\S)/g, (m, a, b) => a + b.toUpperCase())
    .replace(/\b(De|Do|Da|Dos|Das|E)\b/g, p => p.toLowerCase()).replace(/D'oeste/g, "D'Oeste");
}

async function recentes(qtd = 15) {
  const r = await dj.consultar({ size: 60, query: dj.filtroAmbiental('G2'), sort: [{ dataHoraUltimaAtualizacao: 'desc' }] });
  return r.hits.hits.map(h => dj.resumirProcesso(h._source, 3))
    .filter(p => !dj.ehCriminal(p.classe, p.assuntos))
    .slice(0, qtd);
}

async function montarPanorama(comarcasPrevias) {
  // consultas em sequência: o DataJud recusa pedidos simultâneos quando está carregado
  const itens = await todosAmbientais();
  const comarcas = comarcasPrevias || await tabelaComarcas();
  const ultimos = await recentes();
  const civeis = itens.filter(s => !dj.ehCriminal(s.classe && s.classe.nome, (s.assuntos || []).map(a => a.nome)));
  const origem = s => {
    const cod = String(s.numeroProcesso).slice(-4);
    if (cod === '0000') return 'Protocolado direto no TJRO (agravos e ações originárias)';
    return comarcas[cod] ? titulo(comarcas[cod]) : 'Origem não identificada';
  };
  return {
    extraidoEm: new Date().toISOString(),
    fonte: 'API Pública do DataJud, Conselho Nacional de Justiça',
    criterio: 'Processos do 2º grau do TJRO com ao menos um destes assuntos da Tabela Processual Unificada: ' + dj.ASSUNTOS_AMBIENTAIS.join(', ') + '.',
    total: itens.length,
    civeis: civeis.length,
    criminais: itens.length - civeis.length,
    porClasse: contar(civeis, s => s.classe && s.classe.nome),
    porAssunto: contar(civeis, s => (s.assuntos || []).map(a => a.nome)),
    porAno: contar(civeis, s => dj.dataIso(s.dataAjuizamento) && dj.dataIso(s.dataAjuizamento).slice(0, 4)).sort((a, b) => a.rot.localeCompare(b.rot)),
    porComarca: contar(civeis, origem),
    recentes: ultimos,
    comarcas
  };
}

module.exports = { montarPanorama, tabelaComarcas };
