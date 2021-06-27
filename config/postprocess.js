const { getLogLevel } = require("../log");

const postprocess = (config) => {
  const processed = {};
  processed.silent = !!config.silent;
  processed.silentRun = processed.silent || !!config.silentRun;
  processed.silentInstall = processed.silent || !!config.silentInstall;
  processed.verbose = !!config.verbose;
  processed.update = !!config.update;
  processed.preferred = config.preferred;
  processed.useCNF = !!config.useCNF;
  processed.log = getLogLevel(config);
  return processed;
};

module.exports.postprocess = postprocess;
