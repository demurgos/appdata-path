"use strict";

const {platform, homedir} = require("os");
const {join} = require("path");

function getForWindows() {
  return join(homedir(), "AppData", "Roaming");
}

function getForMac() {
  return join(homedir(), "Library", "Application Support");
}

function getForLinux() {
  return join(homedir(), ".config");
}

function getFallback() {
  if (platform().startsWith("win")) {
    // Who knows, maybe its win64?
    return getForWindows();
  }
  return getForLinux();
}

function getAppDataPath(app) {
  let appDataPath = process.env["APPDATA"];
  if (typeof appDataPath === "string") {
    return appDataPath;
  }

  switch (platform()) {
    case "win32":
      appDataPath = getForWindows();
      break;
    case "darwin":
      appDataPath = getForMac();
      break;
    case "linux":
      appDataPath = getForLinux();
      break;
    default:
      appDataPath = getFallback();
  }

  if (app === void 0) {
    return appDataPath;
  }

  const normalizedAppName = appDataPath !== homedir() ? app : "." + app;
  return join(appDataPath, normalizedAppName);
}

module.exports = {
  getAppDataPath: getAppDataPath,
  default: getAppDataPath,
};
