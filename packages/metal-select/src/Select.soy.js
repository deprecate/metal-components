/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
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
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="select component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" data-onkeydown="handleKeyDown_">';
  var currSelectedIndex__soy8 = opt_data.selectedIndex != null ? opt_data.selectedIndex : opt_data.label || opt_data.items.length == 0 ? -1 : 0;
  output += '<input type="hidden" name="' + soy.$$escapeHtmlAttribute(opt_data.hiddenInputName ? opt_data.hiddenInputName : '') + '" value="' + soy.$$escapeHtmlAttribute(currSelectedIndex__soy8 == -1 ? '' : opt_data.items[currSelectedIndex__soy8]) + '" />';
  var param14 = '';
  var itemList15 = opt_data.items;
  var itemListLen15 = itemList15.length;
  for (var itemIndex15 = 0; itemIndex15 < itemListLen15; itemIndex15++) {
    var itemData15 = itemList15[itemIndex15];
    param14 += '<li data-onclick="' + soy.$$escapeHtmlAttribute(opt_data.id) + ':handleItemClick_" class="select-option' + soy.$$escapeHtmlAttribute(currSelectedIndex__soy8 == itemIndex15 ? ' selected' : '') + '"><a href="#">' + soy.$$escapeHtml(itemData15) + '</a></li>';
  }
  output += soy.$$escapeHtml(Templates.Dropdown.content({body: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks(param14), events: {attrsSynced: opt_data.id + ':handleDropdownAttrsSynced_'}, header: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('<button class="' + soy.$$escapeHtmlAttribute(opt_data.buttonClass) + ' dropdown-select" type="button" data-onclick="toggle">' + soy.$$escapeHtml(currSelectedIndex__soy8 == -1 ? opt_data.label : opt_data.items[currSelectedIndex__soy8]) + ' <span class="' + soy.$$escapeHtmlAttribute(opt_data.arrowClass ? opt_data.arrowClass : 'caret') + '"></span></button>'), id: opt_data.id + '-dropdown'}, null, opt_ijData));
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Select.content.soyTemplateName = 'Templates.Select.content';
}

Templates.Select.content.params = ["arrowClass","buttonClass","hiddenInputName","id","items","label","selectedIndex"];

class Select extends Component {}
Select.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Select');
export default Select;
/* jshint ignore:end */
