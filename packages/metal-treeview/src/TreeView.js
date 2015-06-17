'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import dom from 'bower:metal/src/dom/dom';
import './Treeview.soy';

/**
 * Treeview component.
 */
class Treeview extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}

	/**
	 * Called after this component has been attached to the dom.
	 */
	attached() {
		this.on('nodesChanged', this.onNodesChanged_.bind(this));
	}

	/**
	 * Gets the node object from the nodes attribute that is located at the given
	 * index path.
	 * @param {!Array<number>} path An array of indexes indicating where the searched
	 *   node is located inside the nodes attribute.
	 * @return {!Object}
	 */
	getNodeObj(path) {
		var obj = this.nodes[path[0]];
		for (var i = 1; i < path.length; i++) {
			obj = obj.children[path[i]];
		}
		return obj;
	}

	/**
	 * Gets the node object that the given element id represents from the nodes
	 * attribute
	 * @param {string} id
	 * @return {!Object}
	 */
	getNodeObjFromId_(id) {
		var path = id.substr(this.id.length + 1).split('-');
		return this.getNodeObj(path);
	}

	/**
	 * Overrides SoyComponent's original method, skipping it when the flag for
	 * ignoring surface updates is set.
	 * @param {string} surfaceId The surface id.
	 * @return {Object|string} The content to be rendered.
	 * @protected
	 * @override
	 */
	getSurfaceContent_(surfaceId) {
		if (!this.ignoreSurfaceUpdate_) {
			return super.getSurfaceContent_(surfaceId);
		}
		this.ignoreSurfaceUpdate_ = false;
	}

	/**
	 * This is called when one of this tree view's nodes is clicked.
	 * @param {Event} event
	 * @protected
	 */
	handleNodeClicked_(event) {
		var node = event.delegateTarget.parentNode;
		var nodeObj = this.getNodeObjFromId_(node.parentNode.id);
		nodeObj.expanded = !nodeObj.expanded;
		if (nodeObj.expanded) {
			dom.addClasses(node, 'expanded');
		} else {
			dom.removeClasses(node, 'expanded');
		}

		this.nodes = this.nodes;
		this.ignoreSurfaceUpdate_ = true;
	}

	/**
	 * Fired when the `nodes` attribute changes. Make sure that any other
	 * updates to the `nodes` attribute made after ignoreSurfaceUpdate_ is
	 * set to true, cause surfaces to update again.
	 * @return {[type]} [description]
	 */
	onNodesChanged_() {
		this.ignoreSurfaceUpdate_ = false;
	}
}

/**
 * Default tree view elementClasses.
 * @default treeView
 * @type {string}
 * @static
 */
Treeview.ELEMENT_CLASSES = 'treeview';

/**
 * Treeview attributes definition.
 * @type {Object}
 * @static
 */
Treeview.ATTRS = {
	/**
	 * This tree view's nodes. Each node should have a name, and can optionally
	 * have nested children nodes. It should also indicate if its children are
	 * expanded or not.
	 * @type {Array<!{children: Array, expanded: boolean?, name: string}>}
	 * @default []
	 */
	nodes: {
		validator: Array.isArray,
		valueFn: function() {
			return [];
		}
	}
};

ComponentRegistry.register('Treeview', Treeview);

export default Treeview;