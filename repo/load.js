const { existsSync, lstatSync } = require("fs");
const { home } = require("../utils/home");
const { getOSInfo } = require("../os");
const { getFileNamesForOS } = require("./meta");
const { join } = require("path");
const { importModule } = require("./import");

const isDirectory = (name) => existsSync(name) && lstatSync(name).isDirectory();

const loadPlatformSpecific = async (command, type) => {
  const osInfo = await getOSInfo();
  const names = getFileNamesForOS(osInfo);
  for (const name of names) {
    const filePath = home(".please", "repo", "commands", command, type, name);
    if (existsSync(filePath)) {
      return await importModule({
        type: "file",
        main: filePath,
      });
    }
    const modulePath = filePath.replace(/\.js/, "");
    const isModule = isDirectory(modulePath);
    if (isModule) {
      const indexFile = join(modulePath, "index.js");
      return await importModule({
        main: indexFile,
        location: modulePath,
        type: "module",
      });
    }
  }
};

const load = async (command, type) => {
  return await loadPlatformSpecific(command, type);
};

module.exports.load = load;
