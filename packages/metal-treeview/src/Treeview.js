'use strict';

import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import dom from 'bower:metal/src/dom/dom';
import './Treeview.soy';

/**
 * Treeview component.
 */
class Treeview extends SoyComponent {
	/**
	 * Called after this component has been attached to the dom.
	 */
	attached() {
		this.on('nodesChanged', this.onNodesChanged_);
		this.on('renderSurface', this.handleRenderSurface_);
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
	 * This is called when one of this tree view's nodes is clicked.
	 * @param {Event} event
	 * @protected
	 */
	handleNodeClicked_(event) {
		event.preventDefault();
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
	 * Handles a `renderSurface` event. Prevents rerendering surfaces when the changes
	 * the surface was caused by a ui event that has already updated the screen.
	 * @param {!Object} data
	 * @param {!Object} event
	 * @protected
	 */
	handleRenderSurface_(data, event) {
		if (this.ignoreSurfaceUpdate_) {
			event.preventDefault();
			this.ignoreSurfaceUpdate_ = false;
		}
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
