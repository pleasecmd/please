const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { preprocess } = require("./preprocess");
const { core } = require("../core");

const { cargv, argv } = preprocess(hideBin(process.argv));

const main = {
  command: "$0 <command>",
  describe: "command to run",
  builder: {
    log: {
      describe: "Log level verbosity",
      type: "number",
      alias: "l",
    },
    silent: {
      describe: "Equivalent to --log 0",
      type: "boolean",
    },
  },
  handler(argv) {
    core({ argv, cargv });
  },
};

module.exports.cli = () =>
  yargs(argv).command(main).help().completion(/* TODO */).argv;
