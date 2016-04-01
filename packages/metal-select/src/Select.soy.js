/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Select.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Select.
 * @public
 */

goog.module('Select.incrementaldom');

var soy = goog.require('soy');
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;

var $templateAlias1 = Soy.getTemplate('Dropdown.incrementaldom', 'render');


/**
 * @param {{
 *    arrowClass: (?),
 *    buttonClass: (?),
 *    elementClasses: (?),
 *    handleDropdownStateSynced_: (?),
 *    handleItemClick_: (?),
 *    hiddenInputName: (?),
 *    items: (?),
 *    values: (?),
 *    selectedIndex: (?),
 *    label: (?soydata.SanitizedHtml|string|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  var $$temp;
  soy.asserts.assertType(opt_data.label == null || (opt_data.label instanceof Function) || (opt_data.label instanceof soydata.UnsanitizedText) || goog.isString(opt_data.label), 'label', opt_data.label, '?soydata.SanitizedHtml|string|undefined');
  var label = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.label);
  ie_open('div', null, null,
      'class', 'select' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''),
      'data-onkeydown', 'handleKeyDown_');
    var currSelectedIndex__soy6 = opt_data.selectedIndex != null ? opt_data.selectedIndex : label || opt_data.items.length == 0 ? -1 : 0;
    ie_open('input', null, null,
        'type', 'hidden',
        'name', opt_data.hiddenInputName ? opt_data.hiddenInputName : '',
        'value', currSelectedIndex__soy6 == -1 ? '' : opt_data.values ? opt_data.values[currSelectedIndex__soy6] : '');
    ie_close('input');
    var param12 = function() {
      var itemList21 = opt_data.items;
      var itemListLen21 = itemList21.length;
      for (var itemIndex21 = 0; itemIndex21 < itemListLen21; itemIndex21++) {
        var itemData21 = itemList21[itemIndex21];
        ie_open('li', null, null,
            'data-onclick', ($$temp = opt_data.handleItemClick_) == null ? '' : $$temp,
            'class', 'select-option' + (currSelectedIndex__soy6 == itemIndex21 ? ' selected' : ''));
          ie_open('a', null, null,
              'href', 'javascript:;');
            $renderAsHtml_({value: itemData21}, null, opt_ijData);
          ie_close('a');
        ie_close('li');
      }
    };
    var param24 = function() {
      ie_open('button', null, null,
          'class', (opt_data.buttonClass ? opt_data.buttonClass : '') + ' dropdown-select',
          'type', 'button',
          'data-onclick', 'toggle');
        if (currSelectedIndex__soy6 == -1) {
          if (label) {
            label();
          }
        } else {
          $renderAsHtml_({value: opt_data.items[currSelectedIndex__soy6]}, null, opt_ijData);
        }
        itext(' ');
        ie_void('span', null, null,
            'class', opt_data.arrowClass ? opt_data.arrowClass : 'caret');
      ie_close('button');
    };
    $templateAlias1({body: param12, events: {stateSynced: opt_data.handleDropdownStateSynced_}, header: param24, key: 'dropdown'}, null, opt_ijData);
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Select.render';
}


/**
 * @param {{
 *    value: (!soydata.SanitizedHtml|string)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $renderAsHtml_(opt_data, opt_ignored, opt_ijData) {
  soy.asserts.assertType((opt_data.value instanceof Function) || (opt_data.value instanceof soydata.UnsanitizedText) || goog.isString(opt_data.value), 'value', opt_data.value, 'Function');
  var value = /** @type {Function} */ (opt_data.value);
  value();
}
exports.renderAsHtml_ = $renderAsHtml_;
if (goog.DEBUG) {
  $renderAsHtml_.soyTemplateName = 'Select.renderAsHtml_';
}

exports.render.params = ["label","arrowClass","buttonClass","elementClasses","handleDropdownStateSynced_","handleItemClick_","hiddenInputName","items","values","selectedIndex"];
exports.renderAsHtml_.params = ["value"];
templates = exports;
return exports;

});

class Select extends Component {}
Soy.register(Select, templates);
export default templates;
export { Select, templates };
/* jshint ignore:end */
