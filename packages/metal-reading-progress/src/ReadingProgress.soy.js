/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from ReadingProgress.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ReadingProgress.
 * @public
 */

goog.module('ReadingProgress.incrementaldom');

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
  ie_open('div', null, null,
      'class', 'reading-progress' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''));
    ie_open('ul');
      var itemList8 = opt_data.items;
      var itemListLen8 = itemList8.length;
      for (var itemIndex8 = 0; itemIndex8 < itemListLen8; itemIndex8++) {
        var itemData8 = itemList8[itemIndex8];
        $item({item: itemData8}, null, opt_ijData);
      }
    ie_close('ul');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'ReadingProgress.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $item(opt_data, opt_ignored, opt_ijData) {
  ie_open('li');
    ie_open('a', null, null,
        'href', opt_data.item.href);
      if (opt_data.item.title) {
        ie_open('span', null, null,
            'class', 'reading-title');
          itext((goog.asserts.assert((opt_data.item.title) != null), opt_data.item.title));
        ie_close('span');
      }
      if (opt_data.item.time) {
        ie_open('span', null, null,
            'class', 'reading-subtitle');
          itext((goog.asserts.assert((opt_data.item.time < 60 ? opt_data.item.time + ' sec read' : Math.round(opt_data.item.time / 60) + ' min read') != null), opt_data.item.time < 60 ? opt_data.item.time + ' sec read' : Math.round(opt_data.item.time / 60) + ' min read'));
        ie_close('span');
      }
      ie_open('svg', null, null,
          'x', '0px',
          'y', '0px',
          'width', '36px',
          'height', '36px',
          'viewBox', '0 0 36 36');
        ie_void('circle', null, null,
            'fill', 'none',
            'stroke-width', '2',
            'cx', '18',
            'cy', '18',
            'r', '16',
            'stroke-dasharray', '100 100',
            'transform', 'rotate(-90 18 18)');
      ie_close('svg');
    ie_close('a');
  ie_close('li');
}
exports.item = $item;
if (goog.DEBUG) {
  $item.soyTemplateName = 'ReadingProgress.item';
}

exports.render.params = ["elementClasses","items"];
exports.render.types = {"elementClasses":"any","items":"any"};
exports.item.params = ["item"];
exports.item.types = {"item":"any"};
templates = exports;
return exports;

});

class ReadingProgress extends Component {}
Soy.register(ReadingProgress, templates);
export { ReadingProgress, templates };
export default templates;
/* jshint ignore:end */