const { managers } = require("../os");

const installCommandMacOS = (commands, config) => {
  const command = commands["osx"] || commands["darwin"];
  if (!command) {
    return false;
  }
  const name = command.match(/brew install (.*)/)?.[1];
  if (!name) {
    console.log({ name });
    return false;
  }
  managers.macos.install([name], [], config);
  return true;
};

module.exports.installCommandMacOS = installCommandMacOS;
