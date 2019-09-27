let Webux = require("../index");
const path = require("path");

async function LoadApp() {
  try {
    Webux.LoadResponses();

    Webux.LoadConfiguration(path.join(__dirname, "config"));

    Webux.LoadConstants(path.join(__dirname, "constants"));

    Webux.LoadValidators(path.join(__dirname, "validations"));

    //await Webux.InitLogger();

    await Webux.InitDB();

    await Webux.LoadModels();

    await Webux.LoadSeed();

    Webux.OnRequest();

    Webux.OnResponse();

    await Webux.LoadSecurity();

    Webux.LoadLanguage();

    await Webux.LoadLimiters();

    await Webux.LoadStaticResources();

    await Webux.LoadRoutes();

    await Webux.LoadGlobalErrorHandler();

    await Webux.InitServer();

    // To start the socket listener, you need the server (http/https) instance
    await Webux.InitSocket();

    console.log("Application Ready !");
  } catch (e) {
    console.error(e);
    process.exit(2);
  }
}

module.exports = LoadApp;
