/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
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
Templates.ListItem.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="listitem component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + ' clearfix" data-index="' + soy.$$escapeHtmlAttribute(opt_data.index) + '">' + Templates.ListItem.item(opt_data, null, opt_ijData) + '</li>');
};
if (goog.DEBUG) {
  Templates.ListItem.content.soyTemplateName = 'Templates.ListItem.content';
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
    output += '<div class="list-icons pull-right">';
    var iconList56 = opt_data.item.icons;
    var iconListLen56 = iconList56.length;
    for (var iconIndex56 = 0; iconIndex56 < iconListLen56; iconIndex56++) {
      var iconData56 = iconList56[iconIndex56];
      output += '<span class="list-icon ' + soy.$$escapeHtmlAttribute(iconData56) + '"></span>';
    }
    output += '</div>';
  }
  if (opt_data.item.iconsHtml) {
    output += '<div class="list-icons pull-right">';
    var iconHtmlList65 = opt_data.item.iconsHtml;
    var iconHtmlListLen65 = iconHtmlList65.length;
    for (var iconHtmlIndex65 = 0; iconHtmlIndex65 < iconHtmlListLen65; iconHtmlIndex65++) {
      var iconHtmlData65 = iconHtmlList65[iconHtmlIndex65];
      output += soy.$$escapeHtml(iconHtmlData65);
    }
    output += '</div>';
  }
  output += (opt_data.item.label) ? '<span class="label list-label pull-right ' + soy.$$escapeHtmlAttribute(opt_data.item.label['class']) + '">' + soy.$$escapeHtml(opt_data.item.label.content) + '</span>' : '';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ListItem.item.soyTemplateName = 'Templates.ListItem.item';
}

Templates.ListItem.content.params = ["id","index","item"];
Templates.ListItem.item.params = ["item"];
export default Templates.ListItem;
/* jshint ignore:end */
