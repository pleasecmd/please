const { spawnSync } = require("child_process");
const { sudo } = require("../../../utils/sudo");

const install = (names, argv, config) => {
  const stdio = config.log > 2 ? "inherit" : "ignore";
  const command = ["apk", "add", ...names, ...argv].join(" ");
  return spawnSync(sudo(command), { stdio });
};

module.exports.install = install;
