// ██████╗ ██████╗ ██████╗ ███████╗
// ██╔════╝██╔═══██╗██╔══██╗██╔════╝
// ██║     ██║   ██║██████╔╝█████╗
// ██║     ██║   ██║██╔══██╗██╔══╝
// ╚██████╗╚██████╔╝██║  ██║███████╗
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

/**
 * File: Webux.js
 * Author: Tommy Gingras
 * Date: 2019-06-17
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const webuxLogger = require("webux-logger");
const express = require("express");
const webuxResponse = require("webux-response");
const webuxErrorHandler = require("webux-errorhandler");
const webuxLoader = require("webux-loader");
const webuxLanguage = require("webux-language");
const webuxSecurity = require("webux-security");
const { CreateServer, server } = require("webux-server");
const webuxSeed = require("webux-seed");
const webuxLogging = require("webux-logging");
const webuxRoute = require("webux-route");
const webuxSocket = require("webux-socket");
const webuxLimiter = require("webux-limiter");
const webuxQuery = require("webux-query");
const webuxMailer = require("webux-mailer");

webuxResponse(express);

function LoadConfiguration(path) {
  this.config = webuxLoader(path);
}

function LoadSecurity() {
  return webuxSecurity(this.config.security, this.app, this.log);
}

function StartServer() {
  this.server = CreateServer(this.config.server, this.app, this.log);
}

function CreateLimiter() {
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

function ConfigureWebuxMailer() {
  return webuxMailer.init(this.config.mailer, this.app, this.log);
}

function SendMail(sender, recipient, subject, text, body) {
  return webuxMailer.mail(sender, recipient, subject, text, body);
}

function OnRequest() {
  return webuxLogging.onRequest(this.config.request, this.app, this.log);
}

function OnResponse() {
  return webuxLogging.onResponse(this.config.response, this.app, this.log);
}

function CreateSockets() {
  this.socket = webuxSocket(
    this.config.socket.baseDir,
    this.config.socket.isAuthenticated,
    this.config.socket.accessKey,
    this.config.socket.timeout,
    this.log
  );
}

function StartSocket() {
  this.socket.listen(this.server);
}

async function CreateRoutes() {
  await webuxRoute.CreateRoutes(this.config.routes, this.router);
  this.app.use(this.config.server.endpoint, this.router);
  return;
}

function LoadGlobalErrorHandler() {
  return webuxErrorHandler.globalErrorHandler(this.app, this.log);
}

function LoadLanguage() {
  this.i18n = webuxLanguage.i18n;
  return webuxLanguage.init(this.config.language, this.app, this.log);
}

function LoadSeed() {
  return webuxSeed(this.config.seed.directory, this.log);
}

function CreateLogger() {
  this.log = webuxLogger(this.config.logger);
}

function Webux() {
  this.config = {};
  this.socket = null;
  this.server = null;

  this.log = webuxLogger();
  this.app = express();
  this.router = express.Router();
  this.errorHandler = webuxErrorHandler.errorHandler;
  this.config = webuxLoader;
  this.query = webuxQuery;
}

Webux.prototype.LoadConfiguration = LoadConfiguration;
Webux.prototype.LoadSecurity = LoadSecurity;
Webux.prototype.LoadLanguage = LoadLanguage;
Webux.prototype.CreateLogger = CreateLogger;
Webux.prototype.LoadSeed = LoadSeed;
Webux.prototype.StartServer = StartServer;
Webux.prototype.OnRequest = OnRequest;
Webux.prototype.OnResponse = OnResponse;
Webux.prototype.CreateRoutes = CreateRoutes;
Webux.prototype.CreateSockets = CreateSockets;
Webux.prototype.StartSocket = StartSocket;
Webux.prototype.GlobalErrorHandler = LoadGlobalErrorHandler;
Webux.prototype.CreateLimiter = CreateLimiter;
Webux.prototype.ConfigureWebuxMailer = ConfigureWebuxMailer;
Webux.prototype.SendMail = SendMail;

module.exports = Webux;
