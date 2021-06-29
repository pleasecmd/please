const { install } = require("./deps");

const importModule = async (item) => {
  if (item.type === "module") {
    await install(item.location);
  }
  return require(item.main);
};

module.exports.importModule = importModule;
