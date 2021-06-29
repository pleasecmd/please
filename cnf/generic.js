const { sudo } = require("../utils/sudo");
const { spawnSync } = require("child_process");

const installCommandGeneric = (commands, os, variant, config) => {
  const command = commands[variant?.toLowerCase()] || commands[os];
  if (!command) {
    return null;
  }
  const stdio = config.log > 2 ? "inherit" : "ignore";
  spawnSync(sudo(command), { stdio });
};

module.exports.installCommandGeneric = installCommandGeneric;
