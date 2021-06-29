const { managers } = require("../os");
const { sudo } = require("../utils/sudo");
const { spawnSync } = require("child_process");

const installCommandLinux = (commands, variant, config) => {
  const command = commands[variant] || commands.linux;
  if (!command) {
    return null;
  }
  if (variant === "ubuntu") {
    const name = command.match(/apt-get install (.*)/)?.[1];
    if (!name) {
      return null;
    }
    managers.ubuntu.repo.update([], config);
    return managers.ubuntu.install([name], [], config);
  }
  if (variant === "debian") {
    const name = command.match(/apt-get install (.*)/)?.[1];
    if (!name) {
      return null;
    }
    managers.debian.repo.update([], config);
    return managers.debian.install([name], [], config);
  }
  if (variant === "raspbian") {
    const name = command.match(/apt-get install (.*)/)?.[1];
    if (!name) {
      return null;
    }
    managers.raspbian.repo.update([], config);
    return managers.raspbian.install([name], [], config);
  }
  if (variant === "arch") {
    const name = command.match(/pacman -S (.*)/)?.[1];
    if (!name) {
      return null;
    }
    managers.arch.repo.update([], config);
    return managers.arch.install([name], [], config);
  }
  if (variant === "alpine") {
    const name = command.match(/apk add (.*)/)?.[1];
    if (!name) {
      return null;
    }
    managers.alpine.repo.update([], config);
    return managers.alpine.install([name], [], config);
  }
  const stdio = config.log > 2 ? "inherit" : "ignore";
  spawnSync(sudo(command), { stdio });
};

module.exports.installCommandLinux = installCommandLinux;
