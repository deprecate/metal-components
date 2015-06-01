/* jshint ignore:start */
import ComponentRegistry from 'bower:metaljs/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Modal.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Modal.
 * @hassoydeltemplate {Modal}
 * @hassoydeltemplate {Modal.body}
 * @hassoydeltemplate {Modal.footer}
 * @hassoydeltemplate {Modal.header}
 * @hassoydelcall {Modal}
 * @hassoydelcall {Modal.body}
 * @hassoydelcall {Modal.footer}
 * @hassoydelcall {Modal.header}
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="modal-dialog"><div class="modal-content">' + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.header'), '', true)(opt_data, null, opt_ijData) + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.body'), '', true)(opt_data, null, opt_ijData) + soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.footer'), '', true)(opt_data, null, opt_ijData) + '</div></div>');
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
Templates.Modal.body = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.body));
};
if (goog.DEBUG) {
  Templates.Modal.body.soyTemplateName = 'Templates.Modal.body';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.footer = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.footer));
};
if (goog.DEBUG) {
  Templates.Modal.footer.soyTemplateName = 'Templates.Modal.footer';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.header = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$escapeHtml(opt_data.header));
};
if (goog.DEBUG) {
  Templates.Modal.header.soyTemplateName = 'Templates.Modal.header';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s14_65c2d4d4 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<section id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-body" class="modal-body">' + soy.$$escapeHtml(opt_data.elementContent) + '</section>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s14_65c2d4d4.soyTemplateName = 'Templates.Modal.__deltemplate_s14_65c2d4d4';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.body'), 'element', 0, Templates.Modal.__deltemplate_s14_65c2d4d4);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s20_c9897a65 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<footer id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-footer" class="modal-footer">' + soy.$$escapeHtml(opt_data.elementContent) + '</footer>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s20_c9897a65.soyTemplateName = 'Templates.Modal.__deltemplate_s20_c9897a65';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.footer'), 'element', 0, Templates.Modal.__deltemplate_s20_c9897a65);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s26_499dc9aa = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<header id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-header" class="modal-header">' + soy.$$escapeHtml(opt_data.elementContent) + '</header>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s26_499dc9aa.soyTemplateName = 'Templates.Modal.__deltemplate_s26_499dc9aa';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.header'), 'element', 0, Templates.Modal.__deltemplate_s26_499dc9aa);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s32_45b138fb = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Modal.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s32_45b138fb.soyTemplateName = 'Templates.Modal.__deltemplate_s32_45b138fb';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal'), '', 0, Templates.Modal.__deltemplate_s32_45b138fb);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s38_df8ef55a = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="modal component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s38_df8ef55a.soyTemplateName = 'Templates.Modal.__deltemplate_s38_df8ef55a';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal'), 'element', 0, Templates.Modal.__deltemplate_s38_df8ef55a);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s46_90747620 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.body'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Modal.body(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s46_90747620.soyTemplateName = 'Templates.Modal.__deltemplate_s46_90747620';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.body'), '', 0, Templates.Modal.__deltemplate_s46_90747620);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s51_231e36e7 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.footer'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Modal.footer(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s51_231e36e7.soyTemplateName = 'Templates.Modal.__deltemplate_s51_231e36e7';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.footer'), '', 0, Templates.Modal.__deltemplate_s51_231e36e7);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Modal.__deltemplate_s56_b8354b7d = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Modal.header'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Modal.header(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Modal.__deltemplate_s56_b8354b7d.soyTemplateName = 'Templates.Modal.__deltemplate_s56_b8354b7d';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Modal.header'), '', 0, Templates.Modal.__deltemplate_s56_b8354b7d);

Templates.Modal.body.params = ["body"];
Templates.Modal.footer.params = ["footer"];
Templates.Modal.header.params = ["header"];
/* jshint ignore:end */
