const { message } = require("./common");
const chalk = require("chalk");

const error = ({ text, config, exit = true }) => {
  message({ text: chalk.red(text), config, level: 1 });
  if (exit) process.exit(1);
};

module.exports.error = error;
