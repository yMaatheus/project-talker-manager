const express = require('express');
const rescue = require('express-rescue');
const { HTTP_OK_STATUS } = require('../helpers/httpCodeStatus');

const router = express.Router();

const readFile = require('../helpers/readFile');

router.get('/', rescue(async (_req, res) => {
  const talker = await readFile('./talker.json');
  res.status(HTTP_OK_STATUS).json(talker);
}));

module.exports = router;