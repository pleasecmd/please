const { sudo } = require("../utils/sudo");
const { execSync } = require("child_process");

const installCommandWindows = (commands, config) => {
  const command = commands["windows"] || commands["win32"];
  if (!command) {
    return false;
  }
  const stdio = config.log > 2 ? "inherit" : "ignore";
  execSync(sudo(command), { stdio });
  return true;
};

module.exports.installCommandWindows = installCommandWindows;
