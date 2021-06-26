const { join } = require("path");
const { homedir } = require("os");

const home = (...names) => join(homedir(), ...names);
module.exports.home = home;
