// helper
const timeout = ms => new Promise(res => setTimeout(res, ms));

// action
const findUser = () => {
  return new Promise(async (resolve, reject) => {
    console.log("Start the search of the entry");
    console.log("then wait 2 seconds");
    await timeout(2000);
    return resolve({ msg: "Success !" });
  });
};

// route
const route = async (req, res, next) => {
  try {
    const obj = await findUser();
    if (!obj) {
      return next(new Error("User not found."));
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
      const obj = await findUser().catch(e => {
        client.emit("error", e);
      });
      if (!obj) {
        client.emit("error", "User not found");
      }

      client.emit("userFound", obj);
    } catch (e) {
      client.emit("error", e);
    }
  };
};

module.exports = {
  findUser,
  socket,
  route
};
