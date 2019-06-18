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

webuxResponse(express);

function LoadConfiguration(path) {
  this.config = webuxLoader(path);
}

function CreateLogger(options = {}) {
  this.log = webuxLogger(options);
}

function Webux() {
  this.config = {};

  this.log = webuxLogger();
  this.app = express();
  this.errorHandler = webuxErrorHandler.format;
  this.config = webuxLoader;
}

Webux.prototype.LoadConfiguration = LoadConfiguration;
Webux.prototype.CreateLogger = CreateLogger;

module.exports = Webux;
