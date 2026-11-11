// Consulta à API Pública do DataJud (CNJ), sem dependências externas.
// A chave abaixo é a chave pública divulgada pelo CNJ em https://datajud-wiki.cnj.jus.br/api-publica/acesso
// Se o CNJ trocar a chave, defina a variável de ambiente DATAJUD_APIKEY.
const https = require('https');

const CHAVE = process.env.DATAJUD_APIKEY || 'cDZHYzlZa0JadVREZDJCendQbXY6SkJlTzNjLV9TRENyQk1RdnFKZGRQdw==';
const ENDERECO = 'https://api-publica.datajud.cnj.jus.br/api_publica_tjro/_search';

// Assuntos da Tabela Processual Unificada usados para identificar processos ambientais
const ASSUNTOS_AMBIENTAIS = [
  'Dano Ambiental', 'Indenização por Dano Ambiental', 'Área de Preservação Permanente',
  'Unidade de Conservação da Natureza', 'Flora', 'Fauna', 'Recursos Hídricos', 'Poluição',
  'Revogação/Concessão de Licença Ambiental', 'Agrotóxicos', 'Mineração', 'Reserva legal',
  'Comunidades Tradicionais', 'Meio Ambiente', 'Ambiental'
];

function postar(corpo) {
  return new Promise((resolve, reject) => {
    const dados = JSON.stringify(corpo);
    const req = https.request(ENDERECO, {
      method: 'POST',
      headers: { 'Authorization': 'APIKey ' + CHAVE, 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(dados) },
      timeout: 60000
    }, res => {
      let txt = '';
      res.setEncoding('utf8');
      res.on('data', c => txt += c);
      res.on('end', () => { try { resolve(JSON.parse(txt)); } catch (e) { reject(new Error('Resposta inválida do DataJud')); } });
    });
    req.on('timeout', () => req.destroy(new Error('Tempo esgotado na consulta ao DataJud')));
    req.on('error', reject);
    req.end(dados);
  });
}

const esperar = ms => new Promise(r => setTimeout(r, ms));

// O DataJud recusa consultas quando está sobrecarregado; tentamos de novo com intervalo crescente
async function consultar(corpo, tentativas = 14) {
  let ultimoErro;
  for (let i = 0; i < tentativas; i++) {
    try {
      const r = await postar(corpo);
      if (r && r.hits) return r;
      ultimoErro = new Error((r && r.error && r.error.root_cause && r.error.root_cause[0].type) || 'Erro no DataJud');
    } catch (e) { ultimoErro = e; }
    await esperar(3000 + i * 2500);
  }
  throw ultimoErro;
}

function filtroAmbiental(grau) {
  return {
    bool: {
      must: grau ? [{ match: { grau } }] : [],
      should: ASSUNTOS_AMBIENTAIS.map(a => ({ match_phrase: { 'assuntos.nome': a } })),
      minimum_should_match: 1
    }
  };
}

function ehCriminal(classe, assuntos) {
  return /criminal|habeas|sentido estrito|infringentes e de nulidade/i.test(classe || '') ||
    (assuntos || []).some(a => /crime|contra a flora|contra a fauna|outros atos contra/i.test(a));
}

function formatarNumero(n) {
  const s = String(n).padStart(20, '0');
  return s.slice(0, 7) + '-' + s.slice(7, 9) + '.' + s.slice(9, 13) + '.' + s.slice(13, 14) + '.' + s.slice(14, 16) + '.' + s.slice(16, 20);
}

function dataIso(v) {
  if (!v) return null;
  const s = String(v);
  if (/^\d{14}$/.test(s)) return s.slice(0, 4) + '-' + s.slice(4, 6) + '-' + s.slice(6, 8);
  return s.slice(0, 10);
}

function resumirProcesso(src, limiteMov = 40) {
  const movs = (src.movimentos || [])
    .map(m => ({ data: dataIso(m.dataHora), nome: m.nome, complemento: (m.complementosTabelados || []).map(c => c.nome).join(', ') || null }))
    .sort((a, b) => (b.data || '').localeCompare(a.data || ''));
  return {
    numero: formatarNumero(src.numeroProcesso),
    grau: src.grau,
    classe: src.classe && src.classe.nome,
    orgao: src.orgaoJulgador && src.orgaoJulgador.nome,
    assuntos: (src.assuntos || []).map(a => a.nome).filter(Boolean),
    ajuizamento: dataIso(src.dataAjuizamento),
    atualizacao: dataIso(src.dataHoraUltimaAtualizacao),
    // os mais recentes, mais todos os marcos de julgamento e recurso, que podem ser antigos
    movimentos: movs.filter((m, i) => i < limiteMov || /provimento|proced|julgamento|acolhimento|embargos|recurso especial|recurso extraordin|trânsito/i.test(m.nome))
  };
}

async function processo(numero, tentativas) {
  const limpo = String(numero).replace(/\D/g, '');
  const r = await consultar({ query: { match: { numeroProcesso: limpo } }, size: 10 }, tentativas);
  return r.hits.hits.map(h => resumirProcesso(h._source)).sort((a, b) => (b.grau || '').localeCompare(a.grau || ''));
}

module.exports = { consultar, processo, filtroAmbiental, ehCriminal, formatarNumero, dataIso, resumirProcesso, ASSUNTOS_AMBIENTAIS };
