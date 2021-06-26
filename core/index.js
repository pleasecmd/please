const { bootstrap, load } = require("../repo");
const { which } = require("../utils/which");
const { spawnSync } = require("child_process");
const { info, error } = require("../log");
const { installCNF } = require("../utils/cnf");
const { readConfig } = require("../config");

const script = async (_, loaded) => {
  return loaded.run;
};

const install = async (command, loaded) => {
  const progress = info(`Installing "${command}"`, true);
  for (const { command, args } of loaded.install) {
    if (typeof command === "function") {
      command(...args);
    } else {
      entry(command, args);
    }
  }
  progress.stop();
};

const build = async (command, loaded) => {
  const progress = info(`Building "${command}"`, true);
  for (const { command, args } of loaded.build) {
    if (typeof command === "function") {
      command(...args);
    } else {
      entry(command, args);
    }
  }
  progress.stop();
};

const prebuilt = async (command, loaded) => {
  const progress = info(`Fetching "${command}"`, true);
  for (const { command, args } of loaded.prebuilt) {
    if (typeof command === "function") {
      command(...args);
    } else {
      entry(command, args);
    }
  }
  progress.stop();
};

const getCommand = async (command) => {
  const config = await readConfig();
  for (const type of config.preferred) {
    const loaded = await load(command, type);
    if (loaded) {
      if (type === "script") {
        return await script(command, loaded);
      } else if (type === "build") {
        return await build(command, loaded);
      } else if (type === "install") {
        return await install(command, loaded);
      } else if (type === "prebuilt") {
        return await prebuilt(command, loaded);
      }
    }
  }
  if (config.useCNF) {
    try {
      await installCNF(command);
    } catch (err) {
      error(`Couldn't find a way to install ${command}`);
    }
  } else {
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
    const run = await getCommand(command);
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
