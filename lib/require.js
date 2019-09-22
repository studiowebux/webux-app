const webuxLogger = require("webux-logger");
const { onRequest, onResponse } = require("webux-logging");
const { init, i18n } = require("webux-language");

/**
 * It will loads all the .js file into the this.config variable
 * @param {String} path Absolute path of all the configuration files
 */
function LoadConfiguration(path) {
  console.log(`\x1b[33mWebuxJS - Load configuration\x1b[0m`);
  this.webuxLoader(path, this.config);
}

function InitLogger() {
  console.log(`\x1b[33mWebuxJS - Create Logger\x1b[0m`);
  this.log = webuxLogger(this.config.logger);
}

function OnRequest() {
  console.log(`\x1b[33mWebuxJS - On request\x1b[0m`);
  onRequest(this.config.request, this.app, this.log);
}

function OnResponse() {
  console.log(`\x1b[33mWebuxJS - On response\x1b[0m`);
  onResponse(this.config.response, this.app, this.log);
}

function LoadLanguage() {
  console.log(`\x1b[33mWebuxJS - Load language\x1b[0m`);
  this.i18n = i18n;
  init(this.config.language, this.app, this.log);
}

function OnSocket() {
  console.log(`\x1b[33mWebuxJS - Start Socket Server\x1b[0m`);
  this.socket.listen(this.server, this.config.socket.options);
}

module.exports = {
  LoadConfiguration,
  InitLogger,
  OnRequest,
  OnResponse,
  LoadLanguage,
  OnSocket
};
