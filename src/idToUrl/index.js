/**
 * File: index.js
 * Author: Tommy Gingras
 * Date: 2019-07-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

/**
 * Converts an ID to an URL
 * @param {String} id must be a id
 * @param {String} resource the module name
 * @param {String} endpoint optional endpoint, by default the value defined in the server will be used.
 * @returns {String} converted id to URL '/endpoint/resource/id'
 */

module.exports = function (id, resource, endpoint) {
  let _endpoint = endpoint || this.config.server.endpoint;
  return `${_endpoint}/${resource}/${id}`;
};
