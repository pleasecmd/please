const ora = require("ora");

const message = ({ text, progress, color }) => {
  if (progress) {
    return ora({ text, color }).start();
  }
  console.log(text);
};

module.exports.message = message;
