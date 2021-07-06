const { spawn } = require("../utils/spawn");
const { getCommand } = require("./get");
const { verbose } = require("../log");
const which = require("which");

const run = async (command, argv, config) => {
  const exists = which.sync(command, { nothrow: true });
  if (!exists) {
    verbose({
      text: `Command "${command}" not found, looking for a way to install it.`,
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
