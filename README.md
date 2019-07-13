# Webux-app
This module contains the definition of the whole app, it uses global variable to simplify the app structure.

# Installation
```
npm i --save webux-app
```

# Usage

@ 2019-07-13 I will soon start to write a complete documentation, I recommend you to check the example directory to get a good understanding of the application  

This module is a wrapper of the entire app, you can use it to centralise the management, all the modules work together without major issues.

For an example about how to use it, check the examples directory.

Otherwise here is the two files that use especially the webux-app module,

LoadApp.js
it contains the application definition.
```
const path = require("path");
const Webux = require("webux-app");

async function LoadApp() {
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
```

app.js
This is the entry point for the application
```
const LoadApp = require("./LoadApp");

try {
  LoadApp();
} catch (e) {
  process.exit(1);
}
```

The application recommended architecture
```
./
  actions/
    user/
      create.js
      find.js
      findOne.js
      update.js
      remove.js
    language/
      find.js
  config/
    db.js
    language.js
    limiter.js
    logger.js
    mailer.js
    request.js
    routes.js
    security.js
    seed.js
    server.js
    socket.js
  constants/
    user.js
  defaults/
    00_language.js
  locales/
    fr.json
    en.json
  models/
    user.js
    language.js
  validations/
    user.js
  app.js
  LoadApp.js
  package.json
  .gitignore
```

for further details, i'm currently writing the whole document for the framework...
Feel free to ask questions,

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

SEE LICENSE IN license.txt
