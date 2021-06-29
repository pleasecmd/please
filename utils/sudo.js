const which = require("which");

const sudo = (command) => {
  const shouldSudo =
    process.getuid() !== 0 && which.sync("sudo", { nothrow: true });
  if (shouldSudo) {
    return `sudo ${command}`;
  }
  return command;
};

module.exports.sudo = sudo;
