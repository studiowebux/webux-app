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

webuxResponse(express);

function LoadConfiguration(path) {
  this.config = webuxLoader(path);
}

function LoadSecurity() {
  return webuxSecurity(
    this.app,
    this.config.security,
    this.log,
    this.errorHandler
  );
}

function StartServer() {
  return webuxServer(this.app, this.log, this.config.server);
}

function LoadGlobalErrorHandler() {
  return webuxErrorHandler.globalErrorHandler(this.app, this.log);
}

function LoadLanguage() {
  this.i18n = webuxLanguage.i18n;
  return webuxLanguage.init(this.app, this.log, this.config.language);
}

function LoadSeed() {
  return webuxSeed(this.log, this.config.seed.directory);
}

function CreateLogger() {
  this.log = webuxLogger(this.config.logger);
}

function Webux() {
  this.config = {};

  this.log = webuxLogger();
  this.app = express();
  this.errorHandler = webuxErrorHandler.errorHandler;
  this.config = webuxLoader;
}

Webux.prototype.LoadConfiguration = LoadConfiguration;
Webux.prototype.LoadSecurity = LoadSecurity;
Webux.prototype.LoadLanguage = LoadLanguage;
Webux.prototype.CreateLogger = CreateLogger;
Webux.prototype.LoadSeed = LoadSeed;
Webux.prototype.StartServer = StartServer;
Webux.prototype.OnRequest = webuxLogging.onRequest;
Webux.prototype.OnResponse = webuxLogging.onResponse;
Webux.prototype.GlobalErrorHandler = LoadGlobalErrorHandler;

module.exports = Webux;
