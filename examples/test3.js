const WebuxCore = require("../index");
const path = require("path");

async function LoadApp() {
  // Create app
  const Webux = await new WebuxCore();

  // Load configuration
  await Webux.LoadConfiguration(path.join(__dirname, "config"));

  // Create logger
  await Webux.CreateLogger();

  // load default values
  await Webux.LoadSeed();

  // request logger
  await Webux.OnRequest();

  // Load security
  await Webux.LoadSecurity();

  // Load Language
  await Webux.LoadLanguage();

  // Create Limiter
  await Webux.CreateLimiter();

  // routes
  await Webux.CreateRoutes();

  // sockets
  await Webux.CreateSockets();

  // error handling
  await Webux.GlobalErrorHandler();

  // start server
  await Webux.StartServer();

  // start sockets
  await Webux.StartSocket();
}

module.exports = LoadApp;
