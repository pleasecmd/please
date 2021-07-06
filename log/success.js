const chalk = require("chalk");
const { info } = require("./info");

const success = ({ text, config, important = true, progress = false }) =>
  info({
    text: chalk.green(text),
    progress,
    config,
    important,
  });

module.exports.success = success;
