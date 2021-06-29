const { bootstrap } = require("../repo");
const { readConfig, postprocess } = require("../config");
const { run } = require("./run");

const core = async ({ argv, cargv }) => {
  const { command, ...cliConfig } = argv;
  const userConfig = await readConfig();
  const config = postprocess({ ...userConfig, ...cliConfig });
  await bootstrap(config);
  await run(command, cargv, config);
};

module.exports.core = core;
