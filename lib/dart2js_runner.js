"use strict";

var assert = require("assert");
var fs = require('fs');
var utils = require('./utils');
var shaTextHexDigest = require('./sha').shaTextHexDigest;


// Locate a command on PATH.
function locateCmdOnPath(command) {
  return utils.execFile('/usr/bin/which', [command]).then(function(stdout) {
    return stdout.trim();
  });
}


function locateDart2Js() {
  return locateCmdOnPath('dart2js').then(function(dart2JsBin) {
    if (dart2JsBin != null) {
      return dart2JsBin;
    }
    var DART_SDK = process.env['DART_SDK'];
    if (DART_SDK != null) {
      dart2JsBin = path.join(DART_SDK, 'bin/dart2js');
      if (fs.existsSync(dart2JsBin)) {
        return dart2JsBin;
      }
    }
    // AngularDart team's location.
    dart2JsBin = '/Applications/dart/dart-sdk/bin/dart2js';
    if (fs.existsSync(dart2JsBin)) {
      return dart2JsBin;
    }
    throw new Error("Could not locate dart2js");
  });
}

function Dart2JsRunner(salt, dart2JsBin) {
  this.salt = salt;
  this.dart2JsBin = dart2JsBin;
  this.compileFile = this.compileFile.bind(this);
}


// We place the .dart.js and source map files alongside the .dart files.  While
// there's some benefit to using an alternate cache directory outside the
// source folder, it means that we would then have to manually fix up the
// source map locations in the JS files.  It's easily done (either by fixing up
// the JS file or overriding retrieveSourceMap, I'm not yet convinced of the
// benefits.
Dart2JsRunner.prototype.compileFile = function compileFile(dartFile) {
  assert.ok(/.+\.dart$/.test(dartFile));
  var fileSHA = shaTextHexDigest(this.salt, utils.readTextFile(dartFile));
  var dartJsFile = dartFile.replace(/\.dart$/, "." + fileSHA + ".dart.js");
  if (fs.existsSync(dartJsFile)) {
    return dartJsFile;
  } else {
    console.log("Running dart2js for:", dartFile);
    return utils.execFile(this.dart2JsBin, [dartFile, "-c", "-o", dartJsFile])
        .thenResolve(dartJsFile);
  }
}


function newDart2JsRunner(salt) {
  return locateDart2Js().then(function(dart2JsBin) {
    return new Dart2JsRunner(salt, dart2JsBin);
  });
}


exports.newDart2JsRunner = newDart2JsRunner;
