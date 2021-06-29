const { fork } = require("child_process");
const { existsSync } = require("fs");
const { join } = require("path");

const install = async (dir) => {
  const pkgJson = join(dir, "package.json");
  if (existsSync(pkgJson)) {
    const child = fork(require.resolve("../utils/npm.js"), ["install"], {
      cwd: dir,
      silent: true,
    });
    await new Promise((resolve) => child.on("close", resolve));
  }
};

module.exports.install = install;
