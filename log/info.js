const { message } = require("./common");

const info = ({ text, config, important = true, progress = false }) =>
  message({ text, progress, config, level: important ? 3 : 4 });

module.exports.info = info;
