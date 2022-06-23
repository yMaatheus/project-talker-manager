const readFile = require('../helpers/readFile');

const validateToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado' });
    }
    const tokenValid = await readFile('token.json');
    if (token !== tokenValid) {
        return res.status(401).json({ message: 'Token inválido' });
    }
    next();
};

module.exports = validateToken;