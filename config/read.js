const { home } = require("../utils/home");
const { existsSync } = require("fs");
const { getOSInfo } = require("../utils/os");
const { getFileNamesForOS } = require("../repo/meta");

const readPleaseConfig = () => {
  const pleaseConfigPath = home(".please", "config.json");
  if (existsSync(pleaseConfigPath)) return require(pleaseConfigPath);
};

const readHomeConfig = () => {
  const homeConfigPath = home(".please.config.json");
  if (existsSync(homeConfigPath)) return require(homeConfigPath);
};

const readDefaultConfig = async () => {
  const osInfo = await getOSInfo();
  const configNames = getFileNamesForOS(osInfo);
  for (const configName of configNames) {
    const configPath = home(".please", "repo", "configs", configName);
    if (existsSync(configPath)) return require(configPath);
  }
  return {
    preferred: ["install", "prebuilt", "script", "build", "cnf"],
    installWith: ["default"],
  };
};

const readConfig = async () => {
  const userConfig = readPleaseConfig() || readHomeConfig();
  if (userConfig) return userConfig;
  return await readDefaultConfig();
};

module.exports.readConfig = readConfig;
