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
it(desc, func) => context.it(desc, func);
iit(desc, func) => context.iit(desc, func);
xit(desc, func) => context.xit(desc, func);
expect(actual) => context.expect(actual);
because(x) => context.because(x);
runs(func) => context.runs(func);
waits(timeout) => context.waits(timeout);
waitsFor(latchFunction, optional_timeoutMessage, optional_timeout) =>
    context.waitsFor(latchFunction, optional_timeoutMessage, optional_timeout);
beforeEach(beforeEachFunction) => context.beforeEach(beforeEachFunction);
afterEach(afterEachFunction) => context.afterEach(afterEachFunction);
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


var ckck_log = (() {
  const X = const Object();
  return (o1, [o2=X, o3=X, o4=X, o5=X, o6=X, o7=X, o8=X, o9=X, o10=X, o11=X, o12=X, o13=X, o14=X]) {
    var args = [o1, o2, o3, o4, o5, o6, o7, o8, o9, o10, o11, o12, o13, o14];
    while (args.length > 0 && identical(args.last, X)) {
      args.removeLast();
    }
    Function.apply(context.protractor.ckck_log, args);
  };
})();

