// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: download.js
 * Author: Tommy Gingras
 * Date: 2019-07-17
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("../../../index");
const path = require("path");

// action
const download = async userID => {
  const user = await Webux.db.User.findOne(
    { _id: userID },
    "_id profilePicture"
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!user) {
    throw Webux.errorHandler(422, "user not found");
  }
  return Promise.resolve(user.profilePicture);
};

// route
/**
 * @apiGroup User
 * @api {get} /api/v1/user/:id/picture For a specific User get its picture
 * @apiParam {string} id
 * @apiDescription For a specific User get its picture
 * @apiName For a specific User get its picture
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *      -- A picture --
 **/
const route = async (req, res, next) => {
  try {
    const profilePicture = await download(req.params.id);

    if (!profilePicture) {
      return next(Webux.errorHandler(422, "No image found."));
    }

    return res.sendFile(path.resolve(profilePicture), err => {
      if (err) {
        return next(Webux.errorHandler(404, "GET_PART_PICTURE_ERROR"));
      }
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  download,
  route
};
