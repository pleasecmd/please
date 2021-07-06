/* 
  Let the log levels be:
    0. Nothing at all
    1. Error messages
    2. Errors and warnings
    3. Errors, warnings and important information
    4. Everything, even non-important messages
*/
const getLogLevel = (options) => {
  if (options.verbose) return 4;
  if (options.silent) return 1;
  if ("log" in options) return options.log;
  return 3;
};

module.exports.getLogLevel = getLogLevel;
