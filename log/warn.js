const { message } = require("./common");
const chalk = require("chalk");

const warn = ({ text, config }) => {
  message({ text: chalk.yellow(text), level: 2, config });
};

module.exports.warn = warn;
