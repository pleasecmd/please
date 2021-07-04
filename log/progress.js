const { info } = require("./info");

const progress = ({ text, config, important = true }) =>
  info({ text, config, important, progress: true });

module.exports.progress = progress;
