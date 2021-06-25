const { existsSync } = require("fs");
const { home } = require("./common");
const getos = require("getos");
const { runAsync } = require("../utils/wrap-async");

const loadPlatformSpecific = async (command) => {
  const { os, dist } = await runAsync(getos);
  const distPath = home("repo", "commands", `${command}.${dist}.js`);
  if (existsSync(distPath)) {
    return require(distPath);
  }
  const osPath = home("repo", "commands", `${command}.${os}.js`);
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
