const { sudo } = require("../utils/sudo");
const { execSync } = require("child_process");
const { warn } = require("../log");

const installCommandGeneric = (commands, os, variant, config) => {
  const command = commands[variant?.toLowerCase()] || commands[os];
  if (!command) {
    return false;
  }
  if (!config.allowUnsafe) {
    const text = `Unsafe install command "${command}" is skipped, to allow install re-run the command with --allow-unsafe flag.`;
    warn({ text, config });
    return false;
  }
  const stdio = config.log > 2 ? "inherit" : "ignore";
  execSync(sudo(command), { stdio });
  return true;
};

module.exports.installCommandGeneric = installCommandGeneric;
