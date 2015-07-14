/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Switcher.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Switcher.
 */

if (typeof Templates.Switcher == 'undefined') { Templates.Switcher = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Switcher.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="switcher component ' + soy.$$escapeHtmlAttribute(opt_data.elementClasses) + '"><div class="switcher-control"><div class="switcher-control-icon"></div></div></div>');
};
if (goog.DEBUG) {
  Templates.Switcher.content.soyTemplateName = 'Templates.Switcher.content';
}

Templates.Switcher.content.params = ["elementClasses","id"];
export default Templates.Switcher;
/* jshint ignore:end */
