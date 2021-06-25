const { message } = require("./common");

const info = (text, progress = false) => message({ text, progress });

module.exports.info = info;
