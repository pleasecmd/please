const { rmSync, readdirSync } = require("fs");

readdirSync("./dist").forEach((file) => {
  const filePath = `./dist/${file}`;
  rmSync(filePath);
});
