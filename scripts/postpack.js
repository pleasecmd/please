const { renameSync, readdirSync } = require("fs");

const { version } = require("../package.json");

readdirSync("./dist").forEach((file) => {
  const oldName = `./dist/${file}`;
  const newName = "./dist/" + "please-" + version + file.slice(3);
  renameSync(oldName, newName);
});
