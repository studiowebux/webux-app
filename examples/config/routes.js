const Validator = require("webux-validator");
const Query = require("webux-query");
const user = require("../validations/user");
const _user = require("../constants/user");

module.exports = {
  "/user": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [Query(_user.blacklist, _user.select)],
          action: require(__dirname + "/../actions/user/find").route
        },
        {
          method: "post",
          middlewares: [Validator.Body(user.Create)],
          action: require(__dirname + "/../actions/user/create").route
        }
      ],
      "/:id": [
        {
          method: "get",
          middlewares: [],
          action: require(__dirname + "/../actions/user/findOne").route
        },
        {
          method: "put",
          middlewares: [],
          action: require(__dirname + "/../actions/user/update").route
        },
        {
          method: "delete",
          middlewares: [],
          action: require(__dirname + "/../actions/user/remove").route
        }
      ]
    }
  },
  "/config": {
    resources: {
      "/": [
        {
          method: "get",
          middlewares: [],
          action: (req, res, next) => {
            return res.success(this.config);
          }
        }
      ]
    }
  }
};
