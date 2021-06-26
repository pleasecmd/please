const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

const getOS = (el) => {
  if (el.dataset.os) {
    return el.dataset.os.toLowerCase().replace(/\s/g, "");
  }
  for (const c of el.classList) {
    if (c.startsWith("install-")) {
      return c.slice(8);
    }
    if (c.startsWith("intall-")) {
      return c.slice(7);
    }
  }
  return el.querySelector("dt").textContent;
};

const getCMD = (el) => el.querySelector("code").textContent.trim();

const cnf = async (command) => {
  const url = `https://command-not-found.com/${command}`;
  const resp = await fetch(url);
  const body = await resp.text();
  const document = new JSDOM(body).window.document;
  const els = document.querySelectorAll(".command-install:not(.d-none)");
  const entries = [...els].map((el) => [getOS(el), getCMD(el)]);
  return Object.fromEntries(entries);
};

const strip = (command, toStrip) => command.slice(toStrip.length);

const patchInstallCommand = (command) => {
  const needsSudo = process.getuid() !== 0;
  const sudoPrefix = needsSudo ? `sudo ` : ``;
  if (command.startsWith("apt install")) {
    const stripped = strip(command, "apt install ");
    return `${sudoPrefix}apt install -y ${stripped}`;
  }
  if (command.startsWith("apt-get install")) {
    const stripped = strip(command, "apt-get install ");
    return `${sudoPrefix}apt-get install -y ${stripped}`;
  }
  if (command.startsWith("pacman -S")) {
    const stripped = strip(command, "pacman -S ");
    return `${sudoPrefix}pacman --noconfirm -S ${stripped}`;
  }
  return `${sudoPrefix}${command}`;
};

module.exports.cnf = cnf;
module.exports.patchInstallCommand = patchInstallCommand;
