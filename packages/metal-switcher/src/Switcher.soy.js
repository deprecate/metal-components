/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Switcher.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Switcher.
 * @hassoydeltemplate {Switcher}
 * @hassoydelcall {Switcher}
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="switcher-control"><div class="switcher-control-icon"></div></div>');
};
if (goog.DEBUG) {
  Templates.Switcher.content.soyTemplateName = 'Templates.Switcher.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Switcher.__deltemplate_s4_73a26937 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Switcher'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Switcher.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Switcher.__deltemplate_s4_73a26937.soyTemplateName = 'Templates.Switcher.__deltemplate_s4_73a26937';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Switcher'), '', 0, Templates.Switcher.__deltemplate_s4_73a26937);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Switcher.__deltemplate_s10_7e34f765 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="switcher component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Switcher.__deltemplate_s10_7e34f765.soyTemplateName = 'Templates.Switcher.__deltemplate_s10_7e34f765';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Switcher'), 'element', 0, Templates.Switcher.__deltemplate_s10_7e34f765);

export default Templates.Switcher;
/* jshint ignore:end */
