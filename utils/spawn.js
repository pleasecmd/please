const { spawnSync } = require("child_process");

const spawn = (command, argv, config) => {
  const stdio = config.silentRun ? "ignore" : "inherit";
  return spawnSync(command, argv, { shell: true, stdio });
};

module.exports.spawn = spawn;
