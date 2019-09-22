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

// Externals
const express = require("express");

// Wrappers
const webuxValidator = require("webux-validator");
const webuxQuery = require("webux-query");
const webuxFileUpload = require("webux-fileupload");
const { errorHandler } = require("webux-errorhandler");
const webuxLogger = require("webux-logger");
const webuxLoader = require("webux-loader");
const webuxAuth = require("webux-auth");
const { InitWebuxMailer, SendMail } = require("../lib/mailer");
const {
  InitIsAuth,
  InitRedis,
  InitJWTStrategy,
  InitLocalStrategy
} = require("../lib/auth");

// Utils
const toObject = require("../lib/toObject");
const idToUrl = require("../lib/idToUrl");

// Prototypes
const {
  LoadConfiguration,
  InitLogger,
  OnRequest,
  OnResponse,
  LoadLanguage,
  OnSocket
} = require("../lib/require");

const {
  InitDB,
  LoadModels,
  LoadSeed,
  LoadSecurity,
  LoadStaticResources,
  LoadRoutes,
  InitSocket,
  LoadGlobalErrorHandler,
  InitServer
} = require("../lib/promise");

const LoadConstants = require("../lib/constants");
const LoadValidators = require("../lib/validators");
const LoadResponses = require("../lib/responses");
const LoadLimiters = require("../lib/limiters");

/**
 * Webux Object
 */
function Webux() {
  this.config = {};
  this.socket = null;
  this.server = null;
  this.db = null;
  this.validators = {};
  this.constants = {};
  this.isAuth = null;

  this.log = webuxLogger();
  this.app = express();
  this.express = express;
  this.router = express.Router();
  this.errorHandler = errorHandler;
  this.webuxLoader = webuxLoader;
  this.query = webuxQuery;
  this.isValid = webuxValidator;
  this.toObject = toObject;
  this.idToUrl = idToUrl;
  this.fileUpload = webuxFileUpload;
  this.Auth = webuxAuth;
  this.$ = {}; // This object will hold custom variables, provided by the user.
}

Webux.prototype.LoadConfiguration = LoadConfiguration;
Webux.prototype.LoadConstants = LoadConstants;
Webux.prototype.LoadValidators = LoadValidators;
Webux.prototype.LoadResponses = LoadResponses;
Webux.prototype.InitLogger = InitLogger;
Webux.prototype.InitDB = InitDB;
Webux.prototype.LoadModels = LoadModels;
Webux.prototype.LoadSeed = LoadSeed;
Webux.prototype.OnRequest = OnRequest;
Webux.prototype.OnResponse = OnResponse;
Webux.prototype.LoadSecurity = LoadSecurity;
Webux.prototype.LoadLanguage = LoadLanguage;
Webux.prototype.LoadLimiters = LoadLimiters;
Webux.prototype.LoadStaticResources = LoadStaticResources;
Webux.prototype.LoadRoutes = LoadRoutes;
Webux.prototype.InitSocket = InitSocket;
Webux.prototype.OnSocket = OnSocket;
Webux.prototype.LoadGlobalErrorHandler = LoadGlobalErrorHandler;
Webux.prototype.InitServer = InitServer;

Webux.prototype.InitWebuxMailer = InitWebuxMailer;
Webux.prototype.SendMail = SendMail;

Webux.prototype.InitIsAuth = InitIsAuth;
Webux.prototype.InitJWTStrategy = InitJWTStrategy;
Webux.prototype.InitLocalStrategy = InitLocalStrategy;
Webux.prototype.InitRedis = InitRedis;

module.exports = Webux;
