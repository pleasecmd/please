const { fork } = require("child_process");
const { existsSync } = require("fs");
const { resolve, join } = require("path");

const npm = resolve(require.resolve("npm"), "..", "..", "bin", "npm-cli.js");

const install = async (dir) => {
  const pkgJson = join(dir, "package.json");
  if (existsSync(pkgJson)) {
    const child = fork(npm, ["install"], { cwd: dir, silent: true });
    await new Promise((resolve) => child.on("exit", resolve));
  }
};

module.exports.install = install;
