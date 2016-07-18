'use strict';

import core from 'metal';
import templates from './LayoutBuilder.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import './columns/LayoutCol';

/**
 * UI Component that can receive data about rows/columns and render them
 * according to bootstrap's 3 grid system.
 */
class LayoutBuilder extends Component {
	/**
	 * Handles a `click` event on a button for removing rows.
	 * @param {!Event} event
	 * @protected
	 */
	handleClickRemove_(event) {
		var element = event.delegateTarget;
		var index = parseInt(element.getAttribute('data-index'), 10);
		this.data.splice(index, 1);
		this.data = this.data;
	}
}

/**
 * State definition.
 * @type {!Object}
 * @static
 */
LayoutBuilder.STATE = {
	/**
	 * An array of rows/columns which defines contents and sizes.
	 * @type {!Array}
	 */
	data: {
		validator: core.isArray,
		valueFn: () => []
	}
};

Soy.register(LayoutBuilder, templates);

export default LayoutBuilder;
