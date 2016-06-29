'use strict';

import core from 'metal';
import templates from './Switcher.soy.js';
import Component from 'metal-component';
import Soy from 'metal-soy';

/**
 * Switcher component.
 */
class Switcher extends Component {
	/**
	 * Handles switcher click.
	 */
	handleClick() {
		this.checked = !this.checked;
	}
}

/**
 * Switcher state definition.
 * @type {!Object}
 * @static
 */
Switcher.STATE = {
	/**
	 * Flag indicating if the switcher is currently checked or not.
	 * @type {boolean}
	 * @default false
	 */
	checked: {
		validator: core.isBoolean,
		value: false
	}
};
Soy.register(Switcher, templates);

export default Switcher;
