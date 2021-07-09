const { execSync } = require("child_process");
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { renameSync } = require("fs");
const { rmSync } = require("fs");
const { warn, progress, verbose } = require("../log");
const { home } = require("../utils/home");
const fetch = require("node-fetch");
const decompress = require("decompress");
const which = require("which");
const { install } = require("./deps");

const checkGit = (config) => {
  const hasGit = which.sync("git", { nothrow: true });
  if (!hasGit) {
    warn({ text: "Git not found, install git to speed things up.", config });
    return false;
  } else {
    return true;
  }
};

const repoAddr = "https://github.com/pleasecmd/repo";

const createRepoGit = (config) => {
  const spin = progress({ text: "Cloning the please repository", config });
  execSync(`git clone ${repoAddr}`, {
    cwd: home(".please"),
    stdio: "ignore",
  });
  spin?.stop();
};

const createRepoZip = async (config) => {
  const spin = progress({ text: "Downloading the please repository", config });
  const zipAddr = `${repoAddr}/archive/refs/heads/master.zip`;
  const resp = await fetch(zipAddr);
  const buffer = await resp.buffer();
  writeFileSync(home(".please", "repo.zip"), buffer);
  await decompress(home(".please", "repo.zip"), home(".please"));
  renameSync(home(".please", "repo-master"), home(".please", "repo"));
  spin?.stop();
};

const createRepo = async (config) => {
  mkdirSync(home(".please"), { recursive: true });
  const hasGit = checkGit(config);
  if (hasGit) {
    createRepoGit(config);
  } else {
    await createRepoZip(config);
  }
  await install(home(".please", "repo"));
};

const updateRepo = async (config) => {
  const git = existsSync(home(".please", "repo", ".git"));
  const spin = progress({ text: "Updating the please repository", config });
  if (git) {
    execSync(`git pull`, { cwd: home(".please", "repo"), stdio: "ignore" });
  } else {
    const hasGit = checkGit(config);
    rmSync(home(".please", "repo"), { recursive: true });
    if (hasGit) {
      createRepoGit(config);
    } else {
      await createRepoZip(config);
    }
  }
  await install(home(".please", "repo"));
  spin?.stop();
};

const checkRepo = async (config) => {
  const exists = existsSync(home(".please", "repo"));
  if (!exists) {
    verbose({ text: "Please repository not found, bootstrapping", config });
    return await createRepo(config);
  }
  if (config.update) {
    return await updateRepo(config);
  }
};

const fetchNpm = async (config) => {
  const spin = progress({
    text: "Fetching NPM",
    config,
  });
  mkdirSync(home(".please"), { recursive: true });
  const npmAddr = "https://registry.npmjs.org/npm/-/npm-7.19.1.tgz";
  const resp = await fetch(npmAddr);
  const buffer = await resp.buffer();
  writeFileSync(home(".please", "npm.tgz"), buffer);
  await decompress(home(".please", "npm.tgz"), home(".please"));
  renameSync(home(".please", "package"), home(".please", "npm"));
  spin?.stop();
};

const checkNpm = async (config) => {
  const exists = existsSync(home(".please", "npm"));
  if (!exists) {
    verbose({ text: "NPM not found, bootstrapping", config });
    return await fetchNpm(config);
  }
};

const bootstrap = async (config) => {
  await checkNpm(config);
  await checkRepo(config);
};

module.exports.bootstrap = bootstrap;
