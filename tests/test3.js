const {Webux} = require('../index');

Webux.log.info("This is a test with AppendConfiguration")

const options = {
    availables: ["fr", "en"],
    directory: "locales",
    default: "en",
    autoReload: true,
    syncFiles: true
};

Webux.AppendConfiguration("language", options);


console.log("Console log Webux.config : ")
console.log(Webux.config);

console.log("Console log Webux.config.language : ")
console.log(Webux.config.language);