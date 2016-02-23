/* jshint ignore:start */
import Component from 'metal-component';
import { SoyAop, SoyRenderer, SoyTemplates } from 'metal-soy';
var Templates = SoyTemplates.get();
// This file was automatically generated from ReadingProgress.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.ReadingProgress.
 */

if (typeof Templates.ReadingProgress == 'undefined') { Templates.ReadingProgress = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ReadingProgress.render = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="reading-progress component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '"><ul>';
  var itemList8 = opt_data.items;
  var itemListLen8 = itemList8.length;
  for (var itemIndex8 = 0; itemIndex8 < itemListLen8; itemIndex8++) {
    var itemData8 = itemList8[itemIndex8];
    output += Templates.ReadingProgress.item({item: itemData8, surfaceId: opt_data.id + '-item' + itemIndex8}, null, opt_ijData);
  }
  output += '</ul></div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ReadingProgress.render.soyTemplateName = 'Templates.ReadingProgress.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ReadingProgress.item = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li id="' + soy.$$escapeHtmlAttribute(opt_data.surfaceId) + '"><a href="' + soy.$$escapeHtmlAttribute(soy.$$filterNormalizeUri(opt_data.item.href)) + '">' + ((opt_data.item.title) ? '<em>' + soy.$$escapeHtml(opt_data.item.title) + '</em>' : '') + ((opt_data.item.time) ? '<b>' + soy.$$escapeHtml(opt_data.item.time < 60 ? opt_data.item.time + ' sec read' : Math.round(opt_data.item.time / 60) + ' min read') + '</b>' : '') + '<svg x="0px" y="0px" width="36px" height="36px" viewBox="0 0 36 36"><circle fill="none" stroke-width="2" cx="18" cy="18" r="16" stroke-dasharray="100 100" transform="rotate(-90 18 18)"></circle></svg></a></li>');
};
if (goog.DEBUG) {
  Templates.ReadingProgress.item.soyTemplateName = 'Templates.ReadingProgress.item';
}

Templates.ReadingProgress.render.params = ["id","items"];
Templates.ReadingProgress.item.params = ["item","surfaceId"];

class ReadingProgress extends Component {}
ReadingProgress.RENDERER = SoyRenderer;
SoyAop.registerTemplates('ReadingProgress');
export default ReadingProgress;
/* jshint ignore:end */
