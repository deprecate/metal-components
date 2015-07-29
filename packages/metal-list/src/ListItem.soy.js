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
  var output = '';
  if (opt_data.item.icons) {
    output += '<div class="list-icons pull-right">';
    var iconList40 = opt_data.item.icons;
    var iconListLen40 = iconList40.length;
    for (var iconIndex40 = 0; iconIndex40 < iconListLen40; iconIndex40++) {
      var iconData40 = iconList40[iconIndex40];
      output += '<span class="list-icon ' + soy.$$escapeHtmlAttribute(iconData40) + '"></span>';
    }
    output += '</div>';
  }
  if (opt_data.item.iconsHtml) {
    output += '<div class="list-icons pull-right">';
    var iconHtmlList49 = opt_data.item.iconsHtml;
    var iconHtmlListLen49 = iconHtmlList49.length;
    for (var iconHtmlIndex49 = 0; iconHtmlIndex49 < iconHtmlListLen49; iconHtmlIndex49++) {
      var iconHtmlData49 = iconHtmlList49[iconHtmlIndex49];
      output += soy.$$escapeHtml(iconHtmlData49);
    }
    output += '</div>';
  }
  output += ((opt_data.item.avatar) ? '<span class="list-image pull-left ' + soy.$$escapeHtmlAttribute(opt_data.item.avatar['class']) + '">' + soy.$$escapeHtml(opt_data.item.avatar.content) + '</span>' : '') + '<div class="list-main-content pull-left"><div class="list-text-primary">' + soy.$$escapeHtml(opt_data.item.textPrimary) + '</div>' + ((opt_data.item.textSecondary) ? '<div class="list-text-secondary">' + soy.$$escapeHtml(opt_data.item.textSecondary) + '</div>' : '') + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ListItem.item.soyTemplateName = 'Templates.ListItem.item';
}

Templates.ListItem.content.params = ["id","index","item"];
Templates.ListItem.item.params = ["item"];
export default Templates.ListItem;
/* jshint ignore:end */
