const chalk = require("chalk");
const { info } = require("./info");

const verbose = ({ text, config, progress = false }) =>
  info({
    text: chalk.grey(text),
    progress,
    config,
    important: false,
  });

module.exports.verbose = verbose;
