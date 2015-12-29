/* jshint ignore:start */
import Component from 'bower:metal/src/component/Component';
import SoyAop from 'bower:metal/src/soy/SoyAop';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
var Templates = SoyTemplates.get();
// This file was automatically generated from Treeview.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Templates.Treeview.
 */

if (typeof Templates.Treeview == 'undefined') { Templates.Treeview = {}; }


/**
 * @param {Object.<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object.<string, *>=} opt_ijData
 * @return {!soydata.SanitizedHtml}
 * @suppress {checkTypes}
 */
Templates.Treeview.render = function(opt_data, opt_ignored, opt_ijData) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '" class="treeview component' + soy.$$escapeHtmlAttribute(opt_data.elementClasses ? ' ' + opt_data.elementClasses : '') + '" role="tree">' + Templates.Treeview.nodes(opt_data, null, opt_ijData) + '</div>');
};
if (goog.DEBUG) {
  Templates.Treeview.render.soyTemplateName = 'Templates.Treeview.render';
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
  var elementId__soy11 = opt_data.id + '-' + (opt_data.surfaceId != null ? opt_data.surfaceId : 'nodes');
  output += '<ul id="' + soy.$$escapeHtmlAttribute(elementId__soy11) + '" class="treeview-nodes">';
  var nodeList15 = opt_data.nodes;
  var nodeListLen15 = nodeList15.length;
  for (var nodeIndex15 = 0; nodeIndex15 < nodeListLen15; nodeIndex15++) {
    var nodeData15 = nodeList15[nodeIndex15];
    var index__soy16 = nodeIndex15;
    output += Templates.Treeview.node({id: opt_data.id, node: nodeData15, surfaceId: opt_data.parentSurfaceId != null ? opt_data.parentSurfaceId + '-' + index__soy16 : index__soy16}, null, opt_ijData);
  }
  output += '</ul>';
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
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<li id="' + soy.$$escapeHtmlAttribute(opt_data.id) + '-' + soy.$$escapeHtmlAttribute(opt_data.surfaceId) + '" class="treeview-node">' + ((opt_data.node) ? '<div class="treeview-node-wrapper' + soy.$$escapeHtmlAttribute(opt_data.node.expanded ? ' expanded' : '') + '"><div class="treeview-node-main clearfix' + soy.$$escapeHtmlAttribute(opt_data.node.children ? ' hasChildren' : '') + '" data-onclick="handleNodeClicked_" data-onkeyup="handleNodeKeyUp_" aria-expanded="' + soy.$$escapeHtmlAttribute(opt_data.node.expanded ? 'true' : 'false') + '" role="treeitem" tabindex="0">' + ((opt_data.node.children) ? '<div class="treeview-node-toggler"></div>' : '') + '<span class="treeview-node-name">' + soy.$$escapeHtml(opt_data.node.name) + '</span></div>' + ((opt_data.node.children) ? Templates.Treeview.nodes({id: opt_data.id, nodes: opt_data.node.children, parentSurfaceId: opt_data.surfaceId, surfaceId: opt_data.surfaceId + '-nodes'}, null, opt_ijData) : '') + '</div>' : '') + '</li>');
};
if (goog.DEBUG) {
  Templates.Treeview.node.soyTemplateName = 'Templates.Treeview.node';
}

Templates.Treeview.render.params = ["id"];
Templates.Treeview.nodes.params = ["id","nodes","parentSurfaceId","surfaceId"];
Templates.Treeview.node.private = true;

class Treeview extends Component {}
Treeview.RENDERER = SoyRenderer;
SoyAop.registerTemplates('Treeview');
export default Treeview;
/* jshint ignore:end */
