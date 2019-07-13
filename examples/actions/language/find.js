// helper
const Webux = require("../../../index");

// action
const findLanguage = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const languages = await Webux.db.Language.find().catch(e => {
        return reject(Webux.errorHandler(422, e));
      });
      if (!languages || languages.length === 0) {
        return reject(Webux.errorHandler(404, "languages not found"));
      }
      return resolve({
        msg: "Success !",
        languages: languages
      });
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findLanguage();
    if (!obj) {
      return next(Webux.errorHandler(404, "Language not found."));
    }
    return res.status(200).json(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async () => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findLanguage();
      if (!obj) {
        client.emit("gotError", "Language not found");
      }

      client.emit("languageFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findLanguage,
  socket,
  route
};
