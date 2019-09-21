const path = require("path");
let Webux = require("../index"); // this module the app

const customVariableA = "A B C i'm a constant.";
let customVariableB = "I can change over time.";

let changeVariableB = function() {
  this.$.customVariableB = "Something else";
};

let showVariableB = function() {
  console.log(this.$.customVariableB);
};

let showConfiguration = function() {
  console.log(this.config);
};

async function LoadApp() {
  try {
    // Load constants
    await Webux.LoadConstants(path.join(__dirname, "constants"));

    // Load validators
    await Webux.LoadValidators(path.join(__dirname, "validations"));

    // Load configuration
    await Webux.LoadConfiguration(path.join(__dirname, "config"));

    // Create logger
    await Webux.CreateLogger();

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

    // Load static resources
    await Webux.LoadStaticResources();
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

    Webux.$["customVariableA"] = customVariableA;
    Webux.$["customVariableB"] = customVariableB;
    Webux.changeVariableB = changeVariableB;
    Webux.showVariableB = showVariableB;
    Webux.showConfiguration = showConfiguration;


    console.log("The end !")
    return Webux;
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

module.exports = LoadApp;
