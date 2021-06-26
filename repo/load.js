const { existsSync } = require("fs");
const { home } = require("../utils/home");
const { getOSInfo } = require("../utils/os");

const loadPlatformSpecific = async (command) => {
  const osInfo = await getOSInfo();
  const distPath = home("repo", "commands", `${command}.${osInfo.dist}.js`);
  if (existsSync(distPath)) {
    return require(distPath);
  }
  const osPath = home("repo", "commands", `${command}.${osInfo.os}.js`);
  if (existsSync(osPath)) {
    return require(osPath);
  }
};

const loadGeneric = (command) => {
  const path = home("repo", "commands", `${command}.js`);
  return existsSync(path) ? require("path") : null;
};

const load = async (command) => {
  const platformSpecific = await loadPlatformSpecific(command);
  return platformSpecific || loadGeneric(command);
};

module.exports.load = load;
