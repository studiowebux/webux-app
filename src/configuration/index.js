/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-06-17
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const fs = require("fs");
const path = require("path");

/**
 * To create the key name without the XX_ naming convention.
 * @param {String} moduleName
 * @return {String} name filtered
 */
function splitName(moduleName) {
  const name = moduleName.split("_");

  // Check if the part before the underscore has more than two characters
  // If so, returns only the second part
  if (name.length >= 2) {
    return name[1];
  }
  // otherwise it returns the first part
  return name[0];
}

/**
 * Load all modules within a directory and return the object containing the key/value
 * @param {String} configPath The absolute directory path, mandatory
 * @param {Object} modules The Configuration Array to store the module config., optional
 * (if the configuration is already initialized from external sources)
 * @param {Function} log The log function, optional (Default: console)
 * @return {Array} The mapping of the config name and the key/values.
 */
module.exports = (configPath, log = console) => {
  if (configPath && typeof configPath === "string") {
    let modules = {};
    // Get all files in the directory, process only the .js files
    fs.readdirSync(configPath)
      .sort()
      .forEach((file) => {
        if (file.includes(".js")) {
          // link the configuration values with the filename.
          const configName = file.split(".js")[0];
          const _splitName = splitName(configName);

          modules[_splitName] = require(path.join(configPath, file));
          log.info(
            `\x1b[32mwebux-loader - Configuration : ${_splitName} loaded\x1b[0m`
          );
        }
      });
    // return the mapping config/name
    return modules;
  } else {
    throw new Error(
      "The configPath must be a string representing the absolute path of the configuration directory."
    );
  }
};