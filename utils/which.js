const { execSync } = require("child_process");

const tryExec = (command) => {
  try {
    return execSync(command).toString();
  } catch (error) {
    return "";
  }
};

const whichWin32 = (command) => tryExec(`whereis ${command}`);
const whichUnix = (command) => tryExec(`which ${command}`);

const which = (command) => {
  if (process.platform == "win32") return whichWin32(command);
  return whichUnix(command);
};

module.exports.which = which;
