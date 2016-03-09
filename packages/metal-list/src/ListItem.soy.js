/* jshint ignore:start */
import Component from 'metal-component';
import { SoyAop, SoyRenderer, SoyTemplates } from 'metal-soy';
var Templates = SoyTemplates.get();
// This file was automatically generated from ListItem.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.ListItem.
 */

if (typeof Templates.ListItem == 'undefined') { Templates.ListItem = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ListItem.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="listitem list-group-item component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + ' clearfix" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '">' + Templates.ListItem.item(opt_data, null, opt_ijData) + '</li>');
};
if (goog.DEBUG) {
  Templates.ListItem.render.soyTemplateName = 'Templates.ListItem.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ListItem.item = function(opt_data, opt_ignored, opt_ijData) {
  var output = ((opt_data.item.avatar) ? '<span class="list-image pull-left ' + soy.$$escapeHtmlAttribute(opt_data.item.avatar['class']) + '">' + soy.$$escapeHtml(opt_data.item.avatar.content) + '</span>' : '') + '<div class="list-main-content pull-left"><div class="list-text-primary">' + soy.$$escapeHtml(opt_data.item.textPrimary) + '</div>' + ((opt_data.item.textSecondary) ? '<div class="list-text-secondary">' + soy.$$escapeHtml(opt_data.item.textSecondary) + '</div>' : '') + '</div>';
  if (opt_data.item.icons) {
    var iconList55 = opt_data.item.icons;
    var iconListLen55 = iconList55.length;
    for (var iconIndex55 = 0; iconIndex55 < iconListLen55; iconIndex55++) {
      var iconData55 = iconList55[iconIndex55];
      output += '<span class="btn-icon ' + soy.$$escapeHtmlAttribute(iconData55) + ' pull-right"></span>';
    }
  }
  if (opt_data.item.iconsHtml) {
    output += '<div class="pull-right">';
    var iconHtmlList63 = opt_data.item.iconsHtml;
    var iconHtmlListLen63 = iconHtmlList63.length;
    for (var iconHtmlIndex63 = 0; iconHtmlIndex63 < iconHtmlListLen63; iconHtmlIndex63++) {
      var iconHtmlData63 = iconHtmlList63[iconHtmlIndex63];
      output += soy.$$escapeHtml(iconHtmlData63);
    }
    output += '</div>';
  }
  output += (opt_data.item.label) ? '<span class="label list-label pull-right ' + soy.$$escapeHtmlAttribute(opt_data.item.label['class']) + '">' + soy.$$escapeHtml(opt_data.item.label.content) + '</span>' : '';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ListItem.item.soyTemplateName = 'Templates.ListItem.item';
}

Templates.ListItem.render.params = ["id","index","item"];
Templates.ListItem.item.params = ["item"];

class ListItem extends Component {}
ListItem.RENDERER = SoyRenderer;
SoyAop.registerTemplates('ListItem');
export default ListItem;
/* jshint ignore:end */
