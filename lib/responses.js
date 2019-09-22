const webuxResponse = require('webux-response');

function LoadResponses() {
  console.log(`\x1b[33mWebuxJS - Attach Custom express responses\x1b[0m`);
  webuxResponse(this.express);

  console.log(`\x1b[33mWebuxJS - Custom express responses Attached\x1b[0m`);
}

module.exports = LoadResponses;
