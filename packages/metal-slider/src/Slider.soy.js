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
      'class', 'slider component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
    ie_open('input', null, null,
        'name', opt_data.inputName ? opt_data.inputName : opt_data.id,
        'type', 'hidden',
        'value', opt_data.value);
    ie_close('input');
    ie_open('span');
      itext((goog.asserts.assert((opt_data.value) != null), opt_data.value));
    ie_close('span');
    var percentage__soy14 = 100 * (opt_data.value - opt_data.min) / (opt_data.max - opt_data.min) + '%';
    ie_open('div', null, null,
        'class', 'rail',
        'data-onmousedown', 'onRailMouseDown_');
      ie_void('div', null, null,
          'class', 'rail-active',
          'style', 'width: ' + percentage__soy14);
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

exports.render.params = ["elementClasses","id","inputName","max","min","value"];
templates = exports;
return exports;

});

class Slider extends Component {}
Soy.register(Slider, templates);
export default templates;
export { Slider, templates };
/* jshint ignore:end */
