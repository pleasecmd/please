const { release: getRelease } = require("os");
const { arch: getArch } = require("os");
const getos = require("getos");
const { runAsync } = require("./async");
const macosRelease = require("macos-release");

const getLinuxInfo = ({ dist = "any", release = "any" }) => {
  const variant = dist.toLowerCase().replace(/\s+/, "");
  return {
    os: "linux",
    arch: getArch(),
    variant,
    release,
  };
};

const getWindowsInfo = () => {
  const versionInfo = getRelease();
  const [variant, release] = versionInfo.match(/(\d+\.\d+)\.(\d+)/).slice(1);
  return {
    os: "windows",
    arch: getArch(),
    variant,
    release,
  };
};

const getMacOSInfo = () => {
  const release = getRelease();
  const variant = macosRelease(release).name.toLowerCase().replace(/\s+/g, "");
  return {
    os: "macos",
    arch: getArch(),
    variant,
    release,
  };
};

const getBSDInfo = (variant) => {
  const release = getRelease();
  return {
    os: "bsd",
    arch: getArch(),
    variant,
    release,
  };
};

const getFreeBSDInfo = () => getBSDInfo("freebsd");
const getOpenBSDInfo = () => getBSDInfo("openbsd");

const getOSInfo = async () => {
  const osInfo = await runAsync(getos);
  if (osInfo.os === "linux") {
    return getLinuxInfo(osInfo);
  }
  if (osInfo.os === "win32") {
    return getWindowsInfo();
  }
  if (osInfo.os === "darwin") {
    return getMacOSInfo();
  }
  if (osInfo.os === "freebsd") {
    return getFreeBSDInfo();
  }
  if (osInfo.os === "openbsd") {
    return getOpenBSDInfo();
  }
};

module.exports.getOSInfo = getOSInfo;
