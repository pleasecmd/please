const { message } = require("./common");
const chalk = require("chalk");

const warn = (text) => {
  message({ text: chalk.yellow(text) });
  process.exit(1);
};

module.exports.warn = warn;
