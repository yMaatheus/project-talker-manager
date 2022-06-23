const express = require('express');
const rescue = require('express-rescue');
const { HTTP_OK, HTTP_404 } = require('../helpers/httpCodeStatus');
const randomToken = require('../helpers/token');

const router = express.Router();

router.post('/', rescue(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)res.status(HTTP_404).json({ message: 'Email and password required' });
    const token = randomToken();
    res.status(HTTP_OK).json({ token });
}));

module.exports = router;