/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Alert.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Alert.
 * @public
 */

goog.module('Alert.incrementaldom');

var soy = goog.require('soy');
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'id', opt_data.id,
      'class', 'alert' + (opt_data.dismissible ? ' alert-dismissible' : '') + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''),
      'role', 'alert');
    if (opt_data.spinner) {
      ie_void('span', null, null,
          'class', 'alert-spinner' + (opt_data.spinnerClasses ? ' ' + opt_data.spinnerClasses : '') + (opt_data.spinnerDone ? ' alert-spinner-done' : ''));
    }
    ie_open('span', null, null,
        'class', 'alert-body');
      if (opt_data.body) {
        itext((goog.asserts.assert((opt_data.body) != null), opt_data.body));
      }
    ie_close('span');
    if (opt_data.dismissible) {
      ie_open('button', null, null,
          'type', 'button',
          'class', 'close',
          'aria-label', 'Close',
          'data-onclick', 'toggle');
        ie_open('span', null, null,
            'aria-hidden', 'true');
          itext('\u00D7');
        ie_close('span');
      ie_close('button');
    }
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Alert.render';
}

exports.render.params = ["body","dismissible","id","spinner","spinnerDone","elementClasses","spinnerClasses"];
templates = exports;
return exports;

});

class Alert extends Component {}
Soy.register(Alert, templates);
export default templates;
export { Alert, templates };
/* jshint ignore:end */
