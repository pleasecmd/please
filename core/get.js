const { load } = require("../repo");
const { progress, error, info } = require("../log");
const { installCNF } = require("../cnf");
const chalk = require("chalk");

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
        info({
          text: chalk.yellow(`Found a JavaScript version of "${command}"`),
          important: false,
          config,
        });
        return await script(command, loaded, config);
      } else if (type === "build") {
        info({
          text: chalk.yellow(`Found build instructions for "${command}"`),
          important: false,
          config,
        });
        return await build(command, loaded, config);
      } else if (type === "install") {
        info({
          text: chalk.yellow(`Found install instructions for "${command}"`),
          important: false,
          config,
        });
        return await install(command, loaded, config);
      } else if (type === "prebuilt") {
        info({
          text: chalk.yellow(
            `Found prebuilt fetch and uncompress instructions for "${command}"`
          ),
          important: false,
          config,
        });
        return await prebuilt(command, loaded, config);
      }
    }
  }
  info({
    text: chalk.yellow(
      `Couldn't find anything on the please repository for "${command}".`
    ),
    important: false,
    config,
  });
  if (config.useCNF) {
    try {
      info({
        text: chalk.yellow(`Falling back to CNF for "${command}"`),
        important: false,
        config,
      });
      await installCNF(command, config);
    } catch (err) {
      error({ text: `Couldn't find a way to install "${command}"`, config });
    }
  } else {
    error({ text: `Couldn't find a way to install "${command}"`, config });
  }
};

module.exports.getCommand = getCommand;
