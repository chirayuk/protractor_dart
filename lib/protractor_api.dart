import 'dart:mirrors';
import 'dart:js' as js;
import 'package:js/js.dart';

// Protractor exports.
var browser = context.browser;
var element = context.element;
var by = context.by;
var protractor = context.protractor;
var console = context.console;
// '$' is not a valid Dart identifier so we don't export it for now.

// Jasmine exports.
// grep:
//   https://github.com/juliemr/minijasminenode/blob/master/lib/jasmine-1.3.1.js
//   for 'exports.'
var jasmine = context.jasmine;
spyOn(obj, methodName) => context.spyOn(obj, methodName);
it(desc, func) => context.it(desc, ([optDone]) => func());
iit(desc, func) => context.iit(desc, ([optDone]) => func()));
xit(desc, func) => context.xit(desc, ([optDone]) => func()));
expect(actual) => context.expect(actual);
because(x) => context.because(x);
runs(func) => context.runs(func);
waits(timeout) => context.waits(timeout);
waitsFor(latchFunction, optional_timeoutMessage, optional_timeout) =>
    context.waitsFor(latchFunction, optional_timeoutMessage, optional_timeout);
beforeEach(beforeEachFunction) => context.beforeEach(([optDone]) => beforeEachFunction());
afterEach(afterEachFunction) => context.afterEach(([optDone]) => afterEachFunction());
describe(description, specDefinitions) =>
    context.describe(description, specDefinitions);
ddescribe(description, specDefinitions) =>
    context.ddescribe(description, specDefinitions);
xdescribe(description, specDefinitions) =>
    context.xdescribe(description, specDefinitions);


// HACK(chirayu): The js:Proxy object doesn't handle array
//                indexing so we provide this helper.  :(
toDartArray(var arr) {
  List result = new List(arr.length);
  arr.forEach((value, key, obj) => result[key] = value);
  return result;
}
