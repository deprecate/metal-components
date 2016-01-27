/* jshint ignore:start */
import Component from 'metal/src/component/Component';
import SoyAop from 'metal/src/soy/SoyAop';
import SoyRenderer from 'metal/src/soy/SoyRenderer';
import SoyTemplates from 'metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
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
Templates.ButtonGroup.render = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="btn-group component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">';
  var buttonList8 = opt_data.buttons;
  var buttonListLen8 = buttonList8.length;
  for (var buttonIndex8 = 0; buttonIndex8 < buttonListLen8; buttonIndex8++) {
    var buttonData8 = buttonList8[buttonIndex8];
    var type__soy9 = buttonData8.type ? buttonData8.type : 'button';
    var cssClass__soy10 = buttonData8.cssClass ? buttonData8.cssClass : 'btn btn-default';
    output += '<button type="' + soy.$$escapeHtmlAttribute(type__soy9) + '" class="' + soy.$$escapeHtmlAttribute(cssClass__soy10) + soy.$$escapeHtmlAttribute(Templates.ButtonGroup.selectedClass({label: buttonData8.label, selected: opt_data.selected}, null, opt_ijData)) + '" data-index="' + soy.$$escapeHtmlAttribute(buttonIndex8) + '" data-onclick="handleClick_"><span class="btn-group-label">' + soy.$$escapeHtml(buttonData8.label ? buttonData8.label : '') + '</span>' + ((buttonData8.icon) ? '<span class="' + soy.$$escapeHtmlAttribute(buttonData8.icon) + '"></span>' : '') + '</button>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ButtonGroup.render.soyTemplateName = 'Templates.ButtonGroup.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.ButtonGroup.selectedClass = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  if (opt_data.selected) {
    var selectedValueList34 = opt_data.selected;
    var selectedValueListLen34 = selectedValueList34.length;
    for (var selectedValueIndex34 = 0; selectedValueIndex34 < selectedValueListLen34; selectedValueIndex34++) {
      var selectedValueData34 = selectedValueList34[selectedValueIndex34];
      output += (selectedValueData34 == opt_data.label) ? ' btn-group-selected' : '';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ButtonGroup.selectedClass.soyTemplateName = 'Templates.ButtonGroup.selectedClass';
}

Templates.ButtonGroup.render.params = ["buttons","id"];
Templates.ButtonGroup.selectedClass.private = true;

class ButtonGroup extends Component {}
ButtonGroup.RENDERER = SoyRenderer;
SoyAop.registerTemplates('ButtonGroup');
export default ButtonGroup;
/* jshint ignore:end */
