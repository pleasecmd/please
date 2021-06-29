const { managers } = require("../os");

const installCommandMacOS = (commands, config) => {
  const command = commands["osx"] || commands["darwin"];
  if (!command) {
    return null;
  }
  const name = command.match(/brew install (.*)/)?.[1];
  if (!name) {
    return null;
  }
  return managers.macos.install([name], [], config);
};

module.exports.installCommandMacOS = installCommandMacOS;
