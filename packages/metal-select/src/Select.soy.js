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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="select component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '"></div>');
};
if (goog.DEBUG) {
  Templates.Select.content.soyTemplateName = 'Templates.Select.content';
}

Templates.Select.content.params = ["id"];
export default Templates.Select;
/* jshint ignore:end */
