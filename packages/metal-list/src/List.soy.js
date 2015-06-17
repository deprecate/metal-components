/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from List.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.List.
 * @hassoydeltemplate {List}
 * @hassoydeltemplate {List.items}
 * @hassoydelcall {List}
 * @hassoydelcall {List.items}
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('List.items'), '', true)(opt_data, null, opt_ijData));
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
  var output = '';
  var itemList5 = opt_data.items;
  var itemListLen5 = itemList5.length;
  for (var itemIndex5 = 0; itemIndex5 < itemListLen5; itemIndex5++) {
    var itemData5 = itemList5[itemIndex5];
    output += '<li class="list-item u-cf" data-index="' + soy.$$escapeHtmlAttribute(itemIndex5) + '" data-onclick="handleClick">';
    if (itemData5.icons) {
      output += '<div class="list-icons u-pull-right">';
      var iconList12 = itemData5.icons;
      var iconListLen12 = iconList12.length;
      for (var iconIndex12 = 0; iconIndex12 < iconListLen12; iconIndex12++) {
        var iconData12 = iconList12[iconIndex12];
        output += '<span class="list-icon ' + soy.$$escapeHtmlAttribute(iconData12) + '"></span>';
      }
      output += '</div>';
    }
    output += ((itemData5.avatar) ? '<span class="list-image u-pull-left ' + soy.$$escapeHtmlAttribute(itemData5.avatar['class']) + '">' + soy.$$escapeHtml(itemData5.avatar.content) + '</span>' : '') + '<div class="list-main-content u-pull-left"><div class="list-text-primary">' + soy.$$escapeHtml(itemData5.textPrimary) + '</div>' + ((itemData5.textSecondary) ? '<div class="list-text-secondary">' + soy.$$escapeHtml(itemData5.textSecondary) + '</div>' : '') + '</div></li>';
  }
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
Templates.List.__deltemplate_s35_e3f298e9 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-items">' + soy.$$escapeHtml(opt_data.elementContent) + '</ul>');
};
if (goog.DEBUG) {
  Templates.List.__deltemplate_s35_e3f298e9.soyTemplateName = 'Templates.List.__deltemplate_s35_e3f298e9';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('List.items'), 'element', 0, Templates.List.__deltemplate_s35_e3f298e9);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.List.__deltemplate_s41_88d36183 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('List'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.List.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.List.__deltemplate_s41_88d36183.soyTemplateName = 'Templates.List.__deltemplate_s41_88d36183';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('List'), '', 0, Templates.List.__deltemplate_s41_88d36183);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.List.__deltemplate_s47_4ac84340 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="list component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.List.__deltemplate_s47_4ac84340.soyTemplateName = 'Templates.List.__deltemplate_s47_4ac84340';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('List'), 'element', 0, Templates.List.__deltemplate_s47_4ac84340);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.List.__deltemplate_s55_605e1843 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('List.items'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.List.items(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.List.__deltemplate_s55_605e1843.soyTemplateName = 'Templates.List.__deltemplate_s55_605e1843';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('List.items'), '', 0, Templates.List.__deltemplate_s55_605e1843);

Templates.List.items.params = ["items"];
export default Templates.List;
/* jshint ignore:end */
