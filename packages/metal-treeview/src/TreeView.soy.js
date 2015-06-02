/* jshint ignore:start */
import ComponentRegistry from 'bower:metaljs/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from TreeView.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.TreeView.
 * @hassoydeltemplate {TreeView}
 * @hassoydelcall {TreeView}
 */

if (typeof Templates.TreeView == 'undefined') { Templates.TreeView = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('');
};
if (goog.DEBUG) {
  Templates.TreeView.content.soyTemplateName = 'Templates.TreeView.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.__deltemplate_s3_13da0f6e = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('TreeView'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.TreeView.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.TreeView.__deltemplate_s3_13da0f6e.soyTemplateName = 'Templates.TreeView.__deltemplate_s3_13da0f6e';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('TreeView'), '', 0, Templates.TreeView.__deltemplate_s3_13da0f6e);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.__deltemplate_s9_38810b2c = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="treeview component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.TreeView.__deltemplate_s9_38810b2c.soyTemplateName = 'Templates.TreeView.__deltemplate_s9_38810b2c';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('TreeView'), 'element', 0, Templates.TreeView.__deltemplate_s9_38810b2c);

/* jshint ignore:end */
