const ora = require("ora");

const message = ({ text, progress, color, level }) => {
  return progress ? ora({ text, color }).start() : console.log(text);
};

module.exports.message = message;
