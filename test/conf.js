// Tests for the calculator.
exports.config = {
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',

  specs: [
    'spec.dart'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8888',
};
