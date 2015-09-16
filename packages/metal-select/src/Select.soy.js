/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Select.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Select.
 */

if (typeof Templates.Select == 'undefined') { Templates.Select = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Select.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="select component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '"><input type="hidden" name="' + soy.$$escapeHtmlAttribute(opt_data.hiddenInputName ? opt_data.hiddenInputName : '') + '" value="' + soy.$$escapeHtmlAttribute(opt_data.selectedIndex == -1 ? '' : opt_data.items[opt_data.selectedIndex]) + '" />';
  var param12 = '';
  var itemList13 = opt_data.items;
  var itemListLen13 = itemList13.length;
  for (var itemIndex13 = 0; itemIndex13 < itemListLen13; itemIndex13++) {
    var itemData13 = itemList13[itemIndex13];
    param12 += '<li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleItemClick_" class="' + soy.$$escapeHtmlAttribute(opt_data.selectedIndex == itemIndex13 ? 'selected' : '') + '"><a href="#">' + soy.$$escapeHtml(itemData13) + '</a></li>';
  }
  output += soy.$$escapeHtml(Templates.Dropdown.content({body: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(param12), header: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<button class="' + soy.$$escapeHtmlAttribute(opt_data.buttonClass) + ' dropdown-select" type="button" data-onclick="toggle">' + soy.$$escapeHtml(opt_data.selectedIndex == -1 ? opt_data.label : opt_data.items[opt_data.selectedIndex]) + '<span class="icon-12-arrow-down-short"></span></button>'), id: opt_data.id + '-dropdown'}, null, opt_ijData));
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Select.content.soyTemplateName = 'Templates.Select.content';
}

Templates.Select.content.params = ["buttonClass","hiddenInputName","id","items","label","selectedIndex"];
export default Templates.Select;
/* jshint ignore:end */
