const { execSync } = require("child_process");

const install = (names, argv, config) => {
  const stdio = config.log > 2 ? "inherit" : "ignore";
  const command = ["brew", "install", ...names, ...argv].join(" ");
  return execSync(command, { stdio });
};

module.exports.install = install;
