const validateName = async (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'O campo "name" é obrigatório' });
    }
    if (name.length < 3) {
        return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    next();
};

const validateAge = async (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({ message: 'O campo "age" é obrigatório' });
    }
    if (age < 18) {
        return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
    }
    next();
};

const validateTalk = async (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    next();
};

const validateWatchedAt = async (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    const regexr = '\\d{2}/\\d{2}/\\d{4}';
    if (!watchedAt.match(regexr)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    next();
};

const validateRate = async (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (rate == null) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (rate < 1 || rate > 5) {
        return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
    }
    next();
};

const validateTalker = [validateName, validateAge, validateTalk, validateWatchedAt, validateRate];

module.exports = { validateTalker };