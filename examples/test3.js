const WebuxCore = require("../index");
const path = require("path");

async function LoadApp() {
  // Create app
  const Webux = await new WebuxCore();

  // Load configuration
  await Webux.LoadConfiguration(path.join(__dirname, "config"));

  // Create logger
  await Webux.CreateLogger();

  // load default values
  await Webux.LoadSeed();

  // request logger
  await Webux.OnRequest();

  // Load security
  await Webux.LoadSecurity();

  // Load Language
  await Webux.LoadLanguage();

  // Create Limiter
  await Webux.CreateLimiter();

  // routes
  await Webux.CreateRoutes();

  // Webux.app.use(Webux.router);

  // await Webux.app.get("/lang", (req, res) => {
  //   Webux.log.info("Language getter");
  //   return res.success(
  //     {},
  //     Webux.i18n.getLocale(),
  //     "Return the actual language used by the backend for this request."
  //   );
  // });

  // await Webux.app.get("/errored", (req, res, next) => {
  //   Webux.log.info("Throw an error");
  //   return next(
  //     Webux.errorHandler(
  //       500,
  //       "Return an error.",
  //       { route: req.url },
  //       "THis is critical !"
  //     )
  //   );
  // });

  // await Webux.app.post("/create", (req, res, next) => {
  //   return res.created(
  //     {
  //       fullname: "tommy",
  //       NAS: "1234567889",
  //       activated: true,
  //       createdAt: "now"
  //     },
  //     "",
  //     "Resource created !"
  //   );
  // });

  // await Webux.app.get("/config", (req, res, next) => {
  //   return res.success(Webux.config);
  // });

  // await Webux.app.get("/", (req, res) => {
  //   Webux.log.info("Hello World !");
  //   return res.success({ msg: "Bonjour !" });
  // });

  // sockets
  await Webux.CreateSockets();

  // error handling
  await Webux.GlobalErrorHandler();

  // start server
  await Webux.StartServer();

  // start sockets
  await Webux.StartSocket();
}

module.exports = LoadApp;
