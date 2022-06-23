const express = require('express');
const rescue = require('express-rescue');

const randomToken = require('../helpers/token');
const writeFile = require('../helpers/writeFile');
const { HTTP_OK } = require('../helpers/httpCodeStatus');
const { validateEmail, validatePassword } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/', validateEmail, validatePassword, rescue(async (_req, res) => {
    const token = randomToken();
    await writeFile('token.json', JSON.stringify(token));
    res.status(HTTP_OK).json({ token });
}));

module.exports = router;