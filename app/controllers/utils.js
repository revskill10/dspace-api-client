'use strict';

(function () {

  var config = require('../../config/environment');


  /**
   * Checks for dspace token in the current session and
   * returns token if present.
   * @param session the Express session object
   * @returns {*} token or empty string
   */
  exports.getDspaceToken = function (session) {

    var dspaceTokenHeader;

    if ('getDspaceToken' in session) {
      dspaceTokenHeader = session.getDspaceToken;
    } else {
      dspaceTokenHeader = '';
    }
        console.log('util ' + dspaceTokenHeader);
    return dspaceTokenHeader;
  };

  /**
   * Sets response header and sends json.
   * @param res  the Express response object
   * @param json   data to return
     */
  exports.jsonResponse = function (res, json) {

    // Set custom response header.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json(json);

  };

  /**
   * Removes the dspace token from the current session if
   * the token is present.
   * @param session  the Express session object
     */
  exports.removeDspaceSession = function (session) {

       if ('dspaceToken' in session) {
          delete session.getDspaceToken;

       }
  };

  /**
   * Returns fully qualified URL for the host and port (from configuration).
   * @returns {string}
     */
  exports.getURL = function() {
    return config.dspace.protocol + '://' + config.dspace.host + ':' + config.dspace.port;
  };


    /**
     * Returns the host name from configuration.
     * @returns {*}
     */
  exports.getHost = function() {
    return config.dspace.host;
  };

  /**
   * Returns the host port from configuration.
   * @returns {number|*}
     */
  exports.getPort = function() {
    return config.dspace.port;
  }

})();
