const { bootstrap, load } = require("../repo");
const { which } = require("../utils/which");
const { spawnSync } = require("child_process");
const { info, error } = require("../log");
const { cnf } = require("../utils/cnf");
const { getOSInfo } = require("../utils/os");

const getInstallCommand = (commands, { os, dist }) => {
  if (os === "macos") {
    return commands["osx"] || commands["darwin"];
  }
  if (os === "windows") {
    return commands["windows"] || commands["win32"];
  }
  return commands[dist?.toLowerCase()] || commands[os];
};

const installCNF = async (command) => {
  const installCommands = await cnf(command);
  const os = await getOSInfo();
  const installCommand = getInstallCommand(installCommands, os);
  if (!installCommand) {
    throw new Error("Couldn't find command on CNF");
  }
  spawnSync(installCommand, { stdio: "inherit", shell: true });
};

const install = async (command) => {
  const loaded = await load(command);
  if (loaded) {
    const progress = info(`Installing "${command}"`, true);
    if (loaded.install) {
      await loaded.install();
    }
    progress.stop();
    return loaded.run;
  }
  try {
    await installCNF(command);
  } catch (err) {
    error(`Couldn't find a way to install ${command}`);
  }
};

const run = (command, argv) =>
  spawnSync(command, argv, {
    shell: true,
    stdio: "inherit",
  });

const entry = async (command, argv) => {
  const exists = which(command);
  if (!exists) {
    const run = await install(command);
    if (run) {
      return run(argv);
    }
  }
  return run(command, argv);
};

const core = async ({ argv, cargv }) => {
  await bootstrap();
  await entry(argv.command, cargv);
};

module.exports.core = core;
