const fs = require('fs/promises');

async function readFile(file) {
    const data = await fs.readFile(file, { encoding: 'utf8' });
    return file.includes('.json') ? JSON.parse(data) : data;
}

module.exports = readFile;