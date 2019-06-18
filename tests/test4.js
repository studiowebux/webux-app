const Webux = require("../index")();

Webux.CreateLogger();

Webux.app.get("/", (req, res) => {
  Webux.log.info("/ is accessible");
  res.success("Bonjour !");
});

Webux.app.use("/", (req, res) => {
  Webux.log.warn("Page not found");
  res.notFound("Page not Found");
});

Webux.app.listen(1337);
