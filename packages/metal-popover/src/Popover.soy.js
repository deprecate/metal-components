/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Popover.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Popover.
 * @public
 */

goog.module('Popover.incrementaldom');

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


/**
 * @param {{
 *    alignedPosition: (?),
 *    content: (?),
 *    elementClasses: (?),
 *    position: (?),
 *    title: (?soydata.SanitizedHtml|string|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  soy.asserts.assertType(opt_data.title == null || (opt_data.title instanceof Function) || (opt_data.title instanceof soydata.UnsanitizedText) || goog.isString(opt_data.title), 'title', opt_data.title, '?soydata.SanitizedHtml|string|undefined');
  var title = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.title);
  var positionClasses__soy3 = ['top', 'top', 'right', 'bottom', 'bottom', 'bottom', 'left', 'top'];
  var currentPosition__soy4 = opt_data.alignedPosition != null ? opt_data.alignedPosition : opt_data.position;
  var positionClass__soy5 = currentPosition__soy4 != null ? positionClasses__soy3[currentPosition__soy4] : 'bottom';
  ie_open('div', null, null,
      'class', 'popover ' + positionClass__soy5 + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''),
      'role', 'tooltip');
    ie_void('div', null, null,
        'class', 'arrow');
    ie_open('h3', null, null,
        'class', 'popover-title' + (title ? '' : ' hidden'));
      if (title) {
        title();
      }
    ie_close('h3');
    ie_open('div', null, null,
        'class', 'popover-content');
      ie_open('p');
        itext((goog.asserts.assert((opt_data.content ? opt_data.content : '') != null), opt_data.content ? opt_data.content : ''));
      ie_close('p');
    ie_close('div');
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Popover.render';
}

exports.render.params = ["title","alignedPosition","content","elementClasses","position"];
templates = exports;
return exports;

});

class Popover extends Component {}
Soy.register(Popover, templates);
export default templates;
export { Popover, templates };
/* jshint ignore:end */
