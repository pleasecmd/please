const npm = async (process) => {
  process.title = "npm";

  const npm = require("npm");

  if (process.argv[1][process.argv[1].length - 1] === "g")
    process.argv.splice(1, 1, "npm", "-g");

  try {
    await npm.load();

    if (npm.config.get("version", "cli")) {
      npm.output(npm.version);
      return;
    }

    if (npm.config.get("versions", "cli")) {
      npm.argv = ["version"];
      npm.config.set("usage", false, "cli");
    }

    const cmd = npm.argv.shift();
    if (!cmd) {
      npm.output(npm.usage);
      return process.exit(1);
    }

    const impl = npm.commands[cmd];

    if (!impl) {
      return process.exit(1);
    }

    impl(npm.argv);
  } catch (err) {
    return process.exit(1);
  }
};

module.exports.npm = npm;

npm(process);
