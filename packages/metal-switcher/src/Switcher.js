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
	 * @inheritDoc
	 */
	syncChecked(checked) {
		dom[checked ? 'addClasses' : 'removeClasses'](this.element, 'switcher-on');
	}
}

/**
 * Default switcher elementClasses.
 * @default list
 * @type {String}
 * @static
 */
Switcher.ELEMENT_CLASSES = 'switcher';

/**
 * Switcher attributes definition.
 * @type {Object}
 * @static
 */
Switcher.ATTRS = {
	checked: {
		validator: core.isBoolean,
		value: false
	}
};

ComponentRegistry.register('Switcher', Switcher);

export default Switcher;
