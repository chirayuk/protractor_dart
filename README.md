# Protractor for AngularDart

Write [Protractor](http://github.com/angular/protractor)
end-to-end tests against your AngularDart applications using
the Jasmine syntax.

This depends on a fork of Protractor
([protractor-dev](https://www.npmjs.org/package/protractor-dev))
and is available on [pub](https://pub.dartlang.org/packages/protractor).

## Running the demo
-   `npm install`
-   `pub install` (Do not forget this.)
-   Start a selenium server at `localhost:4444`.  Refer the [Protractor
    docs](https://github.com/angular/protractor/#appendix-a-setting-up-a-standalone-selenium-server)
    for help.
-   Start the test application server with `node app/expressserver.js`
-   Run the tests `./bin/protractor_dart test/conf.js`
