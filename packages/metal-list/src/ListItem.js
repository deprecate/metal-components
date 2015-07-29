'use strict';

import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import './ListItem.soy.js';

/**
 * List component.
 */
class ListItem extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}
}

/**
 * Default list elementClasses.
 * @default list
 * @type {String}
 * @static
 */
ListItem.ELEMENT_CLASSES = 'listitem';

/**
 * List attributes definition.
 * @type {Object}
 * @static
 */
ListItem.ATTRS = {
	item: {
	},

	index: {
		value: -1
	}
};

ComponentRegistry.register('ListItem', ListItem);

export default ListItem;
