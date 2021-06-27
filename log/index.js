const { message } = require("./common");
const { info } = require("./info");
const { progress } = require("./progress");
const { warn } = require("./warn");
const { error } = require("./error");
const { getLogLevel } = require("./level");

module.exports.message = message;
module.exports.info = info;
module.exports.progress = progress;
module.exports.warn = warn;
module.exports.error = error;
module.exports.getLogLevel = getLogLevel;
