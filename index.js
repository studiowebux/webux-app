// ██████╗ ██████╗ ██████╗ ███████╗
// ██╔════╝██╔═══██╗██╔══██╗██╔════╝
// ██║     ██║   ██║██████╔╝█████╗
// ██║     ██║   ██║██╔══██╗██╔══╝
// ╚██████╗╚██████╔╝██║  ██║███████╗
//  ╚═════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝

/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-06-13
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const webuxLogger = require("webux-logger");
const express = require("express");
const webuxResponse = require("webux-response");
const webuxErrorHandler = require("webux-errorhandler");

function AppendConfiguration(key, config = {}) {
  Webux.config[key] = config;
}

webuxResponse(express);

let Webux = () => {
  return this;
};

function CreateApp(options = {}) {
  // variables
  if (options) {
    Webux.log = webuxLogger(options.logger);
  }
  Webux.config = {};

  // functions
  Webux.app = express();
  Webux.errorHandler = webuxErrorHandler.format;
  Webux.AppendConfiguration = AppendConfiguration;

  return Webux;
}

module.exports = { Webux, CreateApp };
