import 'dart:html';
import 'package:js/js.dart';
import '../lib/protractor_api.dart';

main() {
  describe('ckck_spec', () {
    var ptor;

    beforeEach(() {
      ptor = protractor.getInstance();
    });

    afterEach(() {
      browser.manage().logs().get('browser').then((log) {
        console.warn.apply(null, log);
      });
    });


    it('CKCK', () {
      ckckTest() {
        // ptor.debugger();
        // browser.pause();
        protractor.promise.controlFlow().execute(() {
          var nameByModel = element(by.model('ctrl.name'));
          var nameByBinding = element(by.binding('ctrl.name'));

          expect(nameByModel.getAttribute('value')).toEqual('Alice');
          expect(nameByBinding.getText()).toEqual('Alice');

          nameByModel.clear();
          nameByModel.sendKeys('Jane Doe');

          expect(nameByModel.getAttribute('value')).toEqual('Jane Doe');
          expect(nameByBinding.getText()).toEqual('Jane Doe');
        });
      }

      protractor.promise.controlFlow().execute(() {
        // ptor.debugger();
        // browser.pause();
        ptor.get('http://play.localhost/webdev/dart/angular/test_protractor/web/');
        ckckTest();
      });

    });

  });
}
