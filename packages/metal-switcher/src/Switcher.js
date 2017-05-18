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
		if (!this.disabled) {
			this.checked = !this.checked;
		}
	}

	/**
	 * Handles switcher keyboard press.
	 */
	handleKeyUp() {
		if (event.keyCode === 13 || event.keyCode === 32) {
			if (!this.disabled) {
				this.checked = !this.checked;
			}
		}
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
	},
	/**
	 * Flag indicating if the switcher is disabled or not.
	 * @type {boolean}
	 * @default false
	 */
	disabled: {
		validator: core.isBoolean,
		value: false
	}
};
Soy.register(Switcher, templates);

export default Switcher;
