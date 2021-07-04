const { managers } = require("../os");
const { sudo } = require("../utils/sudo");
const { execSync } = require("child_process");
const { warn } = require("../log");

const installCommandLinux = (commands, variant, config) => {
  const command = commands[variant] || commands.linux;
  if (!command) {
    return false;
  }
  if (variant === "ubuntu") {
    const name = command.match(/apt-get install ([a-zA-Z0-9._]+)\s*$/)?.[1];
    if (!name) {
      return false;
    }
    managers.ubuntu.repo.update([], config);
    managers.ubuntu.install([name], [], config);
    return true;
  }
  if (variant === "debian") {
    const name = command.match(/apt-get install ([a-zA-Z0-9._]+)\s*$/)?.[1];
    if (!name) {
      return false;
    }
    managers.debian.repo.update([], config);
    managers.debian.install([name], [], config);
    return true;
  }
  if (variant === "raspbian") {
    const name = command.match(/apt-get install ([a-zA-Z0-9._]+)\s*$/)?.[1];
    if (!name) {
      return false;
    }
    managers.raspbian.repo.update([], config);
    managers.raspbian.install([name], [], config);
    return true;
  }
  if (variant === "arch") {
    const name = command.match(/pacman -S ([a-zA-Z0-9._]+)\s*$/)?.[1];
    if (!name) {
      return false;
    }
    managers.arch.repo.update([], config);
    managers.arch.install([name], [], config);
    return true;
  }
  if (variant === "alpine") {
    const name = command.match(/apk add ([a-zA-Z0-9._]+)\s*$/)?.[1];
    if (!name) {
      return false;
    }
    managers.alpine.repo.update([], config);
    managers.alpine.install([name], [], config);
    return true;
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

module.exports.installCommandLinux = installCommandLinux;
