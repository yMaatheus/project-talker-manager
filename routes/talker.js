const express = require('express');
const rescue = require('express-rescue');
const { HTTP_OK, HTTP_404 } = require('../helpers/httpCodeStatus');

const router = express.Router();

const readFile = require('../helpers/readFile');

router.get('/', rescue(async (_req, res) => {
  const talkers = await readFile('./talker.json');
  res.status(HTTP_OK).json(talkers);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile('./talker.json');
  const talkerObj = talkers.find((talker) => +id === talker.id);

  if (!talkerObj)res.status(HTTP_404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(HTTP_OK).json(talkerObj);
}));

module.exports = router;