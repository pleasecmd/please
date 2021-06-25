const preprocess = (argv) => {
  const sliceAt = argv.findIndex((arg) => !arg.startsWith("-")) + 1;
  if (!sliceAt) return { argv, cargv: [] };
  return { argv: argv.slice(0, sliceAt), cargv: argv.slice(sliceAt) };
};

module.exports.preprocess = preprocess;
