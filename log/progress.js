const { info } = require("./info");

const progress = ({ text, config, level = 3 }) =>
  info({ text, progress: true, config, level });

module.exports.progress = progress;
