const { spawnSync } = require("child_process");

const spawn = (command, argv, config) => {
  const stdio = config.silentRun ? "ignore" : "inherit";
  spawnSync(command, argv, { shell: true, stdio });
};

module.exports.spawn = spawn;
