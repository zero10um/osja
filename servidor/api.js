// API do OJSA: dados abertos do Observatório e consulta ao DataJud ao vivo.
// Usada pelo servidor local (servidor/servidor.js) e pela Vercel (api/index.js).
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const dj = require('./datajud');

const RAIZ = path.join(__dirname, '..');
const VERSAO = 'v1';

// lê um arquivo de dados do site (window.X = {...}) e guarda em memória até ele mudar
const memoria = {};
function carregar(arquivo, variavel) {
  const caminho = path.join(RAIZ, 'assets', arquivo);
  const quando = fs.statSync(caminho).mtimeMs;
  if (!memoria[arquivo] || memoria[arquivo].quando !== quando) {
    const contexto = { window: {} };
    vm.runInNewContext(fs.readFileSync(caminho, 'utf8'), contexto);
    memoria[arquivo] = { quando, valor: contexto.window[variavel] };
  }
  return memoria[arquivo].valor;
}

function normal(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function base(req) {
  const proto = (req.headers['x-forwarded-proto'] || 'http').split(',')[0];
  return proto + '://' + req.headers.host;
}

function responder(res, status, corpo, cache) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Cache-Control': cache || 'no-store'
  });
  res.end(JSON.stringify(corpo, null, 2));
}

function resumo(f, url) {
  return {
    id: f.id, titulo: f.titulo, processo: f.processo, classe: f.classe, orgao: f.orgao, relatoria: f.relatoria,
    data: f.dataReferencia, tipoData: f.tipoData, municipio: f.municipio ? f.municipio.nome : null, territorio: f.territorio,
    eixos: f.eixos, subtema: f.subtema, resultado: f.resultado,
    ficha: url + '/#/decisoes/' + f.id, api: url + '/api/' + VERSAO + '/fichas/' + f.id
  };
}

const CACHE_DADOS = 'public, max-age=300, s-maxage=3600';

async function tratar(req, res) {
  const endereco = new URL(req.url, 'http://local');
  const partes = endereco.pathname.replace(/\/+$/, '').split('/').filter(Boolean); // ['api', 'v1', ...]
  const q = endereco.searchParams;

  if (req.method === 'OPTIONS') { res.writeHead(204, { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET' }); return res.end(); }
  if (req.method !== 'GET') return responder(res, 405, { erro: 'Use GET.' });
  if (partes[0] !== 'api' || partes[1] !== VERSAO) return responder(res, 404, { erro: 'Endereço desconhecido. Veja ' + base(req) + '/api/' + VERSAO });

  const D = carregar('dados.js', 'OJSA');
  const url = base(req);
  const recurso = partes[2];

  try {
    if (!recurso) {
      const DJ = carregar('datajud.js', 'DATAJUD');
      return responder(res, 200, {
        nome: 'API do Observatório da Justiça Socioambiental na Amazônia (OJSA)',
        descricao: 'Dados abertos sobre acórdãos do TJRO em conflitos socioambientais e panorama de processos ambientais a partir do DataJud (CNJ).',
        citacao: 'Observatório da Justiça Socioambiental na Amazônia (OJSA), PPG em Direitos Humanos e Desenvolvimento da Justiça, Universidade Federal de Rondônia.',
        acervoAtualizadoEm: D.atualizadoEm,
        datajudExtraidoEm: DJ && DJ.panorama ? DJ.panorama.extraidoEm : null,
        enderecos: {
          fichas: url + '/api/v1/fichas?eixo=&municipio=&orgao=&resultado=&q=',
          ficha: url + '/api/v1/fichas/{id}',
          eixos: url + '/api/v1/eixos',
          radar: url + '/api/v1/radar',
          panorama: url + '/api/v1/panorama',
          processo: url + '/api/v1/processos/{numero CNJ}'
        }
      }, CACHE_DADOS);
    }

    if (recurso === 'fichas' && !partes[3]) {
      let lista = D.fichas.slice();
      if (q.get('eixo')) lista = lista.filter(f => f.eixos.includes(q.get('eixo')));
      if (q.get('municipio')) lista = lista.filter(f => f.municipio && (f.municipio.id === q.get('municipio') || normal(f.municipio.nome) === normal(q.get('municipio'))));
      if (q.get('orgao')) lista = lista.filter(f => normal(f.orgao) === normal(q.get('orgao')));
      if (q.get('resultado')) lista = lista.filter(f => normal(f.resultado) === normal(q.get('resultado')));
      if (q.get('q')) {
        const termo = normal(q.get('q'));
        lista = lista.filter(f => normal([f.titulo, f.processo, f.partes, f.territorio, f.subtema, f.sintese.t, f.municipio && f.municipio.nome].join(' ')).includes(termo));
      }
      lista.sort((a, b) => (b.dataReferencia || '').localeCompare(a.dataReferencia || ''));
      return responder(res, 200, { total: lista.length, atualizadoEm: D.atualizadoEm, fichas: lista.map(f => resumo(f, url)) }, CACHE_DADOS);
    }

    if (recurso === 'fichas') {
      const f = D.fichas.find(x => x.id === partes[3]);
      if (!f) return responder(res, 404, { erro: 'Ficha não encontrada: ' + partes[3] });
      return responder(res, 200, Object.assign({}, f, { ficha: url + '/#/decisoes/' + f.id }), CACHE_DADOS);
    }

    if (recurso === 'eixos') {
      return responder(res, 200, D.eixos.map(e => Object.assign({}, e, { decisoes: D.fichas.filter(f => f.eixos.includes(e.id)).map(f => f.id) })), CACHE_DADOS);
    }

    if (recurso === 'radar') {
      return responder(res, 200, { graus: D.graus, tendencias: D.tendencias, divergencias: D.divergencias, precedentes: D.precedentes }, CACHE_DADOS);
    }

    if (recurso === 'panorama') {
      const DJ = carregar('datajud.js', 'DATAJUD');
      if (!DJ || !DJ.panorama) return responder(res, 503, { erro: 'Panorama do DataJud ainda não gerado.' });
      return responder(res, 200, DJ.panorama, CACHE_DADOS);
    }

    if (recurso === 'processos' && partes[3]) {
      const numero = decodeURIComponent(partes[3]);
      if (String(numero).replace(/\D/g, '').length !== 20) return responder(res, 400, { erro: 'Informe o número CNJ completo, com 20 dígitos.' });
      try {
        const registros = await dj.processo(numero, 3);
        return responder(res, 200, { numero, fonte: 'API Pública do DataJud (CNJ)', consultadoEm: new Date().toISOString(), registros }, 'public, max-age=600, s-maxage=3600, stale-while-revalidate=86400');
      } catch (e) {
        // se o DataJud não responder, devolve a última cópia salva, se houver
        const DJ = carregar('datajud.js', 'DATAJUD');
        const copia = DJ && DJ.processos && Object.keys(DJ.processos).find(k => k.replace(/\D/g, '') === numero.replace(/\D/g, ''));
        if (copia) return responder(res, 200, { numero, fonte: 'Cópia salva do DataJud (CNJ)', consultadoEm: DJ.panorama && DJ.panorama.extraidoEm, registros: DJ.processos[copia] }, 'public, max-age=60');
        return responder(res, 502, { erro: 'O DataJud não respondeu: ' + e.message });
      }
    }

    return responder(res, 404, { erro: 'Endereço desconhecido. Veja ' + url + '/api/' + VERSAO });
  } catch (e) {
    return responder(res, 500, { erro: 'Erro interno: ' + e.message });
  }
}

module.exports = { tratar };
