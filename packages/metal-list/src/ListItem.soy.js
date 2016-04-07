/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from ListItem.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace ListItem.
 * @public
 */

goog.module('ListItem.incrementaldom');

/** @suppress {extraRequire} */
var soy = goog.require('soy');
/** @suppress {extraRequire} */
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
/** @suppress {extraRequire} */
goog.require('soy.asserts');
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
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('li', null, null,
      'class', 'listitem list-group-item ' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + ' clearfix',
      'data-index', opt_data.index);
    if (opt_data.item.avatar) {
      ie_open('span', null, null,
          'class', 'list-image pull-left ' + opt_data.item.avatar['class']);
        $htmlContent({content: opt_data.item.avatar.content}, null, opt_ijData);
      ie_close('span');
    }
    ie_open('div', null, null,
        'class', 'list-main-content pull-left');
      ie_open('div', null, null,
          'class', 'list-text-primary');
        $htmlContent({content: opt_data.item.textPrimary}, null, opt_ijData);
      ie_close('div');
      if (opt_data.item.textSecondary) {
        ie_open('div', null, null,
            'class', 'list-text-secondary');
          $htmlContent({content: opt_data.item.textSecondary}, null, opt_ijData);
        ie_close('div');
      }
    ie_close('div');
    if (opt_data.item.icons) {
      var iconList48 = opt_data.item.icons;
      var iconListLen48 = iconList48.length;
      for (var iconIndex48 = 0; iconIndex48 < iconListLen48; iconIndex48++) {
        var iconData48 = iconList48[iconIndex48];
        ie_void('span', null, null,
            'class', 'btn-icon ' + iconData48 + ' pull-right');
      }
    }
    if (opt_data.item.iconsHtml) {
      ie_open('div', null, null,
          'class', 'pull-right');
        var iconHtmlList55 = opt_data.item.iconsHtml;
        var iconHtmlListLen55 = iconHtmlList55.length;
        for (var iconHtmlIndex55 = 0; iconHtmlIndex55 < iconHtmlListLen55; iconHtmlIndex55++) {
          var iconHtmlData55 = iconHtmlList55[iconHtmlIndex55];
          $htmlContent({content: iconHtmlData55}, null, opt_ijData);
        }
      ie_close('div');
    }
    if (opt_data.item.label) {
      ie_open('span', null, null,
          'class', 'label list-label pull-right ' + opt_data.item.label['class']);
        itext((goog.asserts.assert((opt_data.item.label.content) != null), opt_data.item.label.content));
      ie_close('span');
    }
  ie_close('li');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'ListItem.render';
}


/**
 * @param {{
 *    content: (?soydata.SanitizedHtml|string|undefined)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $htmlContent(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  soy.asserts.assertType(opt_data.content == null || (opt_data.content instanceof Function) || (opt_data.content instanceof soydata.UnsanitizedText) || goog.isString(opt_data.content), 'content', opt_data.content, '?soydata.SanitizedHtml|string|undefined');
  var content = /** @type {?soydata.SanitizedHtml|string|undefined} */ (opt_data.content);
  if (content) {
    content();
  }
}
exports.htmlContent = $htmlContent;
if (goog.DEBUG) {
  $htmlContent.soyTemplateName = 'ListItem.htmlContent';
}

exports.render.params = ["index","item","elementClasses"];
exports.htmlContent.params = ["content"];
templates = exports;
return exports;

});

class ListItem extends Component {}
Soy.register(ListItem, templates);
export default templates;
export { ListItem, templates };
/* jshint ignore:end */
