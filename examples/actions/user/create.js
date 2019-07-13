// helper
const Webux = require("../../../index");
const { Create } = require("../../validations/user");

// action
const createUser = user => {
  return new Promise(async (resolve, reject) => {
    try {
      await Webux.isValid
        .Custom(Create)(user)
        .catch(e => {
          return reject(e); // returned a pre-formatted error
        });

      const userCreated = await Webux.db.User.create(user).catch(e => {
        return reject(Webux.errorHandler(422, e));
      });
      if (!userCreated) {
        return reject(Webux.errorHandler(422, "user not created"));
      }
      return resolve({
        msg: "Success !",
        user: userCreated
      });
    } catch (e) {
      throw e;
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await createUser(req.body.user);
    if (!obj) {
      return next(Webux.errorHandler(422, "User not created"));
    }
    return res.status(201).json(obj);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// socket with auth

const socket = client => {
  return async user => {
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await createUser(user);
      if (!obj) {
        client.emit("gotError", "User not created");
      }

      client.emit("userCreated", obj);
    } catch (e) {
      client.emit("gotError", e);
    }
  };
};

module.exports = {
  createUser,
  socket,
  route
};
