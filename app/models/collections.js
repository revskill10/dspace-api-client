'use strict';

var rp = require('request-promise');
var utils = require('../controllers/utils');

(function () {

  /**
   * Model for requesting an individual dspace collection.
   */
  module.exports = function (id, session) {

    var dspaceTokenHeader = utils.getDspaceToken(session);
    var host = utils.getURL();

    /** DSpace collection request-promise */
    var collectionRequest =
      rp(
        {
          /** From API documentation: limit and offset params can be used for
           * paging (current default 100 */
          url: host + '/rest/collections/' + id + '?expand=items,logo,parentCommunity',
          method: 'GET',
          headers: {
            'User-Agent': 'Request-Promise',
            'rest-dspace-token': dspaceTokenHeader
          },
          json: true,
          transform: processResult
        }
      );

    return collectionRequest;

  };

  /**
   * Construct the json object that describes a collection.
   * @param json the DSpace API response
   */
  function processResult(json) {


    var ret = {};
    ret.id = json.id;
    ret.parentCommunity = [];
    var parent = {};
    parent.name = json.parentCommunity.name;
    parent.id = json.parentCommunity.id;
    parent.handle = json.parentCommunity.handle;
    ret.parentCommunity = parent;
    ret.name = json.name;
    ret.handle = json.handle;
    ret.type = json.type;
    var logo = {};
    if (json.logo !== null) {
      logo.id = json.logo.id;
      logo.retrieveLink = json.logo.retrieveLink;
      logo.sizeBytes = json.logo.sizeBytes;
      logo.mimeType = json.logo.mimeType;
    }
    ret.logo = logo;
    var items = [];
    for (var i = 0; i < json.items.length; i++) {
      var tmp = {};
      tmp.id = json.items[i].id;
      tmp.name = json.items[i].name;
      tmp.handle = json.items[i].handle;
      tmp.type = json.items[i].type;
      tmp.link = json.items[i].link;
      tmp.withdrawn = json.items[i].withdrawn;
      tmp.archived = json.items[i].archived;
      items[i] = tmp;
    }
    ret.items = items;

    return ret;
  }

})();
