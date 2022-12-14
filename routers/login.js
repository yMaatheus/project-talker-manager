const express = require('express');
const rescue = require('express-rescue');

const randomToken = require('../helpers/token');
const writeFile = require('../helpers/writeFile');
const { validateEmail, validatePassword } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/', validateEmail, validatePassword, rescue(async (_req, res) => {
    const token = randomToken();
    await writeFile('token.json', JSON.stringify(token));
    res.status(200).json({ token });
}));

module.exports = router;