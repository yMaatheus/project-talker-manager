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
  const talker = talkers.find(({ id: talkerId }) => +id === talkerId);

  if (!talker)res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
})).put('/:id', validateToken, validateTalker, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const readTalkers = await readFile('./talker.json');
  const talkers = readTalkers.filter(({ id: talkerId }) => talkerId !== +id);

  const newTalker = { id: +id, name, age, talk };
  const newTalkers = [...talkers, newTalker];

  await writeFile('talker.json', JSON.stringify(newTalkers));
  res.status(200).json(newTalker);
}));

module.exports = router;