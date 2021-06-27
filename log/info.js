const { message } = require("./common");

const info = ({ text, config, level = 3, progress = false }) =>
  message({ text, progress, config, level });

module.exports.info = info;
