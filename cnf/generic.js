const { sudo } = require("../utils/sudo");
const { execSync } = require("child_process");

const installCommandGeneric = (commands, os, variant, config) => {
  const command = commands[variant?.toLowerCase()] || commands[os];
  if (!command) {
    return false;
  }
  const stdio = config.log > 2 ? "inherit" : "ignore";
  execSync(sudo(command), { stdio });
  return true;
};

module.exports.installCommandGeneric = installCommandGeneric;
