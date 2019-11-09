const webuxMongoDB = require("@studiowebux/mongo-db");
const webuxSeed = require("@studiowebux/seed");
const webuxSecurity = require("@studiowebux/security");
const { serveStatic } = require("@studiowebux/static");
const { CreateRoutes } = require("@studiowebux/route");
const webuxSocket = require("@studiowebux/socket");
const { globalErrorHandler } = require("@studiowebux/errorhandler");

const { CreateServer } = require("@studiowebux/server");

async function InitDB() {
  this.log.info(`\x1b[33mWebuxJS - Connect to Database\x1b[0m`);
  this.db = new webuxMongoDB(this.config.db, this.log);
  await this.db.InitDB();
}

async function LoadModels() {
  this.log.info(`\x1b[33mWebuxJS - Load Models\x1b[0m`);
  await this.db.LoadModels();
  this.db = Object.freeze(this.db);
}

async function LoadSeed() {
  this.log.info(`\x1b[33mWebuxJS - Load seeds\x1b[0m`);
  await webuxSeed(this.config.seed.directory, this.log);
}

async function LoadSecurity() {
  this.log.info(`\x1b[33mWebuxJS - Load security\x1b[0m`);
  await webuxSecurity(this.config.security, this.app, this.log);
}

async function LoadStaticResources() {
  this.log.info(`\x1b[33mWebuxJS - Load static resources\x1b[0m`);
  await serveStatic(this.config.static, this.app, this.express, this.log);
}

async function LoadRoutes() {
  this.log.info(`\x1b[33mWebuxJS - Load Routes\x1b[0m`);
  await CreateRoutes(this.config.routes, this.router, this.log);
  this.app.use(this.config.server.endpoint, this.router);
}

async function InitSocket() {
  this.log.info(`\x1b[33mWebuxJS - Create Socket\x1b[0m`);
  this.socket = await webuxSocket(
    this.config.socket,
    this.server,
    this.log
  );
}

async function LoadGlobalErrorHandler() {
  this.log.info(`\x1b[33mWebuxJS - Load Global error handler\x1b[0m`);
  await globalErrorHandler(this.app, this.log);
}

async function InitServer() {
  this.log.info(`\x1b[33mWebuxJS - Start Server\x1b[0m`);
  this.server = await CreateServer(this.config.server, this.app, this.log);
}

module.exports = {
  InitDB,
  LoadModels,
  LoadSeed,
  LoadSecurity,
  LoadStaticResources,
  LoadRoutes,
  InitSocket,
  LoadGlobalErrorHandler,
  InitServer
};
