const getName = (...parts) => parts.join(".");

const getFileNamesForOS = (osInfo, ext = "js") => {
  const { os, variant, release, arch } = osInfo;
  return [
    getName(os, variant, release, arch, ext),
    getName(os, variant, release, "any", ext),
    getName(os, variant, "any", arch, ext),
    getName(os, variant, "any", "any", ext),
    getName(os, "any", "any", "any", ext),
    getName("any", "any", "any", "any", ext),
  ];
};

module.exports.getFileNamesForOS = getFileNamesForOS;
