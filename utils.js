const nanoId = require('nanoid');

const generateCode = (size = 8) => {
 return nanoId.nanoid(size);
}

module.exports = generateCode;