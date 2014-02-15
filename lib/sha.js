"use strict";

var crypto = require("crypto");


function shaTextHexDigest() {
  var shasum = crypto.createHash('sha1');
  Array.prototype.slice.call(arguments).forEach(function(text) {
    if (text != null) {
      shasum.update(text);
    }
  });
  return shasum.digest('hex');
}


exports.shaTextHexDigest = shaTextHexDigest;
