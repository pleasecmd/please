const { message } = require("./common");
const chalk = require("chalk");

const error = (text, exit = true) => {
  message({ text: chalk.red(text) });
  if (exit) process.exit(1);
};

module.exports.error = error;
