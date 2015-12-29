/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
// This file was automatically generated from List.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.List.
 */

if (typeof Templates.List == 'undefined') { Templates.List = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.List.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="list component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.List.items(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.List.render.soyTemplateName = 'Templates.List.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.List.items = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-items" class="list-group" data-onclick="handleClick">';
  if (opt_data.itemsHtml != null) {
    output += soy.$$escapeHtml(opt_data.itemsHtml);
  } else {
    var itemList18 = opt_data.items;
    var itemListLen18 = itemList18.length;
    for (var itemIndex18 = 0; itemIndex18 < itemListLen18; itemIndex18++) {
      var itemData18 = itemList18[itemIndex18];
      output += Templates.ListItem.render({id: opt_data.id + '-items-' + itemIndex18, index: itemIndex18, item: itemData18}, null, opt_ijData);
    }
  }
  output += '</ul>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.List.items.soyTemplateName = 'Templates.List.items';
}

Templates.List.render.params = ["id"];
Templates.List.items.params = ["id","items","itemsHtml"];

class List extends Component {}
List.RENDERER = SoyRenderer;
SoyAop.registerTemplates('List');
export default List;
/* jshint ignore:end */
