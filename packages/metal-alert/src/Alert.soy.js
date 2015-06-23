/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Alert.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Alert.
 * @hassoydeltemplate {Alert}
 * @hassoydeltemplate {Alert.body}
 * @hassoydeltemplate {Alert.dismiss}
 * @hassoydelcall {Alert}
 * @hassoydelcall {Alert.body}
 * @hassoydelcall {Alert.dismiss}
 */

if (typeof Templates.Alert == 'undefined') { Templates.Alert = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Alert.dismiss'), '', true)(opt_data, null, opt_ijData) + soy.$$getDelegateFn(soy.$$getDelTemplateId('Alert.body'), '', true)(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Alert.content.soyTemplateName = 'Templates.Alert.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((opt_data.body) ? soy.$$escapeHtml(opt_data.body) : '');
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((opt_data.dismissible) ? '<button type="button" class="close" aria-label="Close" data-onclick="close"><span aria-hidden="true">\u00D7</span></button>' : '');
};
if (goog.DEBUG) {
  Templates.Alert.dismiss.soyTemplateName = 'Templates.Alert.dismiss';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.__deltemplate_s13_c3d627de = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="alert alert-dismissible component ' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? opt_data.elementClasses : '') + '" role="alert">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Alert.__deltemplate_s13_c3d627de.soyTemplateName = 'Templates.Alert.__deltemplate_s13_c3d627de';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Alert'), 'element', 0, Templates.Alert.__deltemplate_s13_c3d627de);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.__deltemplate_s21_cd80c96e = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Alert'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Alert.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Alert.__deltemplate_s21_cd80c96e.soyTemplateName = 'Templates.Alert.__deltemplate_s21_cd80c96e';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Alert'), '', 0, Templates.Alert.__deltemplate_s21_cd80c96e);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.__deltemplate_s27_cbcfd186 = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var elementId__soy28 = opt_data.id + '-' + (opt_data.surfaceId != null ? opt_data.surfaceId : 'body');
  output += '<div id="' + soy.$$escapeHtmlAttribute(elementId__soy28) + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Alert.__deltemplate_s27_cbcfd186.soyTemplateName = 'Templates.Alert.__deltemplate_s27_cbcfd186';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Alert.body'), 'element', 0, Templates.Alert.__deltemplate_s27_cbcfd186);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.__deltemplate_s34_9a197608 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Alert.body'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Alert.body(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Alert.__deltemplate_s34_9a197608.soyTemplateName = 'Templates.Alert.__deltemplate_s34_9a197608';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Alert.body'), '', 0, Templates.Alert.__deltemplate_s34_9a197608);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.__deltemplate_s39_fbeb8299 = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var elementId__soy40 = opt_data.id + '-' + (opt_data.surfaceId != null ? opt_data.surfaceId : 'dismiss');
  output += '<div id="' + soy.$$escapeHtmlAttribute(elementId__soy40) + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Alert.__deltemplate_s39_fbeb8299.soyTemplateName = 'Templates.Alert.__deltemplate_s39_fbeb8299';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Alert.dismiss'), 'element', 0, Templates.Alert.__deltemplate_s39_fbeb8299);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Alert.__deltemplate_s46_d8c68a2a = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Alert.dismiss'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Alert.dismiss(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Alert.__deltemplate_s46_d8c68a2a.soyTemplateName = 'Templates.Alert.__deltemplate_s46_d8c68a2a';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Alert.dismiss'), '', 0, Templates.Alert.__deltemplate_s46_d8c68a2a);

Templates.Alert.body.params = ["body"];
Templates.Alert.dismiss.params = ["dismissible"];
export default Templates.Alert;
/* jshint ignore:end */
