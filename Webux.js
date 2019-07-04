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
const webuxServer = require("webux-server");
const webuxSeed = require("webux-seed");
const webuxLogging = require("webux-logging");
const webuxRoute = require("webux-route");

webuxResponse(express);

function LoadConfiguration(path) {
  this.config = webuxLoader(path);
}

function LoadSecurity() {
  return webuxSecurity(this.config.security, this.app, this.log);
}

function StartServer() {
  return webuxServer(this.config.server, this.app, this.log);
}

function OnRequest() {
  return webuxLogging.onRequest(this.config.request, this.app, this.log);
}

function OnResponse() {
  return webuxLogging.onResponse(this.config.response, this.app, this.log);
}

function CreateRoutes() {
  return webuxRoute.CreateRoutes(this.routes, this.config.router);
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

  this.log = webuxLogger();
  this.app = express();
  this.router = express.Router();
  this.errorHandler = webuxErrorHandler.errorHandler;
  this.config = webuxLoader;
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
Webux.prototype.GlobalErrorHandler = LoadGlobalErrorHandler;

module.exports = Webux;
