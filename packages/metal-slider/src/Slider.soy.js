/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Slider.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Slider.
 * @public
 */

goog.module('Slider.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
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
  var $$temp;
  opt_data = opt_data || {};
  var maxNumber__soy3 = ($$temp = opt_data.max) == null ? 100 : $$temp;
  var minNumber__soy4 = ($$temp = opt_data.min) == null ? 0 : $$temp;
  var valueNumber__soy5 = ($$temp = opt_data.value) == null ? 0 : $$temp;
  ie_open('div', null, null,
      'class', 'slider ' + (($$temp = opt_data.elementClasses) == null ? '' : $$temp));
    ie_open('input', null, null,
        'name', ($$temp = opt_data.inputName) == null ? '' : $$temp,
        'type', 'hidden',
        'value', valueNumber__soy5);
    ie_close('input');
    ie_open('span');
      itext((goog.asserts.assert((valueNumber__soy5) != null), valueNumber__soy5));
    ie_close('span');
    var percentage__soy15 = 100 * (valueNumber__soy5 - minNumber__soy4) / (maxNumber__soy3 - minNumber__soy4) + '%';
    ie_open('div', null, null,
        'class', 'rail',
        'data-onmousedown', 'onRailMouseDown_');
      ie_void('div', null, null,
          'class', 'rail-active',
          'style', 'width: ' + percentage__soy15);
      ie_open('div', null, null,
          'class', 'rail-handle');
        ie_void('div', null, null,
            'class', 'handle',
            'tabindex', '0');
      ie_close('div');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Slider.render';
}

exports.render.params = ["elementClasses","inputName","max","min","value"];
templates = exports;
return exports;

});

class Slider extends Component {}
Soy.register(Slider, templates);
export default templates;
export { Slider, templates };
/* jshint ignore:end */
