/* jshint ignore:start */
import ComponentRegistry from 'bower:metaljs/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Modal.
 * @hassoydeltemplate {Modal}
 * @hassoydelcall {Modal}
 */

if (typeof Templates.Modal == 'undefined') { Templates.Modal = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  Templates.Modal.content.soyTemplateName = 'Templates.Modal.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s3_45b138fb = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Modal.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s3_45b138fb.soyTemplateName = 'Templates.Modal.__deltemplate_s3_45b138fb';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal'), '', 0, Templates.Modal.__deltemplate_s3_45b138fb);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s9_df8ef55a = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="modal component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s9_df8ef55a.soyTemplateName = 'Templates.Modal.__deltemplate_s9_df8ef55a';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal'), 'element', 0, Templates.Modal.__deltemplate_s9_df8ef55a);

/* jshint ignore:end */
