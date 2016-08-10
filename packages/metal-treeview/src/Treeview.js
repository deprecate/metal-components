'use strict';

import templates from './Treeview.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

/**
 * Treeview component.
 */
class Treeview extends Component {
	/**
	 * Gets the node object from the `nodes` state that is located at the given
	 * index path.
	 * @param {!Array<number>} path An array of indexes indicating where the searched
	 *   node is located inside the `nodes` state.
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
	 * This is called when one of this tree view's nodes is clicked.
	 * @param {!Event} event
	 * @protected
	 */
	handleNodeClicked_(event) {
		this.toggleExpandedState_(event.delegateTarget.parentNode.parentNode);
	}

	/**
	 * This is called when one of this tree view's nodes receives a keypress.
	 * If the pressed key is ENTER or SPACE, the node's expanded state will be toggled.
	 * @param {!Event} event
	 * @protected
	 */
	handleNodeKeyUp_(event) {
		if (event.keyCode === 13 || event.keyCode === 32) {
			this.toggleExpandedState_(event.delegateTarget);
			event.stopPropagation();
		}
	}

	/**
	 * Toggles the expanded state for the given tree node.
	 * @param {!Element} node
	 * @protected
	 */
	toggleExpandedState_(node) {
		var path = node.getAttribute('data-treeview-path').split('-');
		var nodeObj = this.getNodeObj(path);
		nodeObj.expanded = !nodeObj.expanded;
		this.nodes = this.nodes;
	}
}
Soy.register(Treeview, templates);

/**
 * Treeview state definition.
 * @type {!Object}
 * @static
 */
Treeview.STATE = {
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

export default Treeview;
