const postprocess = (args) => {
  const processed = {};
  processed.silent = !!args.silent;
  processed.silentRun = processed.silent || !!args["silent-run"];
  processed.silentInstall = processed.silent || !!args["silent-install"];
  processed.verbose = !!args.verbose;
  processed.update = !args["no-update"];
  if (processed.silent) processed.log = 0;
  if (!Number.isNaN(parseInt(args.log))) processed.log = args.log;
  processed.command = args.command;
  return processed;
};

module.exports.postprocess = postprocess;
