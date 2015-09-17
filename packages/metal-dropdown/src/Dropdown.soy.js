/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="dropdown component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + ((opt_data.header) ? soy.$$escapeHtml(opt_data.header) : '') + Templates.Dropdown.body(opt_data, null, opt_ijData) + '</div>');
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
export default Templates.Dropdown;
/* jshint ignore:end */
