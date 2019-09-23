const fs = require("fs");
const path = require("path");

function LoadValidators(directory) {
  this.log.info(`\x1b[33mWebuxJS - Load Validators\x1b[0m`);
  return new Promise((resolve, reject) => {
    try {
      fs.readdirSync(directory).forEach(file => {
        if (file.includes(".js")) {
          // link the configuration values with the filename.
          const configName = file.split(".js")[0];
          this.validators[configName] = require(path.join(directory, file));
          this.log.info(`attached 'validator' \x1b[32m${configName}\x1b[0m`);
        }
      });
      return resolve();
    } catch (e) {
      this.log.error(e);
      throw new Error("unable to load validators");
    }
  });
}

module.exports = LoadValidators;
