const { execSync } = require("child_process");
const { sudo } = require("../../../utils/sudo");

const uninstall = (names, argv, config) => {
  const stdio = config.log > 2 ? "inherit" : "ignore";
  const command = ["apt-get", "remove", ...names, ...argv].join(" ");
  execSync(sudo(command), { stdio });
};

module.exports.uninstall = uninstall;
