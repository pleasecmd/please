const { load } = require("../repo");
const { progress, error } = require("../log");
const { installCNF } = require("../cnf");

const script = async (_, loaded) => loaded.run;

const install = async (command, loaded, config) => {
  const spin = progress({ text: `Installing "${command}"`, config });
  await loaded.install(config);
  spin?.stop();
};

const build = async (command, loaded, config) => {
  const spin = progress({ text: `Building "${command}"`, config });
  await loaded.build(config);
  spin?.stop();
};

const prebuilt = async (command, loaded, config) => {
  const spin = progress({ text: `Fetching "${command}"`, config });
  await loaded.prebuilt(config);
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

module.exports.getCommand = getCommand;
