// ██████╗ ██████╗ ██████╗ ███████╗
// ██╔════╝██╔═══██╗██╔══██╗██╔════╝
// ██║     ██║   ██║██████╔╝█████╗
// ██║     ██║   ██║██╔══██╗██╔══╝
// ╚██████╗╚██████╔╝██║  ██║███████╗
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-07-19
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const fs = require("fs");
const path = require("path");

const webuxLogger = require("webux-logger");
const express = require("express");
const webuxResponse = require("webux-response");
const webuxErrorHandler = require("webux-errorhandler");
const webuxLoader = require("webux-loader");
const webuxLanguage = require("webux-language");
const webuxSecurity = require("webux-security");
const { CreateServer } = require("webux-server");
const webuxSeed = require("webux-seed");
const webuxLogging = require("webux-logging");
const webuxRoute = require("webux-route");
const webuxSocket = require("webux-socket");
const webuxLimiter = require("webux-limiter");
const webuxMailer = require("webux-mailer");
const webuxMongoDB = require("webux-mongo-db");
const {
  initJWTStrategy,
  initLocalStrategy,
  initializeRedis,
  isAuthenticated
} = require("webux-auth");
const { serveStatic } = require("webux-static");

webuxResponse(express);

function LoadConfiguration(path) {
  try {
    console.log("\x1b[33m", "WebuxJS - Load configuration", "\x1b[0m");
    this.config = webuxLoader(path);
  } catch (e) {
    throw e;
  }
}

function LoadSecurity() {
  try {
    console.log("\x1b[33m", "WebuxJS - Load security", "\x1b[0m");
    return webuxSecurity(this.config.security, this.app, this.log);
  } catch (e) {
    throw e;
  }
}

async function StartServer() {
  try {
    console.log("\x1b[33m", "WebuxJS - Start Server", "\x1b[0m");
    this.server = await CreateServer(this.config.server, this.app, this.log);
  } catch (e) {
    throw e;
  }
}

async function InitDB() {
  try {
    console.log("\x1b[33m", "WebuxJS - Init Database", "\x1b[0m");
    this.db = new webuxMongoDB(this.config.db, this.log);
    await this.db.InitDB();
  } catch (e) {
    throw e;
  }
}

async function LoadModels() {
  try {
    console.log("\x1b[33m", "WebuxJS - Load Models", "\x1b[0m");
    await this.db.LoadModels();
    this.db = Object.freeze(this.db);
  } catch (e) {
    throw e;
  }
}

function CreateLimiter() {
  console.log("\x1b[33m", "WebuxJS - Create Limiter", "\x1b[0m");
  return new Promise((resolve, reject) => {
    try {
      Object.keys(this.config.limiter).forEach(option => {
        this.app.use(
          webuxLimiter.createLimiter(this.config.limiter[option], this.log)
        );
      });
      return resolve();
    } catch (e) {
      console.error(e);
      throw new Error("unable to create limiters");
    }
  });
}

function LoadConstants(directory) {
  console.log("\x1b[33m", "WebuxJS - Load Constants", "\x1b[0m");
  return new Promise((resolve, reject) => {
    try {
      fs.readdirSync(directory).forEach(file => {
        if (file.indexOf(".js") > 0) {
          // link the configuration values with the filename.
          const configName = file.split(".js")[0];
          this.constants[configName] = require(path.join(directory, file));
          console.info("attached `constant` " + configName);
        }
      });
      return resolve();
    } catch (e) {
      console.error(e);
      throw new Error("unable to load constants");
    }
  });
}

function LoadValidators(directory) {
  console.log("\x1b[33m", "WebuxJS - Load Validators", "\x1b[0m");
  return new Promise((resolve, reject) => {
    try {
      fs.readdirSync(directory).forEach(file => {
        if (file.indexOf(".js") > 0) {
          // link the configuration values with the filename.
          const configName = file.split(".js")[0];
          this.validators[configName] = require(path.join(directory, file));
          console.info("attached `validator` " + configName);
        }
      });
      return resolve();
    } catch (e) {
      console.error(e);
      throw new Error("unable to load validators");
    }
  });
}

function ConfigureWebuxMailer() {
  try {
    console.log("\x1b[33m", "WebuxJS - Configure Mailer", "\x1b[0m");
    return webuxMailer.init(this.config.mailer, this.app, this.log);
  } catch (e) {
    throw e;
  }
}

function SendMail(sender, recipient, subject, text, body) {
  try {
    console.log("\x1b[33m", "WebuxJS - Configure Mailer", "\x1b[0m");
    return webuxMailer.mail(sender, recipient, subject, text, body);
  } catch (e) {
    throw e;
  }
}

function OnRequest() {
  try {
    console.log("\x1b[33m", "WebuxJS - On request", "\x1b[0m");
    return webuxLogging.onRequest(this.config.request, this.app, this.log);
  } catch (e) {
    throw e;
  }
}

function OnResponse() {
  try {
    console.log("\x1b[33m", "WebuxJS - On response", "\x1b[0m");
    return webuxLogging.onResponse(this.config.response, this.app, this.log);
  } catch (e) {
    throw e;
  }
}

async function CreateSockets() {
  try {
    console.log("\x1b[33m", "WebuxJS - Create Socket", "\x1b[0m");
    this.socket = await webuxSocket(
      this.config.socket.baseDir,
      this.config.socket.isAuthenticated,
      this.config.socket.accessKey,
      this.config.socket.timeout,
      this.log
    );
  } catch (e) {
    throw e;
  }
}

function StartSocket() {
  try {
  } catch (e) {
    throw e;
  }
  console.log("\x1b[33m", "WebuxJS - Start Socket Server", "\x1b[0m");
  this.socket.listen(this.server);
}

async function CreateRoutes() {
  console.log("\x1b[33m", "WebuxJS - Create Routes", "\x1b[0m");
  try {
    await webuxRoute.CreateRoutes(this.config.routes, this.router, this.log);
    this.app.use(this.config.server.endpoint, this.router);
  } catch (e) {
    throw e;
  }
}

function LoadGlobalErrorHandler() {
  try {
    console.log("\x1b[33m", "WebuxJS - Load Global error handler", "\x1b[0m");
    return webuxErrorHandler.globalErrorHandler(this.app, this.log);
  } catch (e) {
    throw e;
  }
}

function LoadLanguage() {
  try {
    console.log("\x1b[33m", "WebuxJS - Load language", "\x1b[0m");
    this.i18n = webuxLanguage.i18n;
    return webuxLanguage.init(this.config.language, this.app, this.log);
  } catch (e) {
    throw e;
  }
}

function LoadSeed() {
  try {
    console.log("\x1b[33m", "WebuxJS - Load seeds", "\x1b[0m");
    return webuxSeed(this.config.seed.directory, this.log);
  } catch (e) {
    throw e;
  }
}

function CreateLogger() {
  try {
    console.log("\x1b[33m", "WebuxJS - Create Logger", "\x1b[0m");
    this.log = webuxLogger(this.config.logger);
  } catch (e) {
    throw e;
  }
}

async function LoadStaticResources() {
  try {
    console.log("\x1b[33m", "WebuxJS - Load static resources", "\x1b[0m");
    await serveStatic(this.config.static, this.app, this.express, this.log);
  } catch (e) {
    throw e;
  }
}

async function InitLocalStrategy(loginFn, registerFn) {
  try {
    await initLocalStrategy(
      this.config.auth,
      this.Auth.passport,
      loginFn,
      registerFn
    );
  } catch (e) {
    throw e;
  }
}

async function InitJWTStrategy(deserializeFn = null) {
  try {
    await initJWTStrategy(this.config.auth, this.Auth.passport, deserializeFn);
  } catch (e) {
    throw e;
  }
}

async function InitRedis() {
  try {
    await initializeRedis(this.config.auth.redis);
  } catch (e) {
    throw e;
  }
}

function CreateIsAuth(option) {
  try {
    this.isAuth = isAuthenticated(
      option,
      this.Auth.passport,
      this.errorHandler
    );
  } catch (e) {
    throw e;
  }
}

module.exports = {
  LoadConfiguration,
  LoadConstants,
  LoadGlobalErrorHandler,
  LoadLanguage,
  LoadModels,
  LoadSecurity,
  LoadSeed,
  LoadValidators,
  CreateLogger,
  CreateLimiter,
  CreateRoutes,
  CreateSockets,
  StartServer,
  StartSocket,
  OnRequest,
  OnResponse,
  SendMail,
  ConfigureWebuxMailer,
  InitDB,
  express,
  LoadStaticResources,
  InitJWTStrategy,
  InitLocalStrategy,
  InitRedis,
  CreateIsAuth
};
