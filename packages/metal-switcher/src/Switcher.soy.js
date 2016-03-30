/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Switcher.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Switcher.
 * @public
 */

goog.module('Switcher.incrementaldom');

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
  opt_data = opt_data || {};
  ie_open('div', null, null,
      'class', 'switcher' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + (opt_data.checked ? ' switcher-on' : ''),
      'data-onclick', 'handleClick');
    ie_open('div', null, null,
        'class', 'switcher-control');
      ie_void('div', null, null,
          'class', 'switcher-control-icon');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Switcher.render';
}

exports.render.params = ["checked","elementClasses"];
templates = exports;
return exports;

});

class Switcher extends Component {}
Soy.register(Switcher, templates);
export default templates;
export { Switcher, templates };
/* jshint ignore:end */
