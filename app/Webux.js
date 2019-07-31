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

const webuxValidator = require("webux-validator");
const webuxQuery = require("webux-query");
const webuxLogger = require("webux-logger");
const webuxErrorHandler = require("webux-errorhandler");
const webuxLoader = require("webux-loader");
const {
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
} = require("../lib");
const toObject = require("../lib/toObject");
const idToUrl = require("../lib/idToUrl");

function Webux() {
  this.config = {};
  this.socket = null;
  this.server = null;
  this.db = null;
  this.validators = {};
  this.constants = {};

  this.log = webuxLogger();
  this.app = express();
  this.express = express;
  this.router = express.Router();
  this.errorHandler = webuxErrorHandler.errorHandler;
  this.config = webuxLoader;
  this.query = webuxQuery;
  this.isValid = webuxValidator;
  this.toObject = toObject;
  this.idToUrl = idToUrl;
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
Webux.prototype.InitDB = InitDB;
Webux.prototype.LoadModels = LoadModels;
Webux.prototype.LoadConstants = LoadConstants;
Webux.prototype.LoadValidators = LoadValidators;

module.exports = Webux;
