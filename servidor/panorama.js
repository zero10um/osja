// Monta o panorama e a lista completa dos processos ambientais do 2º grau do TJRO a partir do DataJud.
// Usado pelo script atualizar-dados.js (assets/datajud.js e assets/processos.json).
const dj = require('./datajud');

const CAMPOS = ['numeroProcesso', 'classe.nome', 'assuntos.nome', 'orgaoJulgador.nome', 'dataAjuizamento', 'dataHoraUltimaAtualizacao', 'grau', 'movimentos.nome', 'movimentos.dataHora'];

// movimentos que registram o resultado de um julgamento (recursos de embargos ficam de fora)
const RESULTADO = /provimento|procedência|improcedência|conhecimento|homologação|extinção|prejudicad|desistência/i;
const NAO_RESULTADO = /embargos|para julgamento|diligência/i;

async function todosAmbientais() {
  const lista = [];
  let depois = null;
  for (let pagina = 0; pagina < 12; pagina++) {
    const corpo = { size: 500, _source: CAMPOS, query: dj.filtroAmbiental('G2'), sort: [{ dataHoraUltimaAtualizacao: 'desc' }, { 'numeroProcesso.keyword': 'asc' }] };
    if (depois) corpo.search_after = depois;
    const r = await dj.consultar(corpo);
    const hits = r.hits.hits;
    hits.forEach(h => lista.push(h._source));
    if (hits.length < 500) break;
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

function gabinete(nome) {
  return String(nome || '').replace(/^GABINETE (DA |DO |DES\. |DESA\. )?/i, (m, t) => t && /DES/.test(t) ? (t.trim() === 'DESA.' ? 'Desa. ' : 'Des. ') : '')
    .toLowerCase().replace(/(^|\s)(\S)/g, (m, a, b) => a + b.toUpperCase()).replace(/\b(De|Do|Da|Dos|Das|E)\b/g, p => p.toLowerCase());
}

// registro compacto de um processo, usado na consulta do site e na API
function compactar(s, comarcas) {
  const cod = String(s.numeroProcesso).slice(-4);
  const movs = (s.movimentos || []).map(m => [dj.dataIso(m.dataHora), m.nome]).sort((a, b) => (b[0] || '').localeCompare(a[0] || ''));
  const julg = movs.find(m => RESULTADO.test(m[1]) && !NAO_RESULTADO.test(m[1]));
  const classe = s.classe && s.classe.nome;
  const assuntos = (s.assuntos || []).map(a => a.nome).filter(Boolean);
  return {
    n: dj.formatarNumero(s.numeroProcesso),
    c: classe,
    o: gabinete(s.orgaoJulgador && s.orgaoJulgador.nome),
    a: assuntos,
    co: cod === '0000' ? 'Protocolado direto no TJRO' : (comarcas[cod] ? titulo(comarcas[cod]) : 'Origem não identificada'),
    aj: dj.dataIso(s.dataAjuizamento),
    at: dj.dataIso(s.dataHoraUltimaAtualizacao),
    u: movs[0] || null,
    j: julg || null,
    cr: dj.ehCriminal(classe, assuntos) ? 1 : 0
  };
}

async function montarPanorama(comarcasPrevias) {
  // consultas em sequência: o DataJud recusa pedidos simultâneos quando está carregado
  const itens = await todosAmbientais();
  const comarcas = comarcasPrevias || await tabelaComarcas();
  const lista = itens.map(s => compactar(s, comarcas)).sort((a, b) => ((b.u && b.u[0]) || '').localeCompare((a.u && a.u[0]) || ''));
  const civeis = lista.filter(p => !p.cr);
  return {
    lista,
    panorama: {
      extraidoEm: new Date().toISOString(),
      fonte: 'API Pública do DataJud, Conselho Nacional de Justiça',
      criterio: 'Processos do 2º grau do TJRO com ao menos um destes assuntos da Tabela Processual Unificada: ' + dj.ASSUNTOS_AMBIENTAIS.join(', ') + '.',
      total: lista.length,
      civeis: civeis.length,
      criminais: lista.length - civeis.length,
      julgados: civeis.filter(p => p.j).length,
      porClasse: contar(civeis, p => p.c),
      porAssunto: contar(civeis, p => p.a),
      porAno: contar(civeis, p => p.aj && p.aj.slice(0, 4)).sort((a, b) => a.rot.localeCompare(b.rot)),
      porComarca: contar(civeis, p => p.co === 'Protocolado direto no TJRO' ? 'Protocolado direto no TJRO (agravos e ações originárias)' : p.co),
      porResultado: contar(civeis, p => p.j && p.j[1]),
      recentes: civeis.slice(0, 15).map(p => ({ numero: p.n, classe: p.c, orgao: p.o, assuntos: p.a, movimentos: p.u ? [{ data: p.u[0], nome: p.u[1] }] : [] })),
      comarcas
    }
  };
}

module.exports = { montarPanorama, tabelaComarcas };
