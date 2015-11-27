/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
// This file was automatically generated from Dropdown.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Dropdown.
 */

if (typeof Templates.Dropdown == 'undefined') { Templates.Dropdown = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Dropdown.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="dropdown component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + soy.$$escapeHtmlAttribute(opt_data.expanded ? ' open' : '') + '">' + ((opt_data.header) ? soy.$$escapeHtml(opt_data.header) : '') + Templates.Dropdown.body(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.Dropdown.content.soyTemplateName = 'Templates.Dropdown.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Dropdown.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="dropdown-menu">' + ((opt_data.body) ? soy.$$escapeHtml(opt_data.body) : '') + '</ul>');
};
if (goog.DEBUG) {
  Templates.Dropdown.body.soyTemplateName = 'Templates.Dropdown.body';
}

Templates.Dropdown.content.params = ["header","id"];
Templates.Dropdown.body.params = ["body","id"];

class Dropdown extends Component {}
Dropdown.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Dropdown');
export default Dropdown;
/* jshint ignore:end */
