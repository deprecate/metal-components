/* jshint ignore:start */
import Component from 'metal-component';
import { SoyAop, SoyRenderer, SoyTemplates } from 'metal-soy';
var Templates = SoyTemplates.get();
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
Templates.Switcher.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="switcher component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + soy.$$escapeHtmlAttribute(opt_data.checked ? ' switcher-on' : '') + '"><div class="switcher-control"><div class="switcher-control-icon"></div></div></div>');
};
if (goog.DEBUG) {
  Templates.Switcher.render.soyTemplateName = 'Templates.Switcher.render';
}

Templates.Switcher.render.params = ["id"];

class Switcher extends Component {}
Switcher.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Switcher');
export default Switcher;
/* jshint ignore:end */
