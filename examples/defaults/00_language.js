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

const Webux = require("../index");

console.log(Webux.db.Language);

const french = async () => {
  // console.dir(Language);
  const language = new Webux.db.Language({
    language: "Français"
  });
  const languageCreated = await language.save();

  if (!languageCreated) {
    throw new Error("Language not created !");
  }

  return Promise.resolve('Default language "french" created.');
};

// const english = async () => {
//   await Language.create({
//     language: "English"
//   });

//   if (!languageCreated) {
//     throw new Error("Language not created !");
//   }

//   return Promise.resolve('Default language "english" created.');
// };

module.exports = Promise.all([french()]);
