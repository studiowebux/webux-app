// █████╗  ██████╗████████╗██╗ ██████╗ ███╗   ██╗
// ██╔══██╗██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
// ███████║██║        ██║   ██║██║   ██║██╔██╗ ██║
// ██╔══██║██║        ██║   ██║██║   ██║██║╚██╗██║
// ██║  ██║╚██████╗   ██║   ██║╚██████╔╝██║ ╚████║
// ╚═╝  ╚═╝ ╚═════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝

/**
 * File: upload.js
 * Author: Tommy Gingras
 * Date: 2019-07-17
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

const Webux = require("../../../index");

// action
const upload = async (userID, filename) => {
  const userUpdated = await Webux.db.User.findByIdAndUpdate(
    userID,
    { profilePicture: filename },
    {
      new: true
    }
  ).catch(e => {
    throw Webux.errorHandler(422, e);
  });
  if (!userUpdated) {
    Webux.fileUpload.DeleteFile(filename);
    throw Webux.errorHandler(422, "user not updated");
  }
  return Promise.resolve(userUpdated);
};

// route
/**
 * @apiGroup User
 * @api {post} /api/v1/user/:id/picture Upload a picture for a specific user
 * @apiParam {string} id
 * @apiHeader {string} Content-Type multiuser/form-data
 * @apiParamExample {json} Request-Example:
 *  -- Content-Disposition: form-data; name="picture"; filename="../Downloads/puzzle-3223941_640.jpg --
 * @apiDescription Upload a picture for a specific user
 * @apiName Upload a picture for a specific user
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *       {
 *           "message": "",
 *           "devMessage": "",
 *           "success": true,
 *           "code": 200,
 *           "body": {
 *               "_id": "5d2fb7606df7688537f20b6d",
 *               "name": "User without categories",
 *               "description": "Something",
 *               "userID": "5d2fb7606df7688537f20b67",
 *               "statusID": "5d2fb7606df7688537f20b6a",
 *               "created_at": "2019-07-18T00:03:44.705Z",
 *               "updated_at": "2019-07-18T00:13:27.964Z",
 *               "__v": 0,
 *               "pictureURL": "/Documents/Studiowebux/framework/webuxjs/uploads/5d2fb7606df7688537f20b6d.png"
 *           }
 *       }
 */
const route = async (req, res, next) => {
  try {
    const filename = await Webux.fileUpload.PrepareFile(
      Webux.config.upload,
      req.files,
      req.params.id,
      "test"
    );

    if (!filename) {
      return next(Webux.errorHandler(422, "User with ID not updated."));
    }

    const userUpdated = await upload(req.params.id, filename);

    if (!userUpdated) {
      return next(Webux.errorHandler(422, "User with ID not updated."));
    }

    return res.updated(userUpdated);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  upload,
  route
};
