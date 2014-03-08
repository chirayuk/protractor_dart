var baseUrl = (process.env.NGDART_EXAMPLE_BASEURL ||
               'http://example.ngdart.localhost/');

exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  specs: [
    // 'ckck_spec.dart',
    'animation_spec.dart',
    'hello_world_spec.dart',
    'todo_spec.dart'
  ],

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'binary': '/Users/chirayu/scripts/dartium',
    }
  },

  baseUrl: baseUrl,

  jasmineNodeOpts: {
    // If true, display spec names.
    isVerbose: true,
    // If true, print colors to the terminal.
    showColors: true,
    // If true, include stack traces in failures.
    includeStackTrace: true,
    // Default time to wait in ms before a test fails.
    defaultTimeoutInterval: 15000
  },
};
