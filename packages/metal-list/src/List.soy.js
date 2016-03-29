/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from List.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace List.
 * @public
 */

goog.module('List.incrementaldom');

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
var $import1 = goog.require('ListItem.incrementaldom');
var $templateAlias1 = $import1.render;


/**
 * @param {{
 *    elementClasses: (?),
 *    items: (?),
 *    itemsHtml: (?soydata.SanitizedHtml|string|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  soy.asserts.assertType(opt_data.itemsHtml == null || (opt_data.itemsHtml instanceof Function) || (opt_data.itemsHtml instanceof soydata.UnsanitizedText) || goog.isString(opt_data.itemsHtml), 'itemsHtml', opt_data.itemsHtml, '?soydata.SanitizedHtml|string|undefined');
  var itemsHtml = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.itemsHtml);
  ie_open('div', null, null,
      'class', 'list' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
    ie_open('ul', null, null,
        'class', 'list-group',
        'data-onclick', 'handleClick');
      if (itemsHtml != null) {
        itemsHtml();
      } else {
        var itemList14 = opt_data.items;
        var itemListLen14 = itemList14.length;
        for (var itemIndex14 = 0; itemIndex14 < itemListLen14; itemIndex14++) {
          var itemData14 = itemList14[itemIndex14];
          $templateAlias1({index: itemIndex14, item: itemData14, key: '-items-' + itemIndex14}, null, opt_ijData);
        }
      }
    ie_close('ul');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'List.render';
}

exports.render.params = ["itemsHtml","elementClasses","items"];
templates = exports;
return exports;

});

class List extends Component {}
Soy.register(List, templates);
export default templates;
export { List, templates };
/* jshint ignore:end */
