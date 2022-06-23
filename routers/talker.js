const express = require('express');
const rescue = require('express-rescue');

const validateToken = require('../middlewares/tokenMiddleware');
const { validateTalker } = require('../middlewares/talkerMiddleware');

const router = express.Router();

const readFile = require('../helpers/readFile');
const writeFile = require('../helpers/writeFile');

const TALKER_FILE = './talker.json';

router.get('/', rescue(async (_req, res) => {
  const talkers = await readFile(TALKER_FILE);
  res.status(200).json(talkers);
}))
.post('/', validateToken, validateTalker, rescue(async (req, res) => {
  const { name, age, talk } = req.body;
  const talkers = await readFile(TALKER_FILE);

  const newId = (talkers.reduce((acc, { id }) => acc < id && id, 0)) + 1;

  const newTalker = { id: newId, name, age, talk };
  const newTalkers = [...talkers, newTalker];

  await writeFile(TALKER_FILE, JSON.stringify(newTalkers));

  res.status(201).json(newTalker);
}));

router.get('/search', validateToken, rescue(async (req, res) => {
  const { q } = req.query;
  const talkers = await readFile(TALKER_FILE);

  if (q == null) {
    res.status(200).json(talkers);
  }
  
  const search = q.toLowerCase();
  const searchTalkers = talkers.filter(({ name }) => name.toLowerCase().includes(search));

  res.status(200).json(searchTalkers);
}));

router.get('/:id', rescue(async (req, res) => {
  const { id } = req.params;
  const talkers = await readFile(TALKER_FILE);
  const talker = talkers.find(({ id: talkerId }) => +id === talkerId);

  if (!talker)res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).json(talker);
}))
.put('/:id', validateToken, validateTalker, rescue(async (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const readTalkers = await readFile(TALKER_FILE);
  const talkers = readTalkers.filter(({ id: talkerId }) => talkerId !== +id);

  const newTalker = { id: +id, name, age, talk };
  const newTalkers = [...talkers, newTalker];

  await writeFile(TALKER_FILE, JSON.stringify(newTalkers));
  res.status(200).json(newTalker);
}))
.delete('/:id', validateToken, rescue(async (req, res) => {
  const { id } = req.params;

  const readTalkers = await readFile(TALKER_FILE);
  const talkers = readTalkers.filter(({ id: talkerId }) => talkerId !== +id);

  await writeFile(TALKER_FILE, JSON.stringify(talkers));
  res.status(204).end();
}));

module.exports = router;