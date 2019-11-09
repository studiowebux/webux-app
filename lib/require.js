const webuxLogger = require("@studiowebux/logger");
const { onRequest, onResponse } = require("@studiowebux/logging");
const { init, i18n } = require("@studiowebux/language");

/**
 * It will loads all the .js file into the this.config variable
 * @param {String} path Absolute path of all the configuration files
 */
function LoadConfiguration(path) {
  this.log.info(`\x1b[33mWebuxJS - Load configuration\x1b[0m`);
  this.webuxLoader(path, this.config);
}

function InitLogger() {
  this.log.info(`\x1b[33mWebuxJS - Create Logger\x1b[0m`);
  this.log = webuxLogger(this.config.logger);
}

function OnRequest() {
  this.log.info(`\x1b[33mWebuxJS - On request\x1b[0m`);
  onRequest(this.config.request, this.app, this.log);
}

function OnResponse() {
  this.log.info(`\x1b[33mWebuxJS - On response\x1b[0m`);
  onResponse(this.config.response, this.app, this.log);
}

function LoadLanguage() {
  this.log.info(`\x1b[33mWebuxJS - Load language\x1b[0m`);
  this.i18n = i18n;
  init(this.config.language, this.app, this.log);
}

module.exports = {
  LoadConfiguration,
  InitLogger,
  OnRequest,
  OnResponse,
  LoadLanguage
};
