/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from Treeview.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Treeview.
 * @hassoydeltemplate {Treeview}
 * @hassoydeltemplate {Treeview.node}
 * @hassoydeltemplate {Treeview.nodes}
 * @hassoydelcall {Treeview}
 * @hassoydelcall {Treeview.node}
 * @hassoydelcall {Treeview.nodes}
 */

if (typeof Templates.Treeview == 'undefined') { Templates.Treeview = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.content = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Treeview.nodes'), '', true)(opt_data, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Treeview.content.soyTemplateName = 'Templates.Treeview.content';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.nodes = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var nodeList5 = opt_data.nodes;
  var nodeListLen5 = nodeList5.length;
  for (var nodeIndex5 = 0; nodeIndex5 < nodeListLen5; nodeIndex5++) {
    var nodeData5 = nodeList5[nodeIndex5];
    var index__soy6 = nodeIndex5;
    output += soy.$$getDelegateFn(soy.$$getDelTemplateId('Treeview.node'), '', true)({id: opt_data.id, node: nodeData5, surfaceId: opt_data.parentSurfaceId != null ? opt_data.parentSurfaceId + '-' + index__soy6 : index__soy6}, null, opt_ijData);
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.Treeview.nodes.soyTemplateName = 'Templates.Treeview.nodes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.node = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((opt_data.node) ? '<div class="treeview-node-wrapper ' + soy.$$escapeHtmlAttribute(opt_data.node.expanded ? 'expanded' : '') + '"><div class="treeview-node-main clearfix ' + soy.$$escapeHtmlAttribute(opt_data.node.children ? 'hasChildren' : '') + '" data-onclick="handleNodeClicked_">' + ((opt_data.node.children) ? '<div class="treeview-node-toggler"></div>' : '') + '<span class="treeview-node-name">' + soy.$$escapeHtml(opt_data.node.name) + '</span></div>' + ((opt_data.node.children) ? soy.$$getDelegateFn(soy.$$getDelTemplateId('Treeview.nodes'), '', true)({id: opt_data.id, nodes: opt_data.node.children, parentSurfaceId: opt_data.surfaceId}, null, opt_ijData) : '') + '</div>' : '');
};
if (goog.DEBUG) {
  Templates.Treeview.node.soyTemplateName = 'Templates.Treeview.node';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.__deltemplate_s33_97f15e76 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-' + soy.$$escapeHtmlAttribute(opt_data.surfaceId) + '" class="treeview-nodes">' + soy.$$escapeHtml(opt_data.elementContent) + '</ul>');
};
if (goog.DEBUG) {
  Templates.Treeview.__deltemplate_s33_97f15e76.soyTemplateName = 'Templates.Treeview.__deltemplate_s33_97f15e76';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Treeview.nodes'), 'element', 0, Templates.Treeview.__deltemplate_s33_97f15e76);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.__deltemplate_s41_9bb13687 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-' + soy.$$escapeHtmlAttribute(opt_data.surfaceId) + '" class="treeview-node">' + soy.$$escapeHtml(opt_data.elementContent) + '</li>');
};
if (goog.DEBUG) {
  Templates.Treeview.__deltemplate_s41_9bb13687.soyTemplateName = 'Templates.Treeview.__deltemplate_s41_9bb13687';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Treeview.node'), 'element', 0, Templates.Treeview.__deltemplate_s41_9bb13687);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.__deltemplate_s49_bcc6b7e7 = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Treeview'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Treeview.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Treeview.__deltemplate_s49_bcc6b7e7.soyTemplateName = 'Templates.Treeview.__deltemplate_s49_bcc6b7e7';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Treeview'), '', 0, Templates.Treeview.__deltemplate_s49_bcc6b7e7);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.__deltemplate_s55_9da5f16b = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="treeview component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.Treeview.__deltemplate_s55_9da5f16b.soyTemplateName = 'Templates.Treeview.__deltemplate_s55_9da5f16b';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Treeview'), 'element', 0, Templates.Treeview.__deltemplate_s55_9da5f16b);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.__deltemplate_s63_91ba2bf6 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Treeview.nodes'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Treeview.nodes(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Treeview.__deltemplate_s63_91ba2bf6.soyTemplateName = 'Templates.Treeview.__deltemplate_s63_91ba2bf6';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Treeview.nodes'), '', 0, Templates.Treeview.__deltemplate_s63_91ba2bf6);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.__deltemplate_s68_23e29483 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('Treeview.node'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.Treeview.node(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.Treeview.__deltemplate_s68_23e29483.soyTemplateName = 'Templates.Treeview.__deltemplate_s68_23e29483';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('Treeview.node'), '', 0, Templates.Treeview.__deltemplate_s68_23e29483);

Templates.Treeview.nodes.params = ["id","nodes"];
Templates.Treeview.node.params = ["id","node","surfaceId"];
export default Templates.Treeview;
/* jshint ignore:end */
