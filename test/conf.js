/**
 * Environment Variables affecting this config.
 * --------------------------------------------
 *
 * DARTIUM_BIN: The full path to the Dartium binary.
 *
 * NGDART_EXAMPLE_BASEURL: Overrides the default baseUrl to one of your
 *     choosing.  (The default is http://localhost:8080 which is the
 *     correct if you simply run "pub serve" inside the example folder
 *     of the AngularDart repo.)
 */

var env = process.env,
    fs = require('fs'),
    path = require('path');


function getBaseUrl() {
  if (env.NGDART_EXAMPLE_BASEURL) {
    return env.NGDART_EXAMPLE_BASEURL;
  } else if (env.USER == 'chirayu') {
    return 'http://example.ngdart.localhost';
  } else {
    // Default host:port when you run "pub serve" from the example
    // subdirectory of the AngularDart repo.
    return 'http://localhost:8080';
  }
}


function getDartiumBinary() {
  var ensure = function(condition) {
    if (!condition) throw "Unable to locate Dartium.  Please set the DARTIUM_BIN environment variable.";
  };

  // DARTIUM_BIN is set by scripts/env.sh for Travis.
  if (env.DARTIUM_BIN) {
    return env.DARTIUM_BIN;
  }
  var platform = require('os').platform();
  var DART_SDK = env.DART_SDK;
  if (DART_SDK) {
    // Locate the chromium directory as a sibling of the DART_SDK
    // directory.  (It's there if you unpacked the full Dart distribution.)
    var chromiumRoot = path.join(DART_SDK, "../chromium");
    ensure(fs.existsSync(chromiumRoot));
    var binary = path.join(chromiumRoot,
        (platform == 'darwin') ? 'Chromium.app/Contents/MacOS/Chromium' : 'chrome');
    ensure(fs.existsSync(binary));
    return binary;
  }
  // Last resort: Try the standard location on Macs for the AngularDart team.
  var binary = '/Applications/dart/chromium/Chromium.app/Contents/MacOS/Chromium';
  ensure(platform == 'darwin' && fs.existsSync(binary));
  return binary;
}


exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  specs: [
    'animation_spec.dart',
    'hello_world_spec.dart',
    'todo_spec.dart'
  ],

  splitTestsBetweenCapabilities: true,

  multiCapabilities: [{
    'browserName': 'chrome',
    'chromeOptions': {
      'binary': getDartiumBinary(),
    },
    count: 4
  }],

  baseUrl: getBaseUrl(),

  jasmineNodeOpts: {
    isVerbose: true, // display spec names.
    showColors: true, // print colors to the terminal.
    includeStackTrace: true, // include stack traces in failures.
    defaultTimeoutInterval: 15000 // wait time in ms before failing a test.
  },
};
