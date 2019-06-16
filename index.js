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

const webuxlogger = require("webux-logger");
const express = require("express");

let Webux = () => {
  return this;
};

function CreateApp(options = {}) {
  if (options) {
    Webux.log = webuxlogger(options.logger);
    Webux.app = express();
  }

  return Webux;
}

module.exports = { Webux, CreateApp };
