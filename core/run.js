const { spawn } = require("../utils/spawn");
const { getCommand } = require("./get");
const { info } = require("../log");
const which = require("which");
const chalk = require("chalk");

const run = async (command, argv, config) => {
  const exists = which.sync(command, { nothrow: true });
  if (!exists) {
    info({
      text: chalk.yellow(
        `Command "${command}" not found, looking for a way to install it.`
      ),
      important: false,
      config,
    });
    const cb = await getCommand(command, config);
    if (cb) {
      return cb(argv, config);
    }
  }
  return spawn(command, argv, config);
};

module.exports.run = run;
