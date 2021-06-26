const { existsSync } = require("fs");
const { home } = require("../utils/home");
const { getOSInfo } = require("../utils/os");
const { getFileNamesForOS } = require("./meta");

const loadPlatformSpecific = async (command, type) => {
  const osInfo = await getOSInfo();
  const names = getFileNamesForOS(osInfo);
  for (const name of names) {
    const filePath = home(".please", "repo", "commands", command, type, name);
    if (existsSync(filePath)) {
      return require(filePath);
    }
  }
};

const load = async (command, type) => {
  return await loadPlatformSpecific(command, type);
};

module.exports.load = load;
