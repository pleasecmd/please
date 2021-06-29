const { spawn } = require("../utils/spawn");
const { getCommand } = require("./get");
const which = require("which");

const run = async (command, argv, config) => {
  const exists = which.sync(command, { nothrow: true });
  if (!exists) {
    const cb = await getCommand(command, config);
    if (cb) {
      return cb(argv, config);
    }
  }
  return spawn(command, argv, config);
};

module.exports.run = run;
