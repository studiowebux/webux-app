# Webux-app
This module contains the definition of the whole app, it uses global variable to simplify the app structure.

# Installation
```
npm i --save webux-app
```

# Usage

This module is a wrapper of the entire app, you can use it to centralise the management, all the modules work together without major issues.

For an example about how to use it, check the examples directory.

Otherwise here is the two files that use especially the webux-app module,

Webux.js
```
const WebuxCore = require("webux-app");
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
```

index.js
```
const Webux = require("./Webux");

/**
 * this function initialise the whole framework
 * @return {Object} return the Webux object
 */
function CreateApp() {
  return new Webux();
}

module.exports = CreateApp;
```

for further details, i'm currently writing the whole document for the framework...
Feel free to ask questions,

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

SEE LICENSE IN license.txt
