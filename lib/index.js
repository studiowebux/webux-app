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

webuxResponse(express);

function LoadConfiguration(path) {
  console.log("Load configuration");
  this.config = webuxLoader(path);
}

function LoadSecurity() {
  console.log("Load security");
  return webuxSecurity(this.config.security, this.app, this.log);
}

function StartServer() {
  console.log("Start Server");
  this.server = CreateServer(this.config.server, this.app, this.log);
}

async function InitDB() {
  console.log("Init Database");
  this.db = new webuxMongoDB(this.config.db, this.log);
  await this.db.InitDB();
}

async function LoadModels() {
  console.log("Load Models");
  await this.db.LoadModels();
  this.db = Object.freeze(this.db);
}

function CreateLimiter() {
  console.log("Create Limiter");
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
      return reject("unable to create limiters");
    }
  });
}

function LoadConstants(directory) {
  console.log("Load Constants");
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
      throw e;
    }
  });
}

function LoadValidators(directory) {
  console.log("Load Validators");
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
      throw e;
    }
  });
}

function ConfigureWebuxMailer() {
  console.log("Configure Mailer");
  return webuxMailer.init(this.config.mailer, this.app, this.log);
}

function SendMail(sender, recipient, subject, text, body) {
  return webuxMailer.mail(sender, recipient, subject, text, body);
}

function OnRequest() {
  console.log("On request");
  return webuxLogging.onRequest(this.config.request, this.app, this.log);
}

function OnResponse() {
  console.log("On response");
  return webuxLogging.onResponse(this.config.response, this.app, this.log);
}

function CreateSockets() {
  console.log("Create Socket");
  this.socket = webuxSocket(
    this.config.socket.baseDir,
    this.config.socket.isAuthenticated,
    this.config.socket.accessKey,
    this.config.socket.timeout,
    this.log
  );
}

function StartSocket() {
  console.log("Start Socket Server");
  this.socket.listen(this.server);
}

async function CreateRoutes() {
  console.log("Create Routes");
  await webuxRoute.CreateRoutes(this.config.routes, this.router, this.log);
  this.app.use(this.config.server.endpoint, this.router);
  return;
}

function LoadGlobalErrorHandler() {
  console.log("Load Global error handler");
  return webuxErrorHandler.globalErrorHandler(this.app, this.log);
}

function LoadLanguage() {
  console.log("Load language");
  this.i18n = webuxLanguage.i18n;
  return webuxLanguage.init(this.config.language, this.app, this.log);
}

function LoadSeed() {
  console.log("Load seeds");
  return webuxSeed(this.config.seed.directory, this.log);
}

function CreateLogger() {
  console.log("Create Logger");
  this.log = webuxLogger(this.config.logger);
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
  express
};
