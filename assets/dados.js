// Acervo do OJSA: acórdãos do TJRO sobre conflitos socioambientais.
// Fontes de cada ficha: notícias institucionais do TJRO (e republicações), bases acadêmicas de litígios
// e a API Pública do DataJud (CNJ), consultada em 09/11/2026. Nada aqui é ilustrativo.
// natureza: F = fato documentado na fonte, S = síntese editorial, I = inferência da pesquisa.

window.OJSA = {
  atualizadoEm: '09/11/2026',

  eixos: [
    {
      id: 'empreendimentos',
      nome: 'Grandes empreendimentos e transformações territoriais',
      curto: 'Grandes empreendimentos',
      resumo: 'Hidrelétricas, reassentamentos, impactos territoriais e alterações nos modos de vida.',
      texto: 'Em Rondônia, as usinas do Rio Madeira mudaram a dinâmica do rio, a pesca e a ocupação das margens. Os conflitos que chegam ao TJRO costumam discutir quem prova o dano, como se mede a perda de quem vive do rio e qual reparação é devida.',
      atores: ['Concessionárias de energia', 'Comunidades ribeirinhas', 'Pescadores', 'Ministério Público', 'Órgãos de licenciamento'],
      direitos: ['Reparação integral', 'Moradia', 'Trabalho e subsistência', 'Meio ambiente equilibrado']
    },
    {
      id: 'aguas',
      nome: 'Águas, rios e comunidades',
      curto: 'Águas e rios',
      resumo: 'Uso dos recursos hídricos, pesca, territorialidades ribeirinhas e meios de subsistência.',
      texto: 'Reúne decisões em que o rio é parte do conflito: margens ocupadas, faixas de preservação, cheias, erosão e acesso à água e à pesca. A proteção das margens e a permanência de quem vive nelas aparecem muitas vezes em tensão.',
      atores: ['Moradores de áreas ribeirinhas', 'Municípios', 'Pescadores', 'Concessionárias'],
      direitos: ['Moradia', 'Meio ambiente equilibrado', 'Acesso à água', 'Modos de vida tradicionais']
    },
    {
      id: 'territorios',
      nome: 'Territórios tradicionais e áreas protegidas',
      curto: 'Territórios e áreas protegidas',
      resumo: 'Direitos territoriais, unidades de conservação, ocupações e processos de desintrusão.',
      texto: 'Trata das unidades de conservação, das terras de povos e comunidades tradicionais e das normas que alteram sua proteção. Inclui ações de desocupação e o controle de leis estaduais que reduzem áreas ou a participação dessas comunidades.',
      atores: ['Estado de Rondônia', 'Assembleia Legislativa', 'Comunidades tradicionais', 'Associações de produtores', 'Ministério Público'],
      direitos: ['Território', 'Participação', 'Vedação ao retrocesso ambiental', 'Meio ambiente equilibrado']
    },
    {
      id: 'fundiario',
      nome: 'Disputas fundiárias e uso do território',
      curto: 'Disputas fundiárias',
      resumo: 'Conflitos de ocupação, propriedade, atividades econômicas e interesses coletivos.',
      texto: 'Decisões sobre quem pode ocupar e usar uma área: moradias em área de preservação, loteamentos sem infraestrutura ou clandestinos, ocupações em terra pública. O tribunal pondera moradia, posse antiga e proteção ambiental.',
      atores: ['Municípios', 'Moradores', 'Loteadoras e construtoras', 'Associações rurais', 'Defensoria Pública'],
      direitos: ['Moradia', 'Função social da propriedade', 'Meio ambiente equilibrado', 'Ordenação urbana']
    },
    {
      id: 'danos',
      nome: 'Danos e reparação socioambiental',
      curto: 'Danos e reparação',
      resumo: 'Danos com efeitos sociais e ambientais, obrigações de fazer, medidas de reparação e prevenção.',
      texto: 'Acompanha as respostas do tribunal a danos já ocorridos: indenizações, recuperação de áreas, multas e a responsabilidade de cada envolvido, inclusive do poder público que deveria fiscalizar.',
      atores: ['Ministério Público', 'Municípios', 'Empresas', 'Moradores atingidos'],
      direitos: ['Reparação integral', 'Prevenção', 'Responsabilidade solidária']
    }
  ],

  fichas: [
    {
      id: 'ojsa-0001',
      titulo: 'Desbarrancamento na comunidade São Sebastião e a usina de Santo Antônio',
      processo: '0016324-88.2014.8.22.0001',
      classe: 'Apelação Cível',
      orgao: '2ª Câmara Cível',
      relatoria: 'Des. Alexandre Miguel',
      julgamento: null,
      dataReferencia: '2021-10-01',
      tipoData: 'Resultado registrado no DataJud',
      origem: '6ª Vara Cível de Porto Velho',
      eixos: ['empreendimentos', 'aguas'],
      subtema: 'Hidrelétrica e erosão das margens',
      municipio: { id: '1100205', nome: 'Porto Velho' },
      territorio: 'Comunidade São Sebastião (Ramal São Sebastião), margem esquerda do Rio Madeira',
      partes: 'Moradores da comunidade São Sebastião contra a concessionária da Usina Hidrelétrica Santo Antônio',
      sintese: { n: 'F', t: 'Os moradores alegaram prejuízos depois do início das obras da usina, com elevação das águas do Rio Madeira agravada pela cheia de 2014. A perícia apontou que a usina alterou a velocidade e a dinâmica do rio, o que intensificou o desbarrancamento que avança sobre o imóvel e ameaça a moradia. A sentença julgou os pedidos parcialmente procedentes e a concessionária apelou.' },
      atores: ['Moradores ribeirinhos', 'Concessionária da UHE Santo Antônio'],
      grupos: ['Comunidade ribeirinha São Sebastião'],
      direitos: ['Reparação de danos materiais e morais', 'Moradia', 'Posse'],
      pedidos: { n: 'F', t: 'A concessionária pediu a redução do dano moral para R$ 3 mil por autor.' },
      fundamentos: [
        { n: 'F', t: 'Laudo pericial e relatórios técnicos oficiais demonstram o nexo causal entre os danos e a atividade da ré.' },
        { n: 'F', t: 'A exploração da área sobre a posse dos autores pode ser reparada, ainda que o domínio pleno seja da União.' },
        { n: 'F', t: 'O valor do dano moral está dentro dos parâmetros adotados pela câmara em casos semelhantes.' }
      ],
      normas: ['Responsabilidade civil por dano (prova pericial)'],
      precedentes: [],
      resultado: 'Recurso desprovido',
      dispositivo: 'Apelação negada e sentença mantida, por unanimidade. Embargos de declaração rejeitados em 04/03/2022 e recurso especial registrado em 22/07/2022, segundo o DataJud.',
      providencias: ['Danos morais de R$ 10 mil para cada autor', 'Danos materiais fixados pela perícia', 'Condenação total acima de R$ 300 mil, segundo a notícia'],
      justica: {
        distribuicao: { n: 'I', t: 'Os efeitos da usina recaem sobre quem mora na margem do rio; a decisão transfere à concessionária o custo de reparar.' },
        reconhecimento: { n: 'I', t: 'A posse da comunidade é reconhecida como reparável mesmo em área de domínio da União.' },
        participacao: null
      },
      monitoramento: { n: 'S', t: 'Compõe a tendência sobre a prova do dano nos conflitos ligados às usinas do Rio Madeira. Aqui o nexo causal foi demonstrado por perícia, o que distingue o caso das ações de pescadores discutidas no STJ.', tendencia: 't2' },
      fontes: [
        { tipo: 'Notícia do TJRO republicada', veiculo: 'Jornal da Ordem, OAB/RS', data: '10/09/2021', url: 'https://www2.oabrs.org.br/jornalDaOrdem/por-prejuizos-causados-2-camara-civel-mantem-condenacao-de-empresa-de-geracao-e-transmissao-de-energia/47860' }
      ],
      trecho: 'nexo causal dentre os danos sofridos pelos requerentes e os atos praticados pela requerida'
    },
    {
      id: 'ojsa-0002',
      titulo: 'Desocupação da Estação Ecológica Samuel',
      processo: '0811749-26.2022.8.22.0000',
      processosConexos: ['0811692-08.2022.8.22.0000'],
      classe: 'Agravo de Instrumento',
      orgao: '2ª Câmara Especial',
      relatoria: 'Des. Miguel Monico Neto',
      julgamento: '2023-08-15',
      dataReferencia: '2023-08-15',
      tipoData: 'Julgamento',
      origem: '1ª Vara da Fazenda Pública de Porto Velho (ação civil pública do MPRO)',
      eixos: ['territorios', 'fundiario'],
      subtema: 'Ocupação de unidade de conservação de proteção integral',
      municipio: { id: '1100809', nome: 'Candeias do Jamari' },
      territorio: 'Estação Ecológica Samuel',
      partes: 'Associação de Produtores Rurais do Projeto de Assentamento Nova Jatuarana (ASPRONOJA) e Associação de Produtores Rurais da Comunidade Rio Verde (ASPRURIV) contra o Ministério Público do Estado de Rondônia',
      sintese: { n: 'F', t: 'As associações ocuparam áreas da Estação Ecológica Samuel sem autorização do Estado e construíram imóveis. Em ação civil pública do Ministério Público, o juízo concedeu tutela de urgência para a desocupação imediata. As associações recorreram por agravo de instrumento.' },
      atores: ['Associações de produtores rurais', 'Ministério Público do Estado de Rondônia', 'Estado de Rondônia'],
      grupos: ['Famílias ligadas às associações ocupantes'],
      direitos: ['Meio ambiente equilibrado', 'Posse', 'Moradia e trabalho rural'],
      pedidos: { n: 'F', t: 'Efeito suspensivo e reforma da decisão que determinou a desocupação.' },
      fundamentos: [
        { n: 'F', t: 'Princípios da precaução e da prevenção: a resposta judicial deve ser rápida porque o dano ambiental é muitas vezes irreversível.' },
        { n: 'F', t: 'Dignidade humana em sua dimensão ecológica e direito fundamental ao meio ambiente ecologicamente equilibrado.' },
        { n: 'F', t: 'Terras públicas não recebem proteção possessória em favor de particulares.' }
      ],
      normas: ['CF, art. 225', 'Princípios da precaução e da prevenção'],
      precedentes: [{ n: 'F', t: 'Jurisprudência do STJ sobre o dever estatal de proteção ambiental, sem indicação do precedente na fonte.' }],
      resultado: 'Recurso desprovido',
      dispositivo: 'Os dois agravos de instrumento foram desprovidos, com participação dos desembargadores Hiram Marques e Roosevelt Queiroz. A desocupação imediata foi mantida. O DataJud registra o não provimento em 17/08/2023 nos dois processos.',
      providencias: ['Desocupação imediata da unidade de conservação'],
      justica: {
        distribuicao: { n: 'I', t: 'O custo da proteção da unidade recai sobre as famílias ocupantes, sem menção, na fonte, a medidas de realocação.' },
        reconhecimento: { n: 'I', t: 'Os ocupantes são tratados como particulares em terra pública; a fonte não indica discussão sobre sua condição social.' },
        participacao: null
      },
      monitoramento: { n: 'S', t: 'Registro isolado sobre tutela de urgência em área protegida apoiada nos princípios da precaução e da prevenção.', tendencia: 't4' },
      fontes: [
        { tipo: 'Notícia do TJRO republicada', veiculo: 'Lex', data: '28/08/2023', url: 'https://www.lex.com.br/tribunal-determina-desocupacao-imediata-de-area-de-conservacao-ambiental-em-candeias-do-jamari/' }
      ],
      trecho: 'a tolerância do Poder Público quanto à ocupação de suas terras por particulares não faz nascer, para estes, direitos'
    },
    {
      id: 'ojsa-0003',
      titulo: 'Participação de comunidades tradicionais na política estadual de governança climática',
      processo: '0820695-16.2024.8.22.0000',
      classe: 'Ação Direta de Inconstitucionalidade',
      orgao: 'Tribunal Pleno',
      relatoria: 'Des. José Antônio Robles; acórdão nos termos do voto divergente do Des. Alexandre Miguel',
      julgamento: null,
      dataReferencia: '2025-10-02',
      tipoData: 'Resultado registrado no DataJud',
      origem: 'Competência originária do TJRO, ajuizada em 16/12/2024',
      eixos: ['territorios'],
      subtema: 'Governança climática e participação social',
      municipio: null,
      territorio: 'Abrangência estadual',
      partes: 'Ministério Público do Estado de Rondônia (Procurador-Geral de Justiça) contra o Estado de Rondônia e a Assembleia Legislativa',
      sintese: { n: 'F', t: 'A ação questionou a Lei Estadual n. 5.868/2024, que alterou a Lei n. 4.437/2018 (Política Estadual de Governança Climática e Serviços Ambientais). Segundo o Ministério Público, a nova lei suprimiu a participação da sociedade civil e de comunidades tradicionais, concentrou no Executivo atribuições antes colegiadas e afastou normas gerais federais.' },
      atores: ['Ministério Público do Estado de Rondônia', 'Estado de Rondônia', 'Assembleia Legislativa de Rondônia'],
      grupos: ['Comunidades tradicionais', 'Sociedade civil organizada'],
      direitos: ['Participação', 'Vedação ao retrocesso ambiental', 'Meio ambiente equilibrado'],
      pedidos: { n: 'F', t: 'Declaração de inconstitucionalidade da Lei Estadual n. 5.868/2024.' },
      fundamentos: [
        { n: 'F', t: 'Inconstitucionalidade formal: a lei excedeu a competência concorrente do Estado e contrariou normas gerais federais.' },
        { n: 'F', t: 'Exclusão da participação deliberativa da sociedade civil e das comunidades tradicionais, com ofensa à democracia participativa, à transparência e à publicidade.' },
        { n: 'F', t: 'Inconstitucionalidade material por retrocesso na proteção ambiental.' }
      ],
      normas: ['CF, art. 24, VI', 'CF, art. 225', 'CF, art. 1º, parágrafo único', 'CF, art. 37', 'Constituição de Rondônia, arts. 218 e 219', 'Lei 12.187/2009'],
      precedentes: [
        { n: 'F', t: 'STF, ADPF 651/DF, rel. Min. Cármen Lúcia, j. 28/4/2022.' },
        { n: 'F', t: 'STF, ADI 3540.' },
        { n: 'F', t: 'STF, ADI 6672/RR.' },
        { n: 'F', t: 'STF, ARE 1.340.483/SP.' }
      ],
      resultado: 'Pedido procedente',
      dispositivo: 'Pedido julgado procedente, por maioria, com declaração de inconstitucionalidade dos arts. 1º e 2º da Lei Estadual n. 5.868/2024. O DataJud registra a procedência em 02/10/2025, embargos de declaração acolhidos em parte em 09/01/2026 e recurso extraordinário em 07/05/2026.',
      providencias: ['Declaração de inconstitucionalidade dos arts. 1º e 2º da Lei 5.868/2024'],
      justica: {
        distribuicao: null,
        reconhecimento: { n: 'I', t: 'Comunidades tradicionais aparecem como sujeitos cuja presença nos colegiados tem valor constitucional.' },
        participacao: { n: 'F', t: 'A supressão da participação da sociedade civil e das comunidades tradicionais é o centro da controvérsia.' }
      },
      monitoramento: { n: 'S', t: 'Primeiro registro do acervo em que a participação é o próprio objeto da decisão.', tendencia: 't3' },
      fontes: [
        { tipo: 'Base de litígios climáticos', veiculo: 'Plataforma JUMA, PUC-Rio', data: 'consulta em 09/11/2026', url: 'https://plataformajuma.jur.puc-rio.br/visualizacao_caso/1419/0/' },
        { tipo: 'Base de litígios climáticos', veiculo: 'GPDClima, UFPel', data: '04/09/2026', url: 'https://wp.ufpel.edu.br/gpdclima/2026/09/04/processo-numero-0820695-16-2024-8-22-0000/' }
      ],
      trecho: 'É inconstitucional, por violar os princípios da vedação ao retrocesso ambiental, da participação democrática'
    },
    {
      id: 'ojsa-0004',
      titulo: 'Demolição de parte de residência em área de preservação no bairro Mocambo',
      processo: '7030078-02.2019.8.22.0001',
      classe: 'Apelação Cível',
      orgao: '2ª Câmara Especial',
      relatoria: 'Des. Miguel Monico Neto',
      julgamento: null,
      dataReferencia: '2021-09-27',
      tipoData: 'Resultado registrado no DataJud',
      origem: '1ª Vara de Fazenda e Saúde Pública de Porto Velho',
      eixos: ['fundiario', 'aguas'],
      subtema: 'Moradia em área de preservação permanente urbana',
      municipio: { id: '1100205', nome: 'Porto Velho' },
      territorio: 'Bairro Mocambo',
      partes: 'Morador do bairro Mocambo contra o Município de Porto Velho',
      sintese: { n: 'F', t: 'O Município de Porto Velho obteve sentença determinando a demolição de parte de uma residência construída em faixa marginal de curso d\'água, classificada como área de preservação permanente. O morador apelou.' },
      atores: ['Município de Porto Velho', 'Morador'],
      grupos: ['Moradores de áreas de preservação urbanas'],
      direitos: ['Moradia', 'Meio ambiente equilibrado'],
      pedidos: { n: 'F', t: 'Reforma da sentença e indenização.' },
      fundamentos: [
        { n: 'F', t: 'O Código Florestal classifica como APP as faixas marginais de cursos d\'água.' },
        { n: 'F', t: 'A teoria do fato consumado não se aplica à legislação ambiental, sob pena de perpetuar a degradação.' },
        { n: 'F', t: 'Ocupação antiga, pagamento de IPTU e tolerância do Município não afastam a violação ambiental.' }
      ],
      normas: ['CF, art. 225', 'Lei 12.651/2012 (Código Florestal)'],
      precedentes: [],
      resultado: 'Recurso desprovido',
      dispositivo: 'Recurso rejeitado por unanimidade, com participação do Des. Roosevelt Queiroz Costa. Sentença mantida, sem indenização. O DataJud registra o não provimento em 27/09/2021 e recurso especial em 13/06/2022.',
      providencias: ['Demolição da parte construída em APP', 'Custos da demolição a cargo do morador'],
      justica: {
        distribuicao: { n: 'I', t: 'O ônus da recomposição recai sobre o morador, inclusive o custo da demolição.' },
        reconhecimento: null,
        participacao: null
      },
      monitoramento: { n: 'S', t: 'Integra a divergência da 2ª Câmara Especial sobre demolição de moradias em APP urbana de Porto Velho.', tendencia: 't1' },
      fontes: [
        { tipo: 'Notícia do TJRO republicada', veiculo: 'Portal DORI', data: '20/09/2021', url: 'https://portaldori.com.br/2021/09/20/moradores-que-construiram-casas-sem-respeitar-area-de-protecao-permanente-deverao-demolir-edificacoes/' },
        { tipo: 'Notícia do TJRO republicada', veiculo: 'IRIB', data: '2021', url: 'https://www.irib.org.br/moradores-que-construiram-casas-sem-respeitar-area-de-protecao-permanente-deverao-demolir-edificacoes/' }
      ],
      trecho: null
    },
    {
      id: 'ojsa-0005',
      titulo: 'Demolição de parte de residência em área de preservação no bairro Costa e Silva',
      processo: '7042729-03.2018.8.22.0001',
      classe: 'Apelação Cível',
      orgao: '2ª Câmara Especial',
      relatoria: 'Juíza convocada Inês Moreira da Costa (gabinete do Des. Hiram Souza Marques)',
      julgamento: null,
      dataReferencia: '2021-10-20',
      tipoData: 'Resultado registrado no DataJud',
      origem: '2ª Vara de Fazenda e Saúde Pública de Porto Velho, ação ajuizada em 23/10/2018',
      eixos: ['fundiario', 'aguas'],
      subtema: 'Moradia em área de preservação permanente urbana',
      municipio: { id: '1100205', nome: 'Porto Velho' },
      territorio: 'Bairro Costa e Silva',
      partes: 'Moradora do bairro Costa e Silva contra o Município de Porto Velho',
      sintese: { n: 'F', t: 'Caso paralelo ao do bairro Mocambo: sentença determinou a demolição de parte de residência construída em área de preservação permanente e a moradora recorreu.' },
      atores: ['Município de Porto Velho', 'Moradora'],
      grupos: ['Moradores de áreas de preservação urbanas'],
      direitos: ['Moradia', 'Meio ambiente equilibrado'],
      pedidos: { n: 'F', t: 'Reforma da sentença e indenização.' },
      fundamentos: [
        { n: 'F', t: 'Ao saber da irregularidade, a moradora assumiu o risco e suas consequências.' },
        { n: 'F', t: 'A fiscalização cabe ao Poder Executivo, não ao Judiciário.' }
      ],
      normas: ['CF, art. 225', 'Lei 12.651/2012 (Código Florestal)'],
      precedentes: [],
      resultado: 'Recurso desprovido',
      dispositivo: 'Recurso rejeitado por unanimidade. Sentença mantida, sem indenização. O DataJud registra o não provimento em 20/10/2021, embargos de declaração rejeitados em 23/03/2022 e recurso especial em 27/09/2022.',
      providencias: ['Demolição da parte construída em APP', 'Custos da demolição a cargo da moradora'],
      justica: {
        distribuicao: { n: 'I', t: 'Assim como no caso do Mocambo, a moradora arca com a demolição e não recebe indenização.' },
        reconhecimento: null,
        participacao: null
      },
      monitoramento: { n: 'S', t: 'Integra a divergência da 2ª Câmara Especial sobre demolição de moradias em APP urbana de Porto Velho.', tendencia: 't1' },
      fontes: [
        { tipo: 'Notícia do TJRO republicada', veiculo: 'Portal DORI', data: '20/09/2021', url: 'https://portaldori.com.br/2021/09/20/moradores-que-construiram-casas-sem-respeitar-area-de-protecao-permanente-deverao-demolir-edificacoes/' }
      ],
      trecho: null
    },
    {
      id: 'ojsa-0006',
      titulo: 'Imóvel na margem do Rio Madeira, região do Triângulo, km 2,5 da Madeira Mamoré',
      processo: null,
      classe: 'Apelação Cível',
      orgao: '2ª Câmara Especial',
      relatoria: 'Des. Roosevelt Queiroz Costa',
      julgamento: null,
      dataReferencia: '2022-07-22',
      tipoData: 'Data da notícia',
      origem: null,
      eixos: ['fundiario', 'aguas'],
      subtema: 'Moradia em área de preservação permanente às margens do Madeira',
      municipio: { id: '1100205', nome: 'Porto Velho' },
      territorio: 'Região do Triângulo, Estrada de Ferro Madeira Mamoré, altura do km 2,5',
      partes: 'O.P.B. contra o Município de Porto Velho',
      sintese: { n: 'F', t: 'Vistoria constatou que o imóvel, a 109,43 metros do Rio Madeira, estava dentro da faixa de preservação permanente de 500 metros. A defesa alegou cerceamento de defesa e invocou a dignidade humana e o direito à moradia.' },
      atores: ['Município de Porto Velho', 'Ocupante do imóvel'],
      grupos: ['Moradores da margem do Rio Madeira'],
      direitos: ['Moradia', 'Dignidade humana', 'Meio ambiente equilibrado'],
      pedidos: { n: 'F', t: 'Anulação ou reforma da sentença que autorizou a demolição.' },
      fundamentos: [
        { n: 'F', t: 'A alegação de falta de análise dos pedidos é genérica e não aponta falhas concretas.' },
        { n: 'F', t: 'O direito à moradia não é absoluto e deve observar as normas ambientais e urbanísticas.' }
      ],
      normas: ['CF, art. 6º (moradia, ponderada)', 'Normas ambientais e urbanísticas municipais'],
      precedentes: [],
      resultado: 'Recurso desprovido',
      dispositivo: 'Apelação negada. Mantida a demolição do imóvel.',
      providencias: ['Demolição do imóvel'],
      justica: {
        distribuicao: { n: 'I', t: 'A permanência na margem do rio é afastada em favor da proteção da faixa ribeirinha.' },
        reconhecimento: { n: 'I', t: 'O direito à moradia é reconhecido, mas tratado como não absoluto.' },
        participacao: null
      },
      monitoramento: { n: 'S', t: 'Mesma região do caso de 2019 em que a câmara afastou a demolição; aqui a solução foi a oposta.', tendencia: 't1' },
      fontes: [
        { tipo: 'Notícia do TJRO republicada', veiculo: 'Lex', data: '22/07/2022', url: 'https://www.lex.com.br/imovel-em-area-de-preservacao-as-margens-do-madeira-tera-de-ser-demolido/' }
      ],
      trecho: 'Comprovada a ocupação irregular de área pública'
    },
    {
      id: 'ojsa-0007',
      titulo: 'Loteamento sem infraestrutura em Vilhena e a responsabilidade do Município',
      processo: '0007958-55.2013.8.22.0014',
      classe: 'Apelação Cível',
      orgao: '1ª Câmara Especial',
      relatoria: 'Des. Gilberto Barbosa',
      julgamento: null,
      dataReferencia: '2021-04-12',
      tipoData: 'Resultado registrado no DataJud',
      origem: '4ª Vara Cível de Vilhena, ação ajuizada em 06/08/2013',
      eixos: ['danos', 'fundiario'],
      subtema: 'Loteamento urbano, inundações e erosão',
      municipio: { id: '1100304', nome: 'Vilhena' },
      territorio: 'Loteamento Cidade Parque Cidade Jardim II',
      partes: 'Ministério Público contra Construtora Morena Sul Ltda., M.S., W.Z.A.S. e Município de Vilhena',
      sintese: { n: 'F', t: 'O loteamento foi aprovado sem projeto de infraestrutura básica, o que provocou inundações e erosões. Havia licenças ambientais vencidas e faltavam sistemas de drenagem, esgoto, iluminação e abastecimento de água. A sentença condenou a construtora e os sócios e reconheceu responsabilidade apenas subsidiária do Município.' },
      atores: ['Ministério Público', 'Construtora', 'Município de Vilhena'],
      grupos: ['Moradores do loteamento'],
      direitos: ['Meio ambiente equilibrado', 'Reparação integral', 'Ordenação urbana'],
      pedidos: { n: 'F', t: 'O Ministério Público pediu a responsabilidade solidária do Município. Os réus alegaram ter cumprido as normas técnicas e atribuíram ao Município a falta de interligação do esgoto.' },
      fundamentos: [
        { n: 'F', t: 'O Município autorizou a obra e tem o poder-dever de fiscalizar.' },
        { n: 'F', t: 'Há culpa concorrente do Município e do empreendimento particular.' },
        { n: 'F', t: 'Termo de ajustamento de conduta já previa obrigações de reparação.' }
      ],
      normas: ['Poder-dever de fiscalização do Município', 'Termo de ajustamento de conduta'],
      precedentes: [],
      resultado: 'Recurso provido',
      dispositivo: 'Provida a apelação do Ministério Público para tornar solidária a responsabilidade do Município; desprovidas as apelações da construtora e dos sócios. O DataJud registra provimento e não provimento em 12/04/2021.',
      providencias: ['Indenização por dano ambiental de R$ 300 mil', 'Multa diária de R$ 2 mil, limitada a R$ 200 mil', 'Recuperação da área degradada e remoção de resíduos', 'Responsabilidade solidária do Município até a comprovação da recuperação'],
      justica: {
        distribuicao: { n: 'I', t: 'Os moradores do loteamento suportam inundações e erosão; a decisão amplia quem responde pela reparação.' },
        reconhecimento: null,
        participacao: null
      },
      monitoramento: { n: 'S', t: 'Sem tendência associada. Pode abrir um eixo sobre responsabilidade do poder público por omissão na fiscalização.', tendencia: null },
      fontes: [
        { tipo: 'Notícia do TJRO republicada', veiculo: 'IRIB', data: '2021', url: 'https://www.irib.org.br/?p=50831' }
      ],
      trecho: null
    },
    {
      id: 'ojsa-0008',
      titulo: 'Demolição afastada no bairro Triângulo pelo princípio da proporcionalidade',
      processo: null,
      classe: 'Apelação Cível',
      orgao: '2ª Câmara Especial',
      relatoria: 'Des. Hiram Marques',
      julgamento: null,
      dataReferencia: '2019-11-13',
      tipoData: 'Data da notícia',
      origem: null,
      eixos: ['fundiario', 'aguas'],
      subtema: 'Moradia em área de preservação permanente às margens do Madeira',
      municipio: { id: '1100205', nome: 'Porto Velho' },
      territorio: 'Bairro Triângulo, a menos de 500 metros da calha do Rio Madeira',
      partes: 'Moradora do bairro Triângulo, representada pela Defensoria Pública do Estado, contra o Município de Porto Velho',
      sintese: { n: 'F', t: 'A sentença havia determinado a demolição da casa por estar a menos de 500 metros da borda do Rio Madeira, em área de preservação permanente. A Defensoria Pública recorreu invocando o direito à moradia e a existência de outros moradores na mesma situação no bairro.' },
      atores: ['Município de Porto Velho', 'Moradora', 'Defensoria Pública do Estado de Rondônia'],
      grupos: ['Moradores do bairro Triângulo'],
      direitos: ['Moradia', 'Meio ambiente equilibrado', 'Acesso à justiça'],
      pedidos: { n: 'F', t: 'Reforma da sentença para impedir a demolição.' },
      fundamentos: [
        { n: 'F', t: 'O relator reconheceu a restrição do Código Florestal, mas aplicou a proporcionalidade diante das peculiaridades do caso concreto.' },
        { n: 'F', t: 'A câmara já havia decidido caso semelhante em área urbana consolidada, com energia elétrica, água e coleta de lixo, em que a demolição não teria efeito prático para recuperar a área.' }
      ],
      normas: ['Lei 12.651/2012 (Código Florestal)', 'CF, art. 6º (moradia)', 'Princípio da proporcionalidade'],
      precedentes: [{ n: 'F', t: 'Precedente da própria 2ª Câmara Especial, voto do Des. Renato Martins Mimessi, sobre área urbana consolidada.' }],
      resultado: 'Recurso provido',
      dispositivo: 'Apelação provida. Sentença reformada e demolição proibida.',
      providencias: ['Proibição da demolição da residência'],
      justica: {
        distribuicao: { n: 'I', t: 'O custo da proteção da margem não é imposto à moradora isoladamente quando a área já está urbanizada.' },
        reconhecimento: { n: 'I', t: 'A situação coletiva do bairro e o direito à moradia pesam na decisão.' },
        participacao: { n: 'I', t: 'A atuação da Defensoria Pública garante o acesso à justiça de quem seria removido.' }
      },
      monitoramento: { n: 'S', t: 'Decisão que diverge das de 2021 e 2022 da mesma câmara sobre APP urbana em Porto Velho.', tendencia: 't1' },
      fontes: [
        { tipo: 'Notícia do TJRO republicada', veiculo: 'Diário das Leis', data: '13/11/2019', url: 'https://www.diariodasleis.com.br/blog/bdi/noticia/moradora-apela-e-consegue-no-tjro-a-reversao-da-demolicao-de-sua-casa' }
      ],
      trecho: 'não é viável a construção de edificação em local com menos de 500 metros da borda da calha do Rio Madeira'
    },
    {
      id: 'ojsa-0009',
      titulo: 'Loteamentos clandestinos na margem esquerda do Rio Madeira',
      processo: '7062841-61.2016.8.22.0001',
      classe: 'Apelação Cível',
      orgao: null,
      relatoria: null,
      julgamento: null,
      dataReferencia: '2024-10-01',
      tipoData: 'Resultado registrado no DataJud',
      origem: '1ª Vara de Fazenda e Saúde Pública de Porto Velho, ação civil pública ajuizada em 12/12/2016',
      eixos: ['fundiario', 'aguas'],
      subtema: 'Parcelamento irregular do solo e expansão urbana sobre a margem do rio',
      municipio: { id: '1100205', nome: 'Porto Velho' },
      territorio: 'Margem esquerda do Rio Madeira, loteamento Cidade Alta',
      partes: 'Ministério Público do Estado de Rondônia contra responsáveis pelos loteamentos',
      sintese: { n: 'F', t: 'Depois da construção da ponte da BR-319, houve ocupação desordenada na margem esquerda do Rio Madeira. Em 2016, a juíza Inês Moreira da Costa suspendeu as atividades dos loteamentos clandestinos, proibiu a venda de lotes e determinou que o Município fiscalizasse a área e embargasse as obras. O Plano Diretor não prevê a área como de expansão urbana.' },
      atores: ['Ministério Público do Estado de Rondônia', 'Loteadores', 'Município de Porto Velho'],
      grupos: ['Compradores de lotes', 'Moradores da margem esquerda'],
      direitos: ['Ordenação urbana', 'Meio ambiente equilibrado', 'Moradia'],
      pedidos: { n: 'F', t: 'Suspensão dos loteamentos, proibição de vendas e fiscalização pelo Município.' },
      fundamentos: [
        { n: 'F', t: 'A lei municipal de expansão urbana (Lei n. 520/2014) foi declarada inconstitucional pelo TJRO.' },
        { n: 'F', t: 'A legislação municipal proíbe parcelamento urbano fora das zonas urbanas e de expansão.' }
      ],
      normas: ['Lei Complementar Municipal n. 97/1999', 'Plano Diretor de Porto Velho'],
      precedentes: [{ n: 'F', t: 'TJRO, processo 0010778-55.2014.8.22.0000, que declarou inconstitucional a Lei Municipal n. 520/2014.' }],
      resultado: 'Recurso desprovido',
      dispositivo: 'O DataJud registra o não provimento da apelação em 01/10/2024 e 08/10/2024 e recurso especial em 26/02/2025. O teor do acórdão e a parte recorrente não foram localizados em fonte aberta.',
      providencias: ['Suspensão das atividades dos loteamentos (liminar de 2016)', 'Proibição de venda de lotes', 'Fiscalização e embargo de obras pelo Município'],
      justica: {
        distribuicao: { n: 'I', t: 'Quem comprou lote em área sem possibilidade de regularização arca com a perda, enquanto o loteador é o alvo da ação.' },
        reconhecimento: null,
        participacao: null
      },
      monitoramento: { n: 'S', t: 'Liga a ocupação das margens do Madeira às grandes obras de infraestrutura, tema dos eixos de empreendimentos e de águas.', tendencia: null },
      fontes: [
        { tipo: 'Notícia do TJRO republicada', veiculo: 'IRIB', data: '13/12/2016', url: 'https://www.irib.org.br/?p=53128' }
      ],
      trecho: 'a suspensão imediata das atividades inerentes a loteamentos clandestinos'
    }
  ],

  // Graus de evidência usados no Radar
  graus: [
    { id: 'isolado', nome: 'Registro isolado', def: 'Uma decisão no acervo. Serve para acompanhar, não para afirmar padrão.' },
    { id: 'observacao', nome: 'Em observação', def: 'Há decisões ou fontes em sentidos diferentes, ou o tema está em disputa em tribunal superior.' },
    { id: 'inicial', nome: 'Padrão inicial', def: 'Três ou mais decisões convergentes, ainda concentradas em poucos órgãos ou sem revisão completa.' },
    { id: 'sustentado', nome: 'Entendimento sustentado', def: 'Conjunto amplo e revisado, em mais de um órgão julgador e ao longo do tempo.' }
  ],

  tendencias: [
    {
      id: 't1',
      titulo: 'Demolição de moradias em área de preservação urbana de Porto Velho',
      grau: 'observacao',
      fichas: ['ojsa-0008', 'ojsa-0004', 'ojsa-0005', 'ojsa-0006'],
      orgaos: '2ª Câmara Especial',
      periodo: '2019 a 2022',
      descricao: 'Em 2019, a câmara afastou a demolição de uma casa no bairro Triângulo pela proporcionalidade, considerando a área urbana consolidada. Em 2021 e 2022, manteve demolições em três casos e recusou a ocupação antiga e o IPTU pago como razões para preservar a construção.',
      ressalvas: 'Quatro decisões de um único órgão, com mudança de composição no período. A súmula 613 do STJ, sobre o fato consumado, não aparece citada nas fontes. Nenhuma informação sobre o cumprimento das demolições.'
    },
    {
      id: 't2',
      titulo: 'Como se prova o dano causado pelas usinas do Rio Madeira',
      grau: 'observacao',
      fichas: ['ojsa-0001'],
      orgaos: '2ª Câmara Cível; STJ, 3ª e 4ª Turmas',
      periodo: '2021 a 2025',
      descricao: 'No caso da comunidade São Sebastião, o nexo causal foi demonstrado por perícia. Em ações de pescadores, o STJ discute se o TJRO pode reconhecer o dano sem prova individualizada.',
      ressalvas: 'Uma ficha do TJRO no acervo. Os casos dos pescadores ainda não têm ficha porque o número de origem no TJRO não foi divulgado nas fontes abertas.'
    },
    {
      id: 't3',
      titulo: 'Participação de comunidades tradicionais como parâmetro de validade de leis ambientais',
      grau: 'isolado',
      fichas: ['ojsa-0003'],
      orgaos: 'Tribunal Pleno',
      periodo: '2025',
      descricao: 'A supressão da participação da sociedade civil e de comunidades tradicionais em colegiado ambiental foi tratada como vício constitucional, por maioria.',
      ressalvas: 'Uma decisão, com recurso extraordinário pendente no STF.'
    },
    {
      id: 't4',
      titulo: 'Precaução como fundamento para desocupar áreas protegidas em caráter de urgência',
      grau: 'isolado',
      fichas: ['ojsa-0002'],
      orgaos: '2ª Câmara Especial',
      periodo: '2023',
      descricao: 'A câmara manteve tutela de urgência de desocupação de unidade de conservação com base na precaução e na prevenção.',
      ressalvas: 'Uma decisão em agravo, ou seja, em juízo provisório. O mérito da ação civil pública não está no acervo.'
    }
  ],

  divergencias: [
    {
      titulo: 'Demolição de moradias em área de preservação às margens do Madeira',
      lados: [
        { quem: 'TJRO, 2ª Câmara Especial, 2019', texto: 'Afastou a demolição no bairro Triângulo pela proporcionalidade, em área urbana consolidada com serviços públicos.', ficha: 'ojsa-0008' },
        { quem: 'TJRO, 2ª Câmara Especial, 2021', texto: 'Manteve demolições nos bairros Mocambo e Costa e Silva e afastou a teoria do fato consumado em matéria ambiental.', ficha: 'ojsa-0004' },
        { quem: 'TJRO, 2ª Câmara Especial, 2022', texto: 'Manteve a demolição de imóvel na região do Triângulo; moradia não é direito absoluto.', ficha: 'ojsa-0006' }
      ],
      fontes: [
        { rotulo: 'Diário das Leis, 13/11/2019', url: 'https://www.diariodasleis.com.br/blog/bdi/noticia/moradora-apela-e-consegue-no-tjro-a-reversao-da-demolicao-de-sua-casa' },
        { rotulo: 'Portal DORI, 20/09/2021', url: 'https://portaldori.com.br/2021/09/20/moradores-que-construiram-casas-sem-respeitar-area-de-protecao-permanente-deverao-demolir-edificacoes/' },
        { rotulo: 'Lex, 22/07/2022', url: 'https://www.lex.com.br/imovel-em-area-de-preservacao-as-margens-do-madeira-tera-de-ser-demolido/' }
      ]
    },
    {
      titulo: 'Prova do dano de pescadores atingidos pelas usinas do Madeira',
      lados: [
        { quem: 'TJRO', texto: 'Reformou sentença de improcedência e reconheceu indenização a pescadores com base em presunção de dano ambiental, segundo a notícia sobre o recurso no STJ.' },
        { quem: 'STJ, 4ª Turma (REsp 2.102.646)', texto: 'Afastou indenização em caso ligado ao Complexo Hidrelétrico do Rio Madeira por falta de prova do dano e da atividade profissional.' },
        { quem: 'STJ, 3ª Turma (REsp 2.238.459)', texto: 'Placar de 2 a 2 e pedido de vista em dezembro de 2025; notícia posterior informa que a Turma, por maioria, manteve a condenação das usinas.' }
      ],
      fontes: [
        { rotulo: 'Migalhas, 09/12/2025', url: 'https://www.migalhas.com.br/quentes/446102/stj-analisa-se-usinas-no-rio-madeira-devem-indenizar-pescadores' },
        { rotulo: 'Lex, Quarta Turma', url: 'https://www.lex.com.br/quarta-turma-nao-ve-prova-de-dano-e-afasta-indenizacao-por-obras-de-hidreletrica-no-rio-madeira/' },
        { rotulo: 'Lex, Terceira Turma', url: 'https://www.lex.com.br/empresas-terao-de-indenizar-pescadores-prejudicados-pela-construcao-de-hidreletrica-no-rio-madeira/' }
      ]
    }
  ],

  precedentes: [
    {
      tribunal: 'STJ',
      ref: 'Súmula 613',
      texto: 'Não se admite a aplicação da teoria do fato consumado em tema de Direito Ambiental.',
      relacao: 'As decisões de 2021 afastam o fato consumado, mas as fontes não dizem se a súmula foi citada.',
      fichas: ['ojsa-0004', 'ojsa-0005'],
      url: 'https://scon.stj.jus.br/SCON/sumstj/'
    },
    {
      tribunal: 'STJ',
      ref: 'REsp 2.238.459, 3ª Turma',
      texto: 'Recurso das empresas das usinas de Jirau e Santo Antônio contra acórdão do TJRO que reconheceu indenização a pescadores.',
      relacao: 'Recurso contra decisão do TJRO cujo número de origem não foi divulgado.',
      fichas: [],
      url: 'https://www.migalhas.com.br/quentes/446102/stj-analisa-se-usinas-no-rio-madeira-devem-indenizar-pescadores'
    },
    {
      tribunal: 'STF',
      ref: 'ADPF 651/DF, rel. Min. Cármen Lúcia',
      texto: 'Julgada em 28/4/2022; trata da participação da sociedade civil em colegiados ambientais federais.',
      relacao: 'Precedente invocado na ação, segundo as bases de litígios climáticos.',
      fichas: ['ojsa-0003'],
      url: 'https://portal.stf.jus.br/'
    }
  ],

  biblioteca: [
    { id: 'legislacao', grupo: 'Legislação', itens: [
      { t: 'Constituição Federal de 1988, art. 225', d: 'Direito ao meio ambiente ecologicamente equilibrado.', url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm' },
      { t: 'Lei n. 6.938/1981', d: 'Política Nacional do Meio Ambiente.', url: 'https://www.planalto.gov.br/ccivil_03/leis/l6938.htm' },
      { t: 'Lei n. 7.347/1985', d: 'Ação civil pública.', url: 'https://www.planalto.gov.br/ccivil_03/leis/l7347orig.htm' },
      { t: 'Lei n. 9.985/2000', d: 'Sistema Nacional de Unidades de Conservação.', url: 'https://www.planalto.gov.br/ccivil_03/leis/l9985.htm' },
      { t: 'Lei n. 12.651/2012', d: 'Código Florestal.', url: 'https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12651.htm' },
      { t: 'Lei n. 12.187/2009', d: 'Política Nacional sobre Mudança do Clima.', url: 'https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2009/lei/l12187.htm' },
      { t: 'Lei Estadual n. 4.437/2018 (Rondônia)', d: 'Política Estadual de Governança Climática e Serviços Ambientais.', url: 'https://rondonia.ro.gov.br/wp-content/uploads/2024/12/Lei-4.4372018.pdf' }
    ]},
    { id: 'bases', grupo: 'Bases públicas', itens: [
      { t: 'Jurisprudência do TJRO', d: 'Consulta oficial de acórdãos.', url: 'https://webapp.tjro.jus.br/juris/consulta/consultaJuris.jsf' },
      { t: 'API Pública do DataJud, CNJ', d: 'Metadados e movimentos processuais usados nos indicadores e no monitoramento.', url: 'https://datajud-wiki.cnj.jus.br/api-publica/' },
      { t: 'SireneJud, CNJ', d: 'Painel de processos ambientais cruzados com áreas protegidas.', url: 'https://sirenejud.cnj.jus.br/mapa' },
      { t: 'Painel de Estatísticas do Poder Judiciário, CNJ', d: 'Dados do DataJud por tribunal e unidade.', url: 'https://justica-em-numeros.cnj.jus.br/painel-estatisticas/' },
      { t: 'Malhas territoriais, IBGE', d: 'Limites municipais usados no mapa.', url: 'https://servicodados.ibge.gov.br/api/docs/malhas' },
      { t: 'Plataforma JUMA, PUC-Rio', d: 'Banco de litígios climáticos no Brasil.', url: 'https://plataformajuma.jur.puc-rio.br/' }
    ]},
    { id: 'leituras', grupo: 'Leituras de referência', itens: [
      { t: 'ACSELRAD, Henri; MELLO, Cecília Campello do A.; BEZERRA, Gustavo das Neves. O que é justiça ambiental. Rio de Janeiro: Garamond, 2009.', d: 'Conceito de justiça ambiental no Brasil.' },
      { t: 'SCHLOSBERG, David. Defining environmental justice: theories, movements, and nature. Oxford: Oxford University Press, 2007.', d: 'Base das dimensões distributiva, de reconhecimento e de participação usadas nas fichas.' },
      { t: 'ZHOURI, Andréa; LASCHEFSKI, Klemens (org.). Desenvolvimento e conflitos ambientais. Belo Horizonte: Editora UFMG, 2010.', d: 'Tipologia de conflitos ambientais.' },
      { t: 'CAPPELLETTI, Mauro; GARTH, Bryant. Acesso à justiça. Porto Alegre: Sergio Antonio Fabris, 1988.', d: 'Acesso à justiça como efetividade.' }
    ]}
  ]
};
