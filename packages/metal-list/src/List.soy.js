/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from List.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.List.
 * @hassoydeltemplate {List.items}
 */

if (typeof Templates.List == 'undefined') { Templates.List = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.List.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="list component ' + soy.$$escapeHtmlAttribute(opt_data.elementClasses) + '">' + Templates.List.items(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.List.content.soyTemplateName = 'Templates.List.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.List.items = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-items">';
  var itemList14 = opt_data.items;
  var itemListLen14 = itemList14.length;
  for (var itemIndex14 = 0; itemIndex14 < itemListLen14; itemIndex14++) {
    var itemData14 = itemList14[itemIndex14];
    output += '<li class="list-item clearfix" data-index="' + soy.$$escapeHtmlAttribute(itemIndex14) + '" data-onclick="handleClick">';
    if (itemData14.icons) {
      output += '<div class="list-icons pull-right">';
      var iconList21 = itemData14.icons;
      var iconListLen21 = iconList21.length;
      for (var iconIndex21 = 0; iconIndex21 < iconListLen21; iconIndex21++) {
        var iconData21 = iconList21[iconIndex21];
        output += '<span class="list-icon ' + soy.$$escapeHtmlAttribute(iconData21) + '"></span>';
      }
      output += '</div>';
    }
    output += ((itemData14.avatar) ? '<span class="list-image pull-left ' + soy.$$escapeHtmlAttribute(itemData14.avatar['class']) + '">' + soy.$$escapeHtml(itemData14.avatar.content) + '</span>' : '') + '<div class="list-main-content pull-left"><div class="list-text-primary">' + soy.$$escapeHtml(itemData14.textPrimary) + '</div>' + ((itemData14.textSecondary) ? '<div class="list-text-secondary">' + soy.$$escapeHtml(itemData14.textSecondary) + '</div>' : '') + '</div></li>';
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.List.items.soyTemplateName = 'Templates.List.items';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.List.__deltemplate_s45_e3f298e9 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-items">' + soy.$$escapeHtml(opt_data.elementContent) + '</ul>');
};
if (goog.DEBUG) {
  Templates.List.__deltemplate_s45_e3f298e9.soyTemplateName = 'Templates.List.__deltemplate_s45_e3f298e9';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('List.items'), 'element', 0, Templates.List.__deltemplate_s45_e3f298e9);

Templates.List.content.params = ["elementClasses","id"];
Templates.List.items.params = ["id","items"];
export default Templates.List;
/* jshint ignore:end */
