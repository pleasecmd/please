const { getOSInfo } = require("../os");
const { fetchCommand } = require("./fetch");
const { installCommandMacOS } = require("./macos");
const { installCommandLinux } = require("./linux");
const { installCommandWindows } = require("./windows");
const { installCommandGeneric } = require("./generic");

const installCommand = (commands, { os, variant }, config) => {
  if (os === "macos") {
    return installCommandMacOS(commands, config);
  }
  if (os === "windows") {
    return installCommandWindows(commands, config);
  }
  if (os === "linux") {
    return installCommandLinux(commands, variant, config);
  }
  return installCommandGeneric(commands, os, variant, config);
};

const installCNF = async (command, config) => {
  const installCommands = await fetchCommand(command);
  const osInfo = await getOSInfo();
  const installed = installCommand(installCommands, osInfo, config);
  if (!installed) {
    throw new Error("Couldn't find the command on CNF");
  }
};

module.exports.installCNF = installCNF;
