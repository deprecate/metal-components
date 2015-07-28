/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Rating.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Rating.
 */

if (typeof Templates.Rating == 'undefined') { Templates.Rating = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Rating.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="rating component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '"></div>');
};
if (goog.DEBUG) {
  Templates.Rating.content.soyTemplateName = 'Templates.Rating.content';
}

Templates.Rating.content.params = ["id"];
export default Templates.Rating;
/* jshint ignore:end */
