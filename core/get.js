const { load } = require("../repo");
const { progress, error, verbose } = require("../log");
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
        verbose({
          text: `Found a JavaScript implementation of "${command}"`,
          config,
        });
        return await script(command, loaded, config);
      } else if (type === "build") {
        verbose({ text: `Found build instructions for "${command}"`, config });
        return await build(command, loaded, config);
      } else if (type === "install") {
        verbose({
          text: `Found install instructions for "${command}"`,
          config,
        });
        return await install(command, loaded, config);
      } else if (type === "prebuilt") {
        verbose({
          text: `Found prebuilt fetch and uncompress instructions for "${command}"`,
          config,
        });
        return await prebuilt(command, loaded, config);
      }
    }
  }
  verbose({
    text: `Couldn't find anything on the please repository for "${command}".`,
    config,
  });
  if (config.useCNF) {
    try {
      verbose({ text: `Falling back to CNF for "${command}"`, config });
      await installCNF(command, config);
    } catch (err) {
      error({ text: `Couldn't find a way to install "${command}"`, config });
    }
  } else {
    error({ text: `Couldn't find a way to install "${command}"`, config });
  }
};

module.exports.getCommand = getCommand;
