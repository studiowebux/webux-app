const {
  initJWTStrategy,
  initLocalStrategy,
  initializeRedis,
  isAuthenticated
} = require("webux-auth");

async function InitLocalStrategy(loginFn, registerFn) {
  this.log.info(`\x1b[33mWebuxJS - Initialize Local Strategy\x1b[0m`);
  await initLocalStrategy(
    this.config.auth,
    this.Auth.passport,
    loginFn,
    registerFn,
    this.log
  );
}

async function InitJWTStrategy(deserializeFn = null) {
  this.log.info(`\x1b[33mWebuxJS - Initialize JWT Strategy\x1b[0m`);
  await initJWTStrategy(
    this.config.auth,
    this.Auth.passport,
    deserializeFn,
    this.log
  );
}

async function InitRedis() {
  this.log.info(`\x1b[33mWebuxJS - Initialize Redis\x1b[0m`);
  await initializeRedis(this.config.auth.redis, this.log);
}

function InitIsAuth(option) {
  return new Promise(resolve => {
    this.log.info(`\x1b[33mWebuxJS - Create isAuth Functions\x1b[0m`);
    this.isAuth = isAuthenticated(
      option,
      this.Auth.passport,
      this.errorHandler,
      this.log
    );
    resolve();
  });
}

module.exports = {
  InitIsAuth,
  InitRedis,
  InitJWTStrategy,
  InitLocalStrategy
};
