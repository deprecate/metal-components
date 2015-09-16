/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from ButtonGroup.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.ButtonGroup.
 */

if (typeof Templates.ButtonGroup == 'undefined') { Templates.ButtonGroup = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ButtonGroup.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="btn-group component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">';
  var buttonList8 = opt_data.buttons;
  var buttonListLen8 = buttonList8.length;
  for (var buttonIndex8 = 0; buttonIndex8 < buttonListLen8; buttonIndex8++) {
    var buttonData8 = buttonList8[buttonIndex8];
    var type__soy9 = buttonData8.type ? buttonData8.type : 'button';
    var cssClass__soy10 = buttonData8.cssClass ? buttonData8.cssClass : 'btn btn-default';
    output += '<button type="' + soy.$$escapeHtmlAttribute(type__soy9) + '" class="' + soy.$$escapeHtmlAttribute(cssClass__soy10) + soy.$$escapeHtmlAttribute(opt_data.selected && opt_data.selected[buttonIndex8] ? ' btn-group-selected' : '') + '" data-index="' + soy.$$escapeHtmlAttribute(buttonIndex8) + '" data-onclick="handleClick_"><span class="btn-group-label">' + soy.$$escapeHtml(buttonData8.label ? buttonData8.label : '') + '</span><span class="btn-group-icon icon-12-check"></span></button>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ButtonGroup.content.soyTemplateName = 'Templates.ButtonGroup.content';
}

Templates.ButtonGroup.content.params = ["buttons","id"];
export default Templates.ButtonGroup;
/* jshint ignore:end */
