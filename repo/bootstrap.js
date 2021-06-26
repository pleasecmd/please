const { execSync } = require("child_process");
const { existsSync, mkdirSync, writeFileSync } = require("fs");
const { rmSync } = require("fs");
const { warn, info } = require("../log");
const { home } = require("../utils/home");
const fetch = require("node-fetch");
const decompress = require("decompress");

const checkGit = () => {
  try {
    return execSync("git --version").toString();
  } catch (err) {
    warn("Git not found, install git to speed things up.");
  }
};

const repoAddr = "https://github.com/pleasecmd/repo";

const createRepoGit = () => {
  const progress = info("Cloning please repository", true);
  execSync(`git clone ${repoAddr}`, {
    cwd: home(".please"),
    stdio: "pipe",
  });
  progress.stop();
};

const createRepoZip = async () => {
  const progress = info("Downloading the please repository", true);
  const zipAddr = `${repoAddr}/archive/refs/heads/master.zip`;
  const resp = await fetch(zipAddr);
  const buffer = await resp.buffer();
  writeFileSync(home(".please", "repo.zip"), buffer);
  decompress(home(".please", "repo.zip"), home(".please"));
  progress.stop();
};

const createRepo = async () => {
  mkdirSync(home(".please"), { recursive: true });
  const hasGit = checkGit();
  if (hasGit) {
    return createRepoGit();
  } else {
    return createRepoZip();
  }
};

const updateRepo = async () => {
  const git = existsSync(home(".please", "repo", ".git"));
  const progress = info("Updating the please repository", true);
  if (git) {
    execSync(`git pull`, { cwd: home(".please", "repo"), stdio: "pipe" });
  } else {
    const hasGit = checkGit();
    rmSync(home(".please", "repo"), { recursive: true });
    if (hasGit) {
      createRepoGit();
    } else {
      createRepoZip();
    }
  }
  progress.stop();
};

const checkRepo = async ({ update } = {}) => {
  const exists = existsSync(home(".please", "repo"));
  if (!exists) {
    return await createRepo();
  }
  if (update) {
    return await updateRepo();
  }
};

const defaultBootstrapOpts = {
  update: true,
};

const bootstrap = async ({ update } = defaultBootstrapOpts) => {
  await checkRepo({ update });
};

module.exports.bootstrap = bootstrap;
