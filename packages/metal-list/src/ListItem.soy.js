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
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('li', null, null,
      'id', opt_data.id,
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
        itext((goog.asserts.assert((opt_data.item.textPrimary ? opt_data.item.textPrimary : '') != null), opt_data.item.textPrimary ? opt_data.item.textPrimary : ''));
      ie_close('div');
      if (opt_data.item.textSecondary) {
        ie_open('div', null, null,
            'class', 'list-text-secondary');
          itext((goog.asserts.assert((opt_data.item.textSecondary) != null), opt_data.item.textSecondary));
        ie_close('div');
      }
    ie_close('div');
    if (opt_data.item.icons) {
      var iconList50 = opt_data.item.icons;
      var iconListLen50 = iconList50.length;
      for (var iconIndex50 = 0; iconIndex50 < iconListLen50; iconIndex50++) {
        var iconData50 = iconList50[iconIndex50];
        ie_void('span', null, null,
            'class', 'btn-icon ' + iconData50 + ' pull-right');
      }
    }
    if (opt_data.item.iconsHtml) {
      ie_open('div', null, null,
          'class', 'pull-right');
        var iconHtmlList57 = opt_data.item.iconsHtml;
        var iconHtmlListLen57 = iconHtmlList57.length;
        for (var iconHtmlIndex57 = 0; iconHtmlIndex57 < iconHtmlListLen57; iconHtmlIndex57++) {
          var iconHtmlData57 = iconHtmlList57[iconHtmlIndex57];
          $htmlContent({content: iconHtmlData57}, null, opt_ijData);
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
 *    content: (!soydata.SanitizedHtml|string)
 * }} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $htmlContent(opt_data, opt_ignored, opt_ijData) {
  soy.asserts.assertType((opt_data.content instanceof Function) || (opt_data.content instanceof soydata.UnsanitizedText) || goog.isString(opt_data.content), 'content', opt_data.content, 'Function');
  var content = /** @type {Function} */ (opt_data.content);
  content();
}
exports.htmlContent = $htmlContent;
if (goog.DEBUG) {
  $htmlContent.soyTemplateName = 'ListItem.htmlContent';
}

exports.render.params = ["id","index","item","elementClasses"];
exports.htmlContent.params = ["content"];
templates = exports;
return exports;

});

class ListItem extends Component {}
Soy.register(ListItem, templates);
export default templates;
export { ListItem, templates };
/* jshint ignore:end */
