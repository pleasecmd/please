const { execSync } = require("child_process");
const { sudo } = require("../../../utils/sudo");

const install = (names, argv, config) => {
  const stdio = config.log > 2 ? "inherit" : "ignore";
  const command = ["apt-get", "install", "-y", ...names, ...argv].join(" ");
  return execSync(sudo(command), { stdio });
};

module.exports.install = install;
