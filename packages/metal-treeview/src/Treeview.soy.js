/* jshint ignore:start */
import Component from 'metal-component/src/Component';
import Soy from 'metal-soy/src/Soy';
var templates;
goog.loadModule(function(exports) {

// This file was automatically generated from Treeview.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace Treeview.
 * @public
 */

goog.module('Treeview.incrementaldom');

var soy = goog.require('soy');
var soydata = goog.require('soydata');
/** @suppress {extraRequire} */
goog.require('goog.i18n.bidi');
/** @suppress {extraRequire} */
goog.require('goog.asserts');
var IncrementalDom = goog.require('incrementaldom');
var ie_open = IncrementalDom.elementOpen;
var ie_close = IncrementalDom.elementClose;
var ie_void = IncrementalDom.elementVoid;
var ie_open_start = IncrementalDom.elementOpenStart;
var ie_open_end = IncrementalDom.elementOpenEnd;
var itext = IncrementalDom.text;
var iattr = IncrementalDom.attr;


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $render(opt_data, opt_ignored, opt_ijData) {
  ie_open('div', null, null,
      'id', opt_data.id,
      'class', 'treeview component' + (opt_data.elementClasses ? ' ' + opt_data.elementClasses : ''),
      'role', 'tree');
    $nodes(opt_data, null, opt_ijData);
  ie_close('div');
}
exports.render = $render;
if (goog.DEBUG) {
  $render.soyTemplateName = 'Treeview.render';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $nodes(opt_data, opt_ignored, opt_ijData) {
  if (opt_data.nodes) {
    ie_open('ul', null, null,
        'class', 'treeview-nodes');
      var nodeList19 = opt_data.nodes;
      var nodeListLen19 = nodeList19.length;
      for (var nodeIndex19 = 0; nodeIndex19 < nodeListLen19; nodeIndex19++) {
        var nodeData19 = nodeList19[nodeIndex19];
        var index__soy15 = nodeIndex19;
        $node({node: nodeData19, path: opt_data.parentPath != null ? opt_data.parentPath + '-' + index__soy15 : index__soy15}, null, opt_ijData);
      }
    ie_close('ul');
  }
}
exports.nodes = $nodes;
if (goog.DEBUG) {
  $nodes.soyTemplateName = 'Treeview.nodes';
}


/**
 * @param {Object<string, *>=} opt_data
 * @param {(null|undefined)=} opt_ignored
 * @param {Object<string, *>=} opt_ijData
 * @return {void}
 * @suppress {checkTypes}
 */
function $node(opt_data, opt_ignored, opt_ijData) {
  ie_open('li', null, null,
      'class', 'treeview-node',
      'data-treeview-path', opt_data.path);
    if (opt_data.node) {
      ie_open('div', null, null,
          'class', 'treeview-node-wrapper' + (opt_data.node.expanded ? ' expanded' : ''));
        ie_open('div', null, null,
            'class', 'treeview-node-main clearfix' + (opt_data.node.children ? ' hasChildren' : ''),
            'data-onclick', 'handleNodeClicked_',
            'data-onkeyup', 'handleNodeKeyUp_',
            'aria-expanded', opt_data.node.expanded ? 'true' : 'false',
            'role', 'treeitem',
            'tabindex', '0');
          if (opt_data.node.children) {
            ie_void('div', null, null,
                'class', 'treeview-node-toggler');
          }
          ie_open('span', null, null,
              'class', 'treeview-node-name');
            itext((goog.asserts.assert((opt_data.node.name) != null), opt_data.node.name));
          ie_close('span');
        ie_close('div');
        $nodes({nodes: opt_data.node.children, parentPath: opt_data.path}, null, opt_ijData);
      ie_close('div');
    }
  ie_close('li');
}
exports.node = $node;
if (goog.DEBUG) {
  $node.soyTemplateName = 'Treeview.node';
}

exports.render.params = ["id","elementClasses","nodes"];
exports.nodes.params = ["nodes","parentPath"];
exports.node.params = ["node","path"];
templates = exports;
return exports;

});

class Treeview extends Component {}
Soy.register(Treeview, templates);
export default templates;
export { Treeview, templates };
/* jshint ignore:end */
