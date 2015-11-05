/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
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
Templates.Switcher.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="switcher component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + soy.$$escapeHtmlAttribute(opt_data.checked ? ' switcher-on' : '') + '"><div class="switcher-control"><div class="switcher-control-icon"></div></div></div>');
};
if (goog.DEBUG) {
  Templates.Switcher.content.soyTemplateName = 'Templates.Switcher.content';
}

Templates.Switcher.content.params = ["id"];

class Switcher extends Component {
  static setImpl(ctor) {
    ComponentRegistry.register(ctor, 'Switcher');
  }
}
Switcher.RENDERER = SoyRenderer;
Switcher.setImpl(Switcher);
SoyAop.registerTemplates('Switcher');
export default Switcher;
/* jshint ignore:end */
