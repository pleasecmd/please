const { getOSInfo } = require("./os");
const { which } = require("./which");
const { spawnSync } = require("child_process");
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

const sudo = (command) => {
  const shouldSudo = process.getuid() !== 0 && which("sudo");
  if (shouldSudo) {
    return `sudo ${command}`;
  }
  return command;
};

const patchInstallCommand = (command) => {
  if (command.startsWith("apt install")) {
    const stripped = strip(command, "apt install ");
    const update = sudo("apt update");
    const install = sudo(`apt install -y ${stripped}`);
    return `${update} && ${install}`;
  }
  if (command.startsWith("apt-get install")) {
    const stripped = strip(command, "apt-get install ");
    const update = sudo("apt-get update");
    const install = sudo(`apt-get install -y ${stripped}`);
    return `${update} && ${install}`;
  }
  if (command.startsWith("pacman -S")) {
    const stripped = strip(command, "pacman -S ");
    return sudo(`pacman --noconfirm -S ${stripped}`);
  }
  return sudo(`${command}`);
};

const getCNFInstallCommand = (commands, { os, variant }) => {
  if (os === "macos") {
    return commands["osx"] || commands["darwin"];
  }
  if (os === "windows") {
    return commands["windows"] || commands["win32"];
  }
  if (os === "linux") {
    const installCommand = commands[variant?.toLowerCase()] || commands[os];
    return patchInstallCommand(installCommand);
  }
  return commands[variant?.toLowerCase()] || commands[os];
};

const installCNF = async (command) => {
  const installCommands = await cnf(command);
  const osInfo = await getOSInfo();
  const installCommand = getCNFInstallCommand(installCommands, osInfo);
  if (!installCommand) {
    throw new Error("Couldn't find command on CNF");
  }
  spawnSync(installCommand, { stdio: "inherit", shell: true });
};

module.exports.cnf = cnf;
module.exports.patchInstallCommand = patchInstallCommand;
module.exports.installCNF = installCNF;
