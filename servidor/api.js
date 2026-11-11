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

function lerProcessos() {
  const caminho = path.join(RAIZ, 'assets', 'processos.json');
  if (!fs.existsSync(caminho)) return null;
  const quando = fs.statSync(caminho).mtimeMs;
  if (!memoria.processos || memoria.processos.quando !== quando) memoria.processos = { quando, valor: JSON.parse(fs.readFileSync(caminho, 'utf8')) };
  return memoria.processos.valor;
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
          processos: url + '/api/v1/processos?esfera=civel&classe=&assunto=&comarca=&ano=&situacao=&resultado=&q=&pagina=1&por=50',
          processo: url + '/api/v1/processos/{numero CNJ}',
          publicacoes: url + '/api/v1/publicacoes/{numero CNJ}'
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

    if (recurso === 'processos') {
      const P = lerProcessos();
      if (!P) return responder(res, 503, { erro: 'Lista de processos ainda não gerada.' });
      let lista = P.processos;
      const esfera = q.get('esfera') || 'civel';
      if (esfera === 'civel') lista = lista.filter(p => !p.cr);
      if (esfera === 'criminal') lista = lista.filter(p => p.cr);
      if (q.get('classe')) lista = lista.filter(p => normal(p.c) === normal(q.get('classe')));
      if (q.get('assunto')) lista = lista.filter(p => p.a.some(a => normal(a) === normal(q.get('assunto'))));
      if (q.get('comarca')) lista = lista.filter(p => normal(p.co) === normal(q.get('comarca')));
      if (q.get('ano')) lista = lista.filter(p => p.aj && p.aj.startsWith(q.get('ano')));
      if (q.get('situacao') === 'julgado') lista = lista.filter(p => p.j);
      if (q.get('situacao') === 'sem-julgamento') lista = lista.filter(p => !p.j);
      if (q.get('resultado')) lista = lista.filter(p => p.j && normal(p.j[1]) === normal(q.get('resultado')));
      if (q.get('q')) {
        const termo = normal(q.get('q'));
        const digitos = q.get('q').replace(/\D/g, '');
        lista = lista.filter(p => (digitos.length >= 7 && p.n.replace(/\D/g, '').includes(digitos)) || normal([p.c, p.o, p.co, p.a.join(' ')].join(' ')).includes(termo));
      }
      const por = Math.min(100, Math.max(1, Number(q.get('por')) || 50));
      const pagina = Math.max(1, Number(q.get('pagina')) || 1);
      return responder(res, 200, {
        fonte: P.fonte, extraidoEm: P.extraidoEm, total: lista.length, pagina, por,
        legenda: { n: 'número CNJ', c: 'classe', o: 'gabinete no 2º grau', a: 'assuntos', co: 'comarca de origem', aj: 'chegada ao 2º grau', at: 'última atualização', u: 'última movimentação [data, nome]', j: 'último julgamento registrado [data, resultado]', cr: '1 se criminal' },
        processos: lista.slice((pagina - 1) * por, pagina * por)
      }, CACHE_DADOS);
    }

    if (recurso === 'publicacoes' && partes[3]) {
      const digitos = decodeURIComponent(partes[3]).replace(/\D/g, '');
      if (digitos.length !== 20) return responder(res, 400, { erro: 'Informe o número CNJ completo, com 20 dígitos.' });
      const r = await fetch('https://comunicaapi.pje.jus.br/api/v1/comunicacao?siglaTribunal=TJRO&numeroProcesso=' + digitos, { headers: { 'User-Agent': 'OJSA/1.0 (observatorio academico)' } });
      if (!r.ok) return responder(res, 502, { erro: 'O Diário de Justiça Eletrônico Nacional não respondeu (' + r.status + ').' });
      const j = await r.json();
      const itens = (j.items || []).map(i => ({
        data: i.data_disponibilizacao, tipo: i.tipoComunicacao, documento: i.tipoDocumento, orgao: i.nomeOrgao,
        classe: i.nomeClasse, link: i.link || null, texto: (i.texto || '').replace(/ /g, ' ').replace(/\s+/g, ' ').trim()
      })).sort((a, b) => (b.data || '').localeCompare(a.data || ''));
      return responder(res, 200, { numero: dj.formatarNumero(digitos), fonte: 'Diário de Justiça Eletrônico Nacional (CNJ), via Comunica PJe', consultadoEm: new Date().toISOString(), total: itens.length, publicacoes: itens }, 'public, max-age=1800, s-maxage=21600, stale-while-revalidate=86400');
    }

    return responder(res, 404, { erro: 'Endereço desconhecido. Veja ' + url + '/api/' + VERSAO });
  } catch (e) {
    return responder(res, 500, { erro: 'Erro interno: ' + e.message });
  }
}

module.exports = { tratar };
