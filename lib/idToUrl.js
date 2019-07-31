// ██╗  ██╗███████╗██╗     ██████╗ ███████╗██████╗
// ██║  ██║██╔════╝██║     ██╔══██╗██╔════╝██╔══██╗
// ███████║█████╗  ██║     ██████╔╝█████╗  ██████╔╝
// ██╔══██║██╔══╝  ██║     ██╔═══╝ ██╔══╝  ██╔══██╗
// ██║  ██║███████╗███████╗██║     ███████╗██║  ██║
// ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     ╚══════╝╚═╝  ╚═╝

/**
 * File: idToUrl.js
 * Author: Tommy Gingras
 * Date: 2019-07-31
 * License: All rights reserved Studio Webux S.E.N.C 2015-Present
 */

"use strict";

/**
 * Convert an ID to URL
 * @param {String} id must be a id
 * @param {String} resource the module name
 * @returns {String} converted id to URL
 */

module.exports = function(id, resource) {
  return `${this.config.server.endpoint}/${resource}/${id}`;
};
