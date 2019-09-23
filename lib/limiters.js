const { createLimiter } = require("webux-limiter");

function CreateLimiter() {
  this.log.info(`\x1b[33mWebuxJS - Create Limiter\x1b[0m`);
  return new Promise((resolve, reject) => {
    try {
      Object.keys(this.config.limiter).forEach(option => {
        this.app.use(createLimiter(this.config.limiter[option], this.log));
      });
      return resolve();
    } catch (e) {
      this.log.error(e);
      throw new Error("unable to create limiters");
    }
  });
}

module.exports = CreateLimiter;
