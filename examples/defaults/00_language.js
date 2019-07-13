// ██████╗ ███████╗███████╗ █████╗ ██╗   ██╗██╗  ████████╗    ██╗   ██╗ █████╗ ██╗     ██╗   ██╗███████╗███████╗
// ██╔══██╗██╔════╝██╔════╝██╔══██╗██║   ██║██║  ╚══██╔══╝    ██║   ██║██╔══██╗██║     ██║   ██║██╔════╝██╔════╝
// ██║  ██║█████╗  █████╗  ███████║██║   ██║██║     ██║       ██║   ██║███████║██║     ██║   ██║█████╗  ███████╗
// ██║  ██║██╔══╝  ██╔══╝  ██╔══██║██║   ██║██║     ██║       ╚██╗ ██╔╝██╔══██║██║     ██║   ██║██╔══╝  ╚════██║
// ██████╔╝███████╗██║     ██║  ██║╚██████╔╝███████╗██║        ╚████╔╝ ██║  ██║███████╗╚██████╔╝███████╗███████║
// ╚═════╝ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝         ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚══════╝╚══════╝

/**
 * File: 00_language.js
 * Author: Tommy Gingras
 * Date: 2019-06-18
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("../../index");

const french = async () => {
  const language = new Webux.db.Language({
    language: "Français"
  });
  const languageCreated = await language.save();

  if (!languageCreated) {
    throw new Error("Language not created !");
  }

  return Promise.resolve('Default language "french" created.');
};

const english = async () => {
  const language = new Webux.db.Language({
    language: "English"
  });
  const languageCreated = await language.save();

  if (!languageCreated) {
    throw new Error("Language not created !");
  }

  return Promise.resolve('Default language "english" created.');
};

module.exports = Promise.all([french(), english()]);
