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
var $import1 = goog.require('Dropdown.incrementaldom');
var $templateAlias1 = $import1.render;


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
      'class', 'select component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''),
      'data-onkeydown', 'handleKeyDown_');
    var currSelectedIndex__soy8 = opt_data.selectedIndex != null ? opt_data.selectedIndex : opt_data.label || opt_data.items.length == 0 ? -1 : 0;
    ie_open('input', null, null,
        'type', 'hidden',
        'name', opt_data.hiddenInputName ? opt_data.hiddenInputName : '',
        'value', currSelectedIndex__soy8 == -1 ? '' : opt_data.items[currSelectedIndex__soy8]);
    ie_close('input');
    var param14 = function() {
      var itemList22 = opt_data.items;
      var itemListLen22 = itemList22.length;
      for (var itemIndex22 = 0; itemIndex22 < itemListLen22; itemIndex22++) {
        var itemData22 = itemList22[itemIndex22];
        ie_open('li', null, null,
            'data-onclick', opt_data.id + ':handleItemClick_',
            'class', 'select-option' + (currSelectedIndex__soy8 == itemIndex22 ? ' selected' : ''));
          ie_open('a', null, null,
              'href', 'javascript:;');
            itext((goog.asserts.assert((itemData22) != null), itemData22));
          ie_close('a');
        ie_close('li');
      }
    };
    var param25 = function() {
      ie_open('button', null, null,
          'class', opt_data.buttonClass + ' dropdown-select',
          'type', 'button',
          'data-onclick', 'toggle');
        var buttonLabel__soy29 = currSelectedIndex__soy8 == -1 ? opt_data.label : opt_data.items[currSelectedIndex__soy8];
        itext((goog.asserts.assert((buttonLabel__soy29 ? buttonLabel__soy29 : '') != null), buttonLabel__soy29 ? buttonLabel__soy29 : ''));
        itext(' ');
        ie_void('span', null, null,
            'class', opt_data.arrowClass ? opt_data.arrowClass : 'caret');
      ie_close('button');
    };
    $templateAlias1({body: param14, events: {stateSynced: opt_data.id + ':handleDropdownStateSynced_'}, header: param25, id: opt_data.id + '-dropdown'}, null, opt_ijData);
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Select.render';
}

exports.render.params = ["arrowClass","buttonClass","elementClasses","hiddenInputName","id","items","label","selectedIndex"];
templates = exports;
return exports;

});

class Select extends Component {}
Soy.register(Select, templates);
export default templates;
export { Select, templates };
/* jshint ignore:end */
