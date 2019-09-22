async function InitLocalStrategy(loginFn, registerFn) {
  console.log(`\x1b[33mWebuxJS - Initialize Local Strategy\x1b[0m`);
  await initLocalStrategy(
    this.config.auth,
    this.Auth.passport,
    loginFn,
    registerFn
  );
}

async function InitJWTStrategy(deserializeFn = null) {
  console.log(`\x1b[33mWebuxJS - Initialize JWT Strategy\x1b[0m`);
  await initJWTStrategy(this.config.auth, this.Auth.passport, deserializeFn);
}

async function InitRedis() {
  console.log(`\x1b[33mWebuxJS - Initialize Redis\x1b[0m`);
  await initializeRedis(this.config.auth.redis);
}

function InitIsAuth(option) {
  console.log(`\x1b[33mWebuxJS - Create isAuth Functions\x1b[0m`);
  this.isAuth = isAuthenticated(option, this.Auth.passport, this.errorHandler);
}

module.exports = {
  InitIsAuth,
  InitRedis,
  InitJWTStrategy,
  InitLocalStrategy
};
