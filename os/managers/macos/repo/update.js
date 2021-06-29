const { spawnSync } = require("child_process");
const { sudo } = require("../../../../utils/sudo");

const update = (argv, config) => {
  const stdio = config.log > 2 ? "inherit" : "ignore";
  const command = ["brew", "update", ...argv].join(" ");
  spawnSync(sudo(command), { stdio });
};

module.exports.update = update;
