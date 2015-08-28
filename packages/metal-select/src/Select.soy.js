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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="select component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">';
  var param8 = '';
  var itemList9 = opt_data.items;
  var itemListLen9 = itemList9.length;
  for (var itemIndex9 = 0; itemIndex9 < itemListLen9; itemIndex9++) {
    var itemData9 = itemList9[itemIndex9];
    param8 += '<li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleItemClick_" class="' + soy.$$escapeHtmlAttribute(opt_data.selectedIndex == itemIndex9 ? 'selected' : '') + '"><a href="#">' + soy.$$escapeHtml(itemData9) + '</a></li>';
  }
  output += soy.$$escapeHtml(Templates.Dropdown.content({body: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(param8), header: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<button class="btn btn-default dropdown-select" type="button" data-onclick="toggle">' + soy.$$escapeHtml(opt_data.selectedIndex == -1 ? opt_data.label : opt_data.items[opt_data.selectedIndex]) + '<span class="icon-12-arrow-down-short"></span></button>'), id: opt_data.id + '-dropdown'}, null, opt_ijData));
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Select.content.soyTemplateName = 'Templates.Select.content';
}

Templates.Select.content.params = ["id","items","label","selectedIndex"];
export default Templates.Select;
/* jshint ignore:end */
