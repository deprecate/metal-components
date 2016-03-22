/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from ProgressBar.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ProgressBar.
 * @public
 */

goog.module('ProgressBar.incrementaldom');

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
  var curMax__soy3 = opt_data.max ? opt_data.max : 100;
  var curMin__soy4 = opt_data.min ? opt_data.min : 0;
  var curValue__soy5 = opt_data.value ? opt_data.value : 0;
  ie_open('div', null, null,
      'id', opt_data.id,
      'class', 'progress ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''),
      'role', 'progressbar',
      'aria-valuemax', curMax__soy3,
      'aria-valuemin', curMin__soy4,
      'aria-valuenow', curValue__soy5,
      'tabindex', '0');
    var percentage__soy17 = Math.floor((curValue__soy5 - curMin__soy4) * 100 / (curMax__soy3 - curMin__soy4));
    ie_open('div', null, null,
        'class', 'progress-bar' + (opt_data.barClass ? ' ' + opt_data.barClass : ''),
        'style', 'width: ' + percentage__soy17 + '%');
      itext((goog.asserts.assert((opt_data.label ? opt_data.label : '') != null), opt_data.label ? opt_data.label : ''));
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'ProgressBar.render';
}

exports.render.params = ["barClass","elementClasses","id","label","max","min","value"];
templates = exports;
return exports;

});

class ProgressBar extends Component {}
Soy.register(ProgressBar, templates);
export default templates;
export { ProgressBar, templates };
/* jshint ignore:end */
