const { sudo } = require("../utils/sudo");
const { spawnSync } = require("child_process");

const installCommandWindows = (commands, config) => {
  const command = commands["windows"] || commands["win32"];
  if (!command) {
    return null;
  }
  const stdio = config.log > 2 ? "inherit" : "ignore";
  spawnSync(sudo(command), { stdio });
};

module.exports.installCommandWindows = installCommandWindows;
