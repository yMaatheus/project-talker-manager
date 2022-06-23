const fs = require('fs/promises');

const writeFile = async (file, content) => fs.writeFile(file, content);

module.exports = writeFile;