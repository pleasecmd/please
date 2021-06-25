const { existsSync } = require("fs");
const { home } = require("./common");

const load = (command) => {
  const path = home("repo", "commands", `${command}.js`);
  return existsSync(path) ? require("path") : null;
};

module.exports.load = load;
