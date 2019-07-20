const path = require("path");
const Webux = require("../index"); // this module the app

async function LoadApp() {
  // Load configuration
  await Webux.LoadConfiguration(path.join(__dirname, "config"));

  // Create logger
  await Webux.CreateLogger();

  await Webux.LoadConstants(path.join(__dirname, "constants"));

  await Webux.LoadValidators(path.join(__dirname, "validations"));

  // initialize the Database
  await Webux.InitDB();

  // initialize the Database Models
  await Webux.LoadModels();

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

  return Webux;
}

module.exports = LoadApp;
