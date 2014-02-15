# Protractor Dart DEMO

This is a work in progress to get
[Protractor](http://github.com/angular/protractor) support for Dart.
This demo demonstrates writing just the specs in Dart (only the Jasmine
syntax is supported.)

The goal is to eventually become a part of the main protractor
framework.  It is currently a wrapper around protractor and includes a
copy of the [protractor-demo](https://github.com/juliemr/protractor-demo)
with the spec file translated to Dart.

## Running the demo
-   `npm install`
-   `pub install` (Do not forget this.)
-   Start a selenium server at `localhost:4444`.  Refer the [Protractor
    docs](https://github.com/angular/protractor/#appendix-a-setting-up-a-standalone-selenium-server)
    for help.
-   Start the test application server with `node app/expresserver.js`
-   Run the tests `./bin/protractor_dart test/conf.js`
