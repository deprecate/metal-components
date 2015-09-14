'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import './Switcher.soy.js';

/**
 * Switcher component.
 */
class Switcher extends SoyComponent {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);
	}

	/**
	 * @inheritDoc
	 */
	attached() {
		this.on('click', this.handleClick);
	}

	/**
	 * Handles switcher click.
	 */
	handleClick() {
		this.checked = !this.checked;
	}

	/**
	 * Synchronization logic for the `checked` attribute.
	 * @param {boolean} checked
	 */
	syncChecked(checked) {
		dom[checked ? 'addClasses' : 'removeClasses'](this.element, 'switcher-on');
	}
}

/**
 * Default switcher elementClasses.
 * @default list
 * @type {string}
 * @static
 */
Switcher.ELEMENT_CLASSES = 'switcher';

/**
 * Switcher attributes definition.
 * @type {!Object}
 * @static
 */
Switcher.ATTRS = {
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

ComponentRegistry.register('Switcher', Switcher);

export default Switcher;
