/* jshint ignore:start */
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
var Templates = ComponentRegistry.Templates;
// This file was automatically generated from TreeView.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.TreeView.
 * @hassoydeltemplate {TreeView}
 * @hassoydeltemplate {TreeView.node}
 * @hassoydeltemplate {TreeView.nodes}
 * @hassoydelcall {TreeView}
 * @hassoydelcall {TreeView.node}
 * @hassoydelcall {TreeView.nodes}
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('TreeView.nodes'), '', true)(opt_data, null, opt_ijData));
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
Templates.TreeView.nodes = function(opt_data, opt_ignored, opt_ijData) {
  var output = '';
  var nodeList5 = opt_data.nodes;
  var nodeListLen5 = nodeList5.length;
  for (var nodeIndex5 = 0; nodeIndex5 < nodeListLen5; nodeIndex5++) {
    var nodeData5 = nodeList5[nodeIndex5];
    var index__soy6 = nodeIndex5;
    output += soy.$$getDelegateFn(soy.$$getDelTemplateId('TreeView.node'), '', true)({id: opt_data.id, node: nodeData5, surfaceId: opt_data.parentSurfaceId != null ? opt_data.parentSurfaceId + '-' + index__soy6 : index__soy6}, null, opt_ijData);
  }
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(output);
};
if (goog.DEBUG) {
  Templates.TreeView.nodes.soyTemplateName = 'Templates.TreeView.nodes';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.node = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml((opt_data.node) ? '<div class="treeview-node-wrapper ' + soy.$$escapeHtmlAttribute(opt_data.node.expanded ? 'expanded' : '') + '"><div class="treeview-node-main clearfix ' + soy.$$escapeHtmlAttribute(opt_data.node.children ? 'hasChildren' : '') + '" data-onclick="handleNodeClicked_">' + ((opt_data.node.children) ? '<div class="treeview-node-toggler"></div>' : '') + '<span class="treeview-node-name">' + soy.$$escapeHtml(opt_data.node.name) + '</span></div>' + ((opt_data.node.children) ? soy.$$getDelegateFn(soy.$$getDelTemplateId('TreeView.nodes'), '', true)({id: opt_data.id, nodes: opt_data.node.children, parentSurfaceId: opt_data.surfaceId}, null, opt_ijData) : '') + '</div>' : '');
};
if (goog.DEBUG) {
  Templates.TreeView.node.soyTemplateName = 'Templates.TreeView.node';
}


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.__deltemplate_s33_6f4f2112 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<ul id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-' + soy.$$escapeHtmlAttribute(opt_data.surfaceId) + '" class="treeview-nodes">' + soy.$$escapeHtml(opt_data.elementContent) + '</ul>');
};
if (goog.DEBUG) {
  Templates.TreeView.__deltemplate_s33_6f4f2112.soyTemplateName = 'Templates.TreeView.__deltemplate_s33_6f4f2112';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('TreeView.nodes'), 'element', 0, Templates.TreeView.__deltemplate_s33_6f4f2112);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.__deltemplate_s41_68b4c502 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-' + soy.$$escapeHtmlAttribute(opt_data.surfaceId) + '" class="treeview-node">' + soy.$$escapeHtml(opt_data.elementContent) + '</li>');
};
if (goog.DEBUG) {
  Templates.TreeView.__deltemplate_s41_68b4c502.soyTemplateName = 'Templates.TreeView.__deltemplate_s41_68b4c502';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('TreeView.node'), 'element', 0, Templates.TreeView.__deltemplate_s41_68b4c502);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.__deltemplate_s49_13da0f6e = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('TreeView'), 'element', true)({elementClasses: opt_data.elementClasses, elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.TreeView.content(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.TreeView.__deltemplate_s49_13da0f6e.soyTemplateName = 'Templates.TreeView.__deltemplate_s49_13da0f6e';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('TreeView'), '', 0, Templates.TreeView.__deltemplate_s49_13da0f6e);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.__deltemplate_s55_38810b2c = function(opt_data, opt_ignored, opt_ijData) {
  opt_data = opt_data || {};
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="treeview component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '">' + soy.$$escapeHtml(opt_data.elementContent) + '</div>');
};
if (goog.DEBUG) {
  Templates.TreeView.__deltemplate_s55_38810b2c.soyTemplateName = 'Templates.TreeView.__deltemplate_s55_38810b2c';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('TreeView'), 'element', 0, Templates.TreeView.__deltemplate_s55_38810b2c);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.__deltemplate_s63_c801199b = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('TreeView.nodes'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.TreeView.nodes(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.TreeView.__deltemplate_s63_c801199b.soyTemplateName = 'Templates.TreeView.__deltemplate_s63_c801199b';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('TreeView.nodes'), '', 0, Templates.TreeView.__deltemplate_s63_c801199b);


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.TreeView.__deltemplate_s68_f6fc17d6 = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$getDelegateFn(soy.$$getDelTemplateId('TreeView.node'), 'element', true)({elementContent: soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks('' + Templates.TreeView.node(opt_data, null, opt_ijData)), id: opt_data.id}, null, opt_ijData));
};
if (goog.DEBUG) {
  Templates.TreeView.__deltemplate_s68_f6fc17d6.soyTemplateName = 'Templates.TreeView.__deltemplate_s68_f6fc17d6';
}
soy.$$registerDelegateFn(soy.$$getDelTemplateId('TreeView.node'), '', 0, Templates.TreeView.__deltemplate_s68_f6fc17d6);

Templates.TreeView.nodes.params = ["id","nodes"];
Templates.TreeView.node.params = ["id","node","surfaceId"];
export default Templates.TreeView;
/* jshint ignore:end */
