// Entrada da API na Vercel: todas as rotas /api/* chegam aqui (ver vercel.json).
const { tratar } = require('../servidor/api');

module.exports = (req, res) => tratar(req, res);
