# @studiowebux/app

This module is a wrapper to use the webux toolbox.

# Installation

```
npm i --save @studiowebux/app
```

# Usage

it can be use to centralise the rest API developmen.
Every modules in the @studiowebux scope are compatible and tested with this module.

## How to use it ?

The Examples/ directory contains a working demo.

## Packages

express
@hapi/joi
@studiowebux/auth
@studiowebux/errorhandler
@studiowebux/fileupload
@studiowebux/language
@studiowebux/limiter
@studiowebux/loader
@studiowebux/logger
@studiowebux/logging
@studiowebux/mailer
@studiowebux/mongo-db
@studiowebux/query
@studiowebux/response
@studiowebux/route
@studiowebux/security
@studiowebux/seed
@studiowebux/server
@studiowebux/socket
@studiowebux/static
@studiowebux/validator

## Specifications

### LoadApp.js

It contains the application definition, the modules, variables and custom fucntions can be added in this file.  
This example is a complete example,

```javascript
// █████╗ ██████╗ ██████╗
// ██╔══██╗██╔══██╗██╔══██╗
// ███████║██████╔╝██████╔╝
// ██╔══██║██╔═══╝ ██╔═══╝
// ██║  ██║██║     ██║
// ╚═╝  ╚═╝╚═╝     ╚═╝

/**
 * File: index.js
 * Author:
 * Date:
 * License:
 */

"use strict";

const path = require("path");
const Webux = require("@studiowebux/app");
const { loginFn, registerFn } = require("../api/v1/plugins/auth/local");
// const { deserializeFn } = require("../api/v1/plugins/auth/local"); // if required
const jwtOptions = require(path.join(__dirname, "..", "config", "auth")).jwt;

/**
 * It initializes the application.
 * @returns {Function} The webux object
 */

async function LoadApp() {
  Webux.LoadResponses();

  // load isAuth middleware
  await Webux.InitIsAuth(jwtOptions);

  Webux.LoadConstants(path.join(__dirname, "..", "api", "v1", "constants"));

  Webux.LoadValidators(path.join(__dirname, "..", "api", "v1", "validations"));

  Webux.LoadConfiguration(path.join(__dirname, "..", "config"));

  await Webux.InitLogger();

  await Webux.InitDB();

  await Webux.LoadModels();

  if (Webux.config.seed.enabled) {
    await Webux.LoadSeed();
  }

  Webux.OnRequest();

  Webux.OnResponse();

  await Webux.LoadSecurity();

  Webux.LoadLanguage();

  await Webux.LoadLimiters();

  await Webux.LoadStaticResources();

  await Webux.LoadRoutes();

  await Webux.LoadGlobalErrorHandler();

  await Webux.InitServer();

  await Webux.InitSocket();

  // Initialize the authentication module
  await Webux.InitLocalStrategy(loginFn, registerFn);
  await Webux.InitJWTStrategy(/*deserializeFn*/);
  await Webux.InitRedis();

  Webux.Auth.checkAuth = require("../api/v1/plugins/auth/isAuth");
  Webux.setIp = require("../api/v1/helpers/setIp");

  Webux.log.info("Application Ready !");
}

module.exports = LoadApp;
```

### app.js
This is the entry point of the application

```javascript
"use strict";

const LoadApp = require("./app");

try {
  LoadApp();
} catch (e) {
  console.error(e);
  process.exit(1);
}

```
## Architecture

```
./
  api/
    v1/
      actions/
        user/
          create.js
          find.js
          findOne.js
          update.js
          remove.js
        language/
          find.js
      constants/
        user.js
      validations/
        user.js
      helpers/
        custom.js
      middlewares/
        func.js
      plugins/
        auth/
          func.js
  config/
    auth.js
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
    static.js
    upload.js
  defaults/
    00_language.js
  locales/
    fr.json
    en.json
  models/
    user.js
    language.js
  app/
    index.js
  log/
    info.log
  tests/
    cases/
  Dockerfile
  index.js
  package.json
  .gitignore
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

SEE LICENSE IN license.txt
