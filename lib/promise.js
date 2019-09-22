const webuxMongoDB = require("webux-mongo-db");
const webuxSeed = require("webux-seed");
const webuxSecurity = require("webux-security");
const { serveStatic } = require("webux-static");
const { CreateRoutes } = require("webux-route");
const webuxSocket = require("webux-socket");
const { globalErrorHandler } = require("webux-errorhandler");

const { CreateServer } = require("webux-server");

async function InitDB() {
  console.log(`\x1b[33mWebuxJS - Connect to Database\x1b[0m`);
  this.db = new webuxMongoDB(this.config.db, this.log);
  await this.db.InitDB();
}

async function LoadModels() {
  console.log(`\x1b[33mWebuxJS - Load Models\x1b[0m`);
  await this.db.LoadModels();
  this.db = Object.freeze(this.db);
}

async function LoadSeed() {
  console.log(`\x1b[33mWebuxJS - Load seeds\x1b[0m`);
  await webuxSeed(this.config.seed.directory, this.log);
}

async function LoadSecurity() {
  console.log(`\x1b[33mWebuxJS - Load security\x1b[0m`);
  await webuxSecurity(this.config.security, this.app, this.log);
}

async function LoadStaticResources() {
  console.log(`\x1b[33mWebuxJS - Load static resources\x1b[0m`);
  await serveStatic(this.config.static, this.app, this.express, this.log);
}

async function LoadRoutes() {
  console.log(`\x1b[33mWebuxJS - Load Routes\x1b[0m`);
  await CreateRoutes(this.config.routes, this.router, this.log);
}

async function InitSocket() {
  console.log(`\x1b[33mWebuxJS - Create Socket\x1b[0m`);
  this.socket = await webuxSocket(
    this.config.socket.options,
    this.config.socket.baseDir,
    this.config.socket.isAuthenticated,
    this.config.socket.accessKey,
    this.config.socket.timeout,
    this.log
  );
}

async function LoadGlobalErrorHandler() {
  console.log(`\x1b[33mWebuxJS - Load Global error handler\x1b[0m`);
  await globalErrorHandler(this.app, this.log);
}

async function InitServer() {
  console.log(`\x1b[33mWebuxJS - Start Server\x1b[0m`);
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
