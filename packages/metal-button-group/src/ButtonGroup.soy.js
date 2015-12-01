/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
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
Templates.ButtonGroup.content = function(opt_data, opt_ignored, opt_ijData) {
  var output = '<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="btn-group component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">';
  var buttonList8 = opt_data.buttons;
  var buttonListLen8 = buttonList8.length;
  for (var buttonIndex8 = 0; buttonIndex8 < buttonListLen8; buttonIndex8++) {
    var buttonData8 = buttonList8[buttonIndex8];
    var type__soy9 = buttonData8.type ? buttonData8.type : 'button';
    var cssClass__soy10 = buttonData8.cssClass ? buttonData8.cssClass : 'btn btn-default';
    output += '<button type="' + soy.$$escapeHtmlAttribute(type__soy9) + '" class="' + soy.$$escapeHtmlAttribute(cssClass__soy10) + soy.$$escapeHtmlAttribute(Templates.ButtonGroup.selectedClass({label: buttonData8.label, selected: opt_data.selected}, null, opt_ijData)) + '" data-index="' + soy.$$escapeHtmlAttribute(buttonIndex8) + '" data-onclick="handleClick_"><span class="btn-group-label">' + soy.$$escapeHtml(buttonData8.label ? buttonData8.label : '') + '</span><span class="btn-group-icon icon-12-check"></span></button>';
  }
  output += '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ButtonGroup.content.soyTemplateName = 'Templates.ButtonGroup.content';
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
    var selectedValueList28 = opt_data.selected;
    var selectedValueListLen28 = selectedValueList28.length;
    for (var selectedValueIndex28 = 0; selectedValueIndex28 < selectedValueListLen28; selectedValueIndex28++) {
      var selectedValueData28 = selectedValueList28[selectedValueIndex28];
      output += (selectedValueData28 == opt_data.label) ? ' btn-group-selected' : '';
    }
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.ButtonGroup.selectedClass.soyTemplateName = 'Templates.ButtonGroup.selectedClass';
}

Templates.ButtonGroup.content.params = ["buttons","id"];
Templates.ButtonGroup.selectedClass.private = true;

class ButtonGroup extends Component {}
ButtonGroup.RENDERER = SoyRenderer;
SoyAop.registerTemplates('ButtonGroup');
export default ButtonGroup;
/* jshint ignore:end */
