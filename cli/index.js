const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { preprocess } = require("./preprocess");
const { postprocess } = require("./postprocess");
const { core } = require("../core");

const { cargv, argv } = preprocess(hideBin(process.argv));

const main = {
  command: "$0 <command>",
  describe: "command to run",
  builder: {
    "no-update": {
      describe: "Disable repo updates",
      type: "boolean",
      alias: "U",
    },
    log: {
      describe: "Log level verbosity",
      type: "number",
      alias: "l",
    },
    silent: {
      describe: "Mute all messages",
      type: "boolean",
      alias: "S",
    },
    verbose: {
      describe: "Log all messages",
      type: "boolean",
      alias: "V",
    },
    "silent-run": {
      describe: "Run command silently",
      type: "boolean",
      alias: "s",
    },
    "silent-install": {
      describe: "Silence all install logs",
      type: "boolean",
      alias: "I",
    },
  },
  handler(args) {
    const argv = postprocess(args);
    core({ argv, cargv });
  },
};

module.exports.cli = () =>
  yargs(argv).command(main).help().completion(/* TODO */).argv;
