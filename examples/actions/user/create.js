// helper
const User = require("../../models/user");

// action
const createUser = body => {
  return new Promise(async (resolve, reject) => {
    if (!body) {
      return reject(new Error("Body is not present !"));
    }
    try {
      const userCreated = await User.create(body.user);
      if (!userCreated) {
        return reject(new Error("user not created"));
      }
      return resolve({
        msg: "Success !",
        user: {
          user: body.user
        }
      });
    } catch (e) {
      console.error(e);
      return reject(e);
    }
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await createUser(req.body);
    if (!obj) {
      return next(new Error("User not create."));
    }
    return res.status(201).json(obj);
  } catch (e) {
    console.error(e);
    next(e);
  }
};
// socket with auth

const socket = client => {
  return async body => {
    console.log("called !");
    try {
      if (!client.auth) {
        client.emit("unauthorized", { message: "Unauthorized" });
        return;
      }
      const obj = await createUser(body).catch(e => {
        client.emit("error", e);
      });
      if (!obj) {
        client.emit("error", "User not create");
      }

      client.emit("userCreated", obj);
    } catch (e) {
      client.emit("error", e);
    }
  };
};

module.exports = {
  createUser,
  socket,
  route
};
