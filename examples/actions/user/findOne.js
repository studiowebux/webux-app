// helper
const Webux = require("../../../index");

// action
const findOneUser = userID => {
  return new Promise(async (resolve, reject) => {
    try {
      await Webux.isValid
        .Custom(Webux.validators.user.MongoID, userID)
        .catch(e => {
          return reject(e);
        });
      const user = await Webux.db.User.findById(userID).catch(e => {
        return reject(Webux.errorHandler(422, e));
      });
      if (!user) {
        return reject(Webux.errorHandler(404, "user not found"));
      }

      return resolve({
        msg: "Success !",
        user: user
      });
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findOneUser(req.params.id);
    if (!obj) {
      return next(Webux.errorHandler(404, "User with ID not found."));
    }
    return res.status(200).json(obj);
  } catch (e) {
    next(e);
  }
};

// socket with auth

const socket = client => {
  return async userID => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await findOneUser(userID);
      if (!obj) {
        client.emit("gotError", "User with ID not found");
      }

      client.emit("userFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findOneUser,
  socket,
  route
};
