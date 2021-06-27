const ora = require("ora");

const message = ({ text, progress, color, config, level }) => {
  if (level > config.log) return;
  if (progress) {
    return ora({ text, color }).start();
  }
  console.log(text);
};

module.exports.message = message;
