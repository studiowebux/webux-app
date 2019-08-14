// helper
const Webux = require("../../../index");

// action
const findUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const users = await Webux.db.User.find()
        .select(Webux.constants.user.select)
        .catch(e => {
          return reject(Webux.errorHandler(422, e));
        });
      if (!users || users.length === 0) {
        return reject(Webux.errorHandler(404, "users not found"));
      }

      return resolve({
        msg: "Success !",
        users: users
      });
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findUser();
    if (!obj) {
      return next(Webux.errorHandler(404, "User not found."));
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
      const obj = await findUser();
      if (!obj) {
        client.emit("gotError", "User not found");
      }

      client.emit("userFound", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  findUser,
  socket,
  route
};
