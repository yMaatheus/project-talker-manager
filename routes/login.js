const express = require('express');
const rescue = require('express-rescue');

const randomToken = require('../helpers/token');
const { HTTP_OK } = require('../helpers/httpCodeStatus');
const { validateEmail, validatePassword } = require('../middlewares/loginMiddleware');

const router = express.Router();

router.post('/', validateEmail, validatePassword, rescue(async (req, res) => {
    const token = randomToken();
    res.status(HTTP_OK).json({ token });
}));

module.exports = router;