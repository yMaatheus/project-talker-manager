const crypto = require('crypto');

const randomToken = () => crypto.randomBytes(8).toString('hex');

module.exports = randomToken;
