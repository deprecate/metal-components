'use strict';

import ListItemBase from './ListItem.soy.js';

/**
 * List component.
 */
class ListItem extends ListItemBase {
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

export default ListItem;
