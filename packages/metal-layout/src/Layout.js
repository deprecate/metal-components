'use strict';

import core from 'metal';
import templates from './Layout.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';
import './columns/LayoutCol';

/**
 * UI Component that can receive data about rows/columns and render them
 * according to bootstrap's 3 grid system.
 */
class Layout extends Component {
}

/**
 * State definition.
 * @type {!Object}
 * @static
 */
Layout.STATE = {
	/**
	 * An array of rows/columns which defines contents and sizes.
	 * @type {!Array}
	 */
	data: {
		validator: core.isArray,
		valueFn: () => []
	}
};

Soy.register(Layout, templates);

export default Layout;
