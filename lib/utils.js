"use strict";

var Q = require('Q');
var child_process = require('child_process');
var fs = require('fs');
var glob = require('glob');
var path = require("path");
var util = require('util');


function execFile(command, args) {
  var deferred = Q.defer();
  child_process.execFile(command, args, function(error, stdout, stderr) {
    if (error == null) {
      deferred.resolve(stdout.toString());
    } else {
      deferred.reject(error);
    }
  });
  return deferred.promise;
}


function readTextFile(fname) {
  return fs.readFileSync(fname, 'utf8');
}


// Copied from https://github.com/angular/protractor/blob/6bc5e2945a13867ac3106bde2b787d3546ec2f5c/lib/runner.js#L227
function resolveFilePatterns (baseDir, patterns, opt_omitWarnings) {
  var resolvedFiles = [];

  if (patterns) {
    for (var i = 0; i < patterns.length; ++i) {
      var matches = glob.sync(patterns[i], {cwd: baseDir});
      if (!matches.length && !opt_omitWarnings) {
        util.puts('Warning: pattern ' + patterns[i] + ' did not match any files.');
      }
      for (var j = 0; j < matches.length; ++j) {
        resolvedFiles.push(path.resolve(baseDir, matches[j]));
      }
    }
  }
  return resolvedFiles;
};


exports.execFile = execFile;
exports.readTextFile = readTextFile;
exports.resolveFilePatterns = resolveFilePatterns;
