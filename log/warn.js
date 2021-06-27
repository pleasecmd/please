const { message } = require("./common");
const chalk = require("chalk");

const warn = ({ text, config }) => {
  message({ text: chalk.yellow(text), level: 2, config });
  process.exit(1);
};

module.exports.warn = warn;
