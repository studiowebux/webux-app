// helper
const timeout = ms => new Promise(res => setTimeout(res, ms));

// action
const removeOneUser = userID => {
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
    const obj = await removeOneUser(req.params.id);
    if (!obj) {
      return next(new Error("User with ID not deleted."));
    }
    return res.status(204).json(obj);
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
      const obj = await removeOneUser(userID).catch(e => {
        client.emit("error", e);
      });
      if (!obj) {
        client.emit("error", "User with ID not deleted");
      }

      client.emit("userDeleted", obj);
    } catch (e) {
      client.emit("error", e);
    }
  };
};

module.exports = {
  removeOneUser,
  socket,
  route
};
