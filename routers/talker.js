const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../middlewares/tokenMiddleware');
const { validateTalker } = require('../middlewares/talkerMiddleware');

const router = express.Router();

const readFile = require('../helpers/readFile');
const writeFile = require('../helpers/writeFile');

router.get('/', rescue(async (_req, res) => {
  const talkers = await readFile('./talker.json');
  res.status(200).json(talkers);
}))
.post('/', validateToken, validateTalker, rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile('./talker.json');
  const newId = (talkers.reduce((acc, { id }) => acc < id && id, 0)) + 1;
  const newTalker = { id: newId, name, age, talk };
  const newTalkers = [...talkers, newTalker];
  await writeFile('talker.json', JSON.stringify(newTalkers));
  res.status(201).json(newTalker);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile('./talker.json');
  const talkerObj = talkers.find((talker) => +id === talker.id);

  if (!talkerObj)res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talkerObj);
}));

module.exports = router;