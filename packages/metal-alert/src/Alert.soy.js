/* jshint ignore:start */
import Component from 'metal-component';
import { SoyAop, SoyRenderer, SoyTemplates } from 'metal-soy';
var Templates = SoyTemplates.get();
// This file was automatically generated from Alert.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Alert.
 */

if (typeof Templates.Alert == 'undefined') { Templates.Alert = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="alert alert-dismissible component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="alert"><span class="alert-body">' + ((opt_data.body) ? soy.$$escapeHtml(opt_data.body) : '') + '</span>' + ((opt_data.dismissible) ? '<button type="button" class="close" aria-label="Close" data-onclick="toggle"><span aria-hidden="true">\u00D7</span></button>' : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.Alert.render.soyTemplateName = 'Templates.Alert.render';
}

Templates.Alert.render.params = ["body","dismissible","id"];

class Alert extends Component {}
Alert.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Alert');
export default Alert;
/* jshint ignore:end */
