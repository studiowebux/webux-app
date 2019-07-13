const { LoadApp } = require("./test3");
const WebuxCore = require("../index");

try {
  // Create app
  const Webux = new WebuxCore();
  LoadApp(Webux);

  module.exports = Webux;
} catch (e) {
  process.exit(1);
}
