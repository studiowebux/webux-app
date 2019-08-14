const path = require("path");
module.exports = {
  resources: [
    { path: "/assets", resource: path.join(__dirname, "..", "assets") }
  ]
};
