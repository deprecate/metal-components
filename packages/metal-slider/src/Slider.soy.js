/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Slider.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Slider.
 * @hassoydeltemplate {Slider}
 * @hassoydeltemplate {Slider.input}
 * @hassoydeltemplate {Slider.label}
 * @hassoydeltemplate {Slider.rail}
 * @hassoydelcall {Slider}
 * @hassoydelcall {Slider.input}
 * @hassoydelcall {Slider.label}
 * @hassoydelcall {Slider.rail}
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="slider component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + Templates.Slider.input(opt_data, null, opt_ijData) + Templates.Slider.label(opt_data, null, opt_ijData) + Templates.Slider.rail(opt_data, null, opt_ijData) + '</div>');
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
Templates.Slider.input = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-input"><input name="' + soy.$$escapeHtmlAttribute(opt_data.inputName ? opt_data.inputName : opt_data.id) + '" type="hidden" value="' + soy.$$escapeHtmlAttribute(opt_data.value) + '"></div>');
};
if (goog.DEBUG) {
  Templates.Slider.input.soyTemplateName = 'Templates.Slider.input';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.label = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-label"><span>' + soy.$$escapeHtml(opt_data.value) + '</span></div>');
};
if (goog.DEBUG) {
  Templates.Slider.label.soyTemplateName = 'Templates.Slider.label';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.rail = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-rail"><div class="rail" data-onmousedown="onRailMouseDown_"><div class="rail-active"></div><div class="rail-handle"><div class="handle" tabindex="0"></div></div></div></div>');
};
if (goog.DEBUG) {
  Templates.Slider.rail.soyTemplateName = 'Templates.Slider.rail';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s30_9ba724a7 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Slider'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Slider.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s30_9ba724a7.soyTemplateName = 'Templates.Slider.__deltemplate_s30_9ba724a7';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider'), '', 0, Templates.Slider.__deltemplate_s30_9ba724a7);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s36_d5c3b9a6 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="slider component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s36_d5c3b9a6.soyTemplateName = 'Templates.Slider.__deltemplate_s36_d5c3b9a6';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider'), 'element', 0, Templates.Slider.__deltemplate_s36_d5c3b9a6);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s44_7f0f645b = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var elementId__soy45 = (opt_data.id ? opt_data.id : '') + '-' + (opt_data.surfaceId != null ? opt_data.surfaceId : 'input');
  output += '<div id="' + soy.$$escapeHtmlAttribute(elementId__soy45) + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s44_7f0f645b.soyTemplateName = 'Templates.Slider.__deltemplate_s44_7f0f645b';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider.input'), 'element', 0, Templates.Slider.__deltemplate_s44_7f0f645b);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s51_cdcb45ca = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Slider.input'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Slider.input(opt_data, null, opt_ijData)), id: opt_data.id, surfaceId: opt_data.surfaceId}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s51_cdcb45ca.soyTemplateName = 'Templates.Slider.__deltemplate_s51_cdcb45ca';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider.input'), '', 0, Templates.Slider.__deltemplate_s51_cdcb45ca);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s57_103f6c5b = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var elementId__soy58 = (opt_data.id ? opt_data.id : '') + '-' + (opt_data.surfaceId != null ? opt_data.surfaceId : 'label');
  output += '<div id="' + soy.$$escapeHtmlAttribute(elementId__soy58) + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s57_103f6c5b.soyTemplateName = 'Templates.Slider.__deltemplate_s57_103f6c5b';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider.label'), 'element', 0, Templates.Slider.__deltemplate_s57_103f6c5b);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s64_ec914241 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Slider.label'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Slider.label(opt_data, null, opt_ijData)), id: opt_data.id, surfaceId: opt_data.surfaceId}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s64_ec914241.soyTemplateName = 'Templates.Slider.__deltemplate_s64_ec914241';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider.label'), '', 0, Templates.Slider.__deltemplate_s64_ec914241);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s70_b374ec5e = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var elementId__soy71 = (opt_data.id ? opt_data.id : '') + '-' + (opt_data.surfaceId != null ? opt_data.surfaceId : 'rail');
  output += '<div id="' + soy.$$escapeHtmlAttribute(elementId__soy71) + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>';
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s70_b374ec5e.soyTemplateName = 'Templates.Slider.__deltemplate_s70_b374ec5e';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider.rail'), 'element', 0, Templates.Slider.__deltemplate_s70_b374ec5e);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Slider.__deltemplate_s77_970c9793 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Slider.rail'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Slider.rail(opt_data, null, opt_ijData)), id: opt_data.id, surfaceId: opt_data.surfaceId}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Slider.__deltemplate_s77_970c9793.soyTemplateName = 'Templates.Slider.__deltemplate_s77_970c9793';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Slider.rail'), '', 0, Templates.Slider.__deltemplate_s77_970c9793);

Templates.Slider.content.params = ["id"];
Templates.Slider.input.params = ["id","inputName","value"];
Templates.Slider.label.params = ["id","value"];
Templates.Slider.rail.params = ["id"];
export default Templates.Slider;
/* jshint ignore:end */
