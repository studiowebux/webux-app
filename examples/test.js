const options = {
  logger: {
    application_id: "Test01",
    forceConsole: true,
    logstash: {
      host: "127.0.0.1",
      port: "5000" // udp only !
    },
    filenames: {
      error: "log/error.log"
    },
    blacklist: ["password"]
  }
};

const WebuxCore = require("../index");

const Webux = new WebuxCore();

console.log(Webux.log);

Webux.log.info("This is a test with a global variable !");

Webux.app.get("/", (req, res) => {
  return res.success();
});

Webux.app.listen(1337);
