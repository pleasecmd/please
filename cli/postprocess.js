const removeUndefined = (args) => {
  const entries = Object.entries(args);
  const filtered = entries.filter(([_, value]) => typeof value !== "undefined");
  return Object.fromEntries(filtered);
};

const postprocess = (args) => {
  const processed = {};
  processed.silent = args.silent;
  processed.silentRun = processed.silent || args["silent-run"];
  processed.silentInstall = processed.silent || args["silent-install"];
  processed.verbose = args.verbose;
  processed.update = !args["no-update"];
  if (processed.silent) processed.log = 0;
  processed.log = args.log;
  processed.command = args.command;
  return removeUndefined(processed);
};

module.exports.postprocess = postprocess;
