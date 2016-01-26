/* jshint ignore:start */
import Component from 'npm:metal/src/component/Component';
import SoyAop from 'npm:metal/src/soy/SoyAop';
import SoyRenderer from 'npm:metal/src/soy/SoyRenderer';
import SoyTemplates from 'npm:metal/src/soy/SoyTemplates';
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="alert alert-dismissible component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="alert">' + Templates.Alert.dismiss(opt_data, null, opt_ijData) + Templates.Alert.body(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.Alert.render.soyTemplateName = 'Templates.Alert.render';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body">' + ((opt_data.body) ? soy.$$escapeHtml(opt_data.body) : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.Alert.body.soyTemplateName = 'Templates.Alert.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.dismiss = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-dismiss">' + ((opt_data.dismissible) ? '<button type="button" class="close" aria-label="Close" data-onclick="toggle"><span aria-hidden="true">\u00D7</span></button>' : '') + '</div>');
};
if (goog.DEBUG) {
  Templates.Alert.dismiss.soyTemplateName = 'Templates.Alert.dismiss';
}

Templates.Alert.render.params = ["id"];
Templates.Alert.body.params = ["body","id"];
Templates.Alert.dismiss.params = ["dismissible","id"];

class Alert extends Component {}
Alert.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Alert');
export default Alert;
/* jshint ignore:end */
