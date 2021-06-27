const { bootstrap, load } = require("../repo");
const { which } = require("../utils/which");
const { spawnSync } = require("child_process");
const { progress, error } = require("../log");
const { installCNF } = require("../utils/cnf");
const { readConfig, postprocess } = require("../config");

const script = async (_, loaded) => {
  return loaded.run;
};

const install = async (command, loaded, config) => {
  const spin = progress({ text: `Installing "${command}"`, config });
  for (const { command, args } of loaded.install) {
    if (typeof command === "function") {
      command(args, config);
    } else {
      entry(command, args, config);
    }
  }
  spin?.stop();
};

const build = async (command, loaded, config) => {
  const spin = progress({ text: `Building "${command}"`, config });
  for (const { command, args } of loaded.build) {
    if (typeof command === "function") {
      command(args, config);
    } else {
      entry(command, args, config);
    }
  }
  spin?.stop();
};

const prebuilt = async (command, loaded, config) => {
  const spin = progress({ text: `Fetching "${command}"`, config });
  for (const { command, args } of loaded.prebuilt) {
    if (typeof command === "function") {
      command(args, config);
    } else {
      entry(command, args, config);
    }
  }
  spin?.stop();
};

const getCommand = async (command, config) => {
  for (const type of config.preferred) {
    const loaded = await load(command, type, config);
    if (loaded) {
      if (type === "script") {
        return await script(command, loaded, config);
      } else if (type === "build") {
        return await build(command, loaded, config);
      } else if (type === "install") {
        return await install(command, loaded, config);
      } else if (type === "prebuilt") {
        return await prebuilt(command, loaded, config);
      }
    }
  }
  if (config.useCNF) {
    try {
      await installCNF(command, config);
    } catch (err) {
      error({ text: `Couldn't find a way to install ${command}`, config });
    }
  } else {
    error({ text: `Couldn't find a way to install ${command}`, config });
  }
};

const run = (command, argv, config) => {
  const stdio = config.silentRun ? "ignore" : "inherit";
  spawnSync(command, argv, { shell: true, stdio });
};

const entry = async (command, argv, config) => {
  const exists = which(command);
  if (!exists) {
    const run = await getCommand(command, config);
    if (run) {
      return run(argv, config);
    }
  }
  return run(command, argv, config);
};

const core = async ({ argv, cargv }) => {
  const { command, ...cliconfig } = argv;
  const userConfig = await readConfig();
  const config = postprocess({ ...userConfig, ...cliconfig });
  await bootstrap(config);
  await entry(command, cargv, config);
};

module.exports.core = core;
