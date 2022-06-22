const fs = require('fs/promises');

const readFile = async (file) => {
    const data = await fs.readFile(file, { encoding: 'utf8' });
    try {
        if (file.includes('.json')) {
            return JSON.parse(data);
        }
    } catch (error) {
        return data;
    }
    return data;
};

module.exports = readFile;