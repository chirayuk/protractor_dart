"use strict";

var Q = require('Q');
var assert = require('assert');
var path = require("path");
var protractor_runner = require('protractor/lib/runner.js');
var vm = require('vm');

// Local modules
var shaTextHexDigest = require('./sha').shaTextHexDigest;
var utils = require('./utils');
var newDart2JsRunner = require('./dart2js_runner').newDart2JsRunner;


function processProtractorConf(configFile, dart2JsRunner) {
  var config = require(configFile).config;
  var configPath = path.resolve(process.cwd(), configFile);
  var configDir = path.dirname(configPath);
  config.configDir = configDir;
  var specs = config.specs;
  var exclude = config.exclude;

  assert.equal((specs.framework || 'jasmine'), 'jasmine',
               'Only the jasmine test framework is currently supported.');

  // Resolve all spec patterns
  var specs = utils.resolveFilePatterns(configDir, config.specs);
  var exclude = utils.resolveFilePatterns(configDir, config.exclude, true);
  specs = specs.filter(function(path) { return exclude.indexOf(path) < 0; });

  // Replace each dart spec with the corresponding js spec.
  return Q.all(specs.map(dart2JsRunner.compileFile)).then(function(dartJsFiles) {
    console.log("Resolved dart spec files to JS:", dartJsFiles);
    config.exclude = [];
    config.specs = dartJsFiles;
    return config;
  });
}


// The generated JS files corresponding to the Dart files are also dependent on
// this codebase.  As an example, an earlier version fixed up some source map
// refs.  Another version introduced some bootstrap code, etc.  We make the SHA
// we use dependendant on our codebase by salting it with the SHA for our
// sourcecode.
function getShaSalt() {
  var shaDeps = [__filename,
                 __dirname + '/protractor_api.dart'];
  return shaTextHexDigest.apply(shaDeps.map(utils.readTextFile));
}


function runSpecs(protractorConfigFile) {
  // Required by dart2js machinery.
  global.DartObject = function(o) { this.o = o; };

  // Enable sourcemap support for stack traces.
  require('source-map-support').install();

  return newDart2JsRunner(getShaSalt()).then(function(dart2JsRunner) {
    return processProtractorConf(protractorConfigFile, dart2JsRunner)
      .then(function(config) {
        protractor_runner.addConfig(config);
        protractor_runner.runOnce();
      });
  });
}

exports.runSpecs = runSpecs;
