# Protractor for AngularDart

Write [Protractor](http://github.com/angular/protractor)
end-to-end tests against your AngularDart applications using
the Jasmine syntax.

Your Dart could would depend on the [protractor](https://pub.dartlang.org/packages/protractor)
pub package.  For the runner, you would depend on the
[protractor-dart](https://www.npmjs.org/package/protractor-dart)
npm package.  You should depend on the same version number
of both packages to keep the Dart and the JS code in sync. 
(FYI, [protractor-dart](https://www.npmjs.org/package/protractor-dart)
internally depends on a depends a fork of Protractor,
[protractor-dart](https://www.npmjs.org/package/protractor-dart))

## Running the demo
-   `npm install`
-   `pub install` (Do not forget this.)
-   Start a selenium server at `localhost:4444`.  Refer the [Protractor
    docs](https://github.com/angular/protractor/#appendix-a-setting-up-a-standalone-selenium-server)
    for help.
-   Start the test application server with `node app/expressserver.js`
-   Run the tests `./bin/protractor_dart test/conf.js`
