'use strict';

import core from 'metal';
import templates from './LayoutCol.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

/**
 * UI Component that can receive data about a column and render it according to
 * bootstrap's 3 grid system.
 */
class LayoutCol extends Component {
}

/**
 * State definition.
 * @type {!Object}
 * @static
 */
LayoutCol.STATE = {
	/**
	 * Content that should be rendered inside the column.
	 * @type {!Array}
	 */
	content: {
		validator: core.isString,
		value: ''
	},

	/**
	 * Size of the column.
	 */
	size: {
		validator: core.isNumber,
		value: 1
	}
};

Soy.register(LayoutCol, templates);

export default LayoutCol;
