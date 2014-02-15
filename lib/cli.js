"use strict";

console.log("EXPERIMENTAL: protractor + protractor_demo for Dart.\nWork in progress. INCOMPLETE.\n");

if (process.argv.length != 3) {
  console.log("Usage: protractor_dart config_file");
  process.exit(2);
}

var configFile = process.argv[2];
configFile = require('path').resolve(process.cwd(), configFile);
require('./protractor.js').runSpecs(configFile).done();
