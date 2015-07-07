/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Slider.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Slider.
 * @hassoydeltemplate {Slider}
 * @hassoydelcall {Slider}
 */

if (typeof Templates.Slider == 'undefined') { Templates.Slider = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  Templates.Slider.content.soyTemplateName = 'Templates.Slider.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s3_9ba724a7 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Slider'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Slider.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s3_9ba724a7.soyTemplateName = 'Templates.Slider.__deltemplate_s3_9ba724a7';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider'), '', 0, Templates.Slider.__deltemplate_s3_9ba724a7);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s9_d5c3b9a6 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="slider component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s9_d5c3b9a6.soyTemplateName = 'Templates.Slider.__deltemplate_s9_d5c3b9a6';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider'), 'element', 0, Templates.Slider.__deltemplate_s9_d5c3b9a6);

export default Templates.Slider;
/* jshint ignore:end */
