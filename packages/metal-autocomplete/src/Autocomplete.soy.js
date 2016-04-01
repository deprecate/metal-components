/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Autocomplete.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Autocomplete.
 * @public
 */

goog.module('Autocomplete.incrementaldom');

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

var $templateAlias1 = Soy.getTemplate('List.incrementaldom', 'render');


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
      'class', 'autocomplete autocomplete-list component ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
    $templateAlias1({events: {itemSelected: opt_data.onListItemSelected_}, key: 'list'}, null, opt_ijData);
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Autocomplete.render';
}

exports.render.params = ["elementClasses","onListItemSelected_"];
templates = exports;
return exports;

});

class Autocomplete extends Component {}
Soy.register(Autocomplete, templates);
export default templates;
export { Autocomplete, templates };
/* jshint ignore:end */
