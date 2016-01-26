'use strict';

import dom from 'npm:metal/src/dom/dom';
import ListBase from './List.soy.js';
import './ListItem.js';

/**
 * List component.
 */
class List extends ListBase {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);
	}

	/**
	 * Handles click event on the list. The function fires an
	 * {@code itemSelected} event.
	 * @param {!Event} event The native click event
	 */
	handleClick(event) {
		var target = event.target;
		while (target) {
			if (dom.match(target, '.listitem')) {
				break;
			}
			target = target.parentNode;
		}
		this.emit('itemSelected', target);
	}
}

/**
 * Default list elementClasses.
 * @default list
 * @type {string}
 * @static
 */
List.ELEMENT_CLASSES = 'list';

/**
 * List attributes definition.
 * @type {!Object}
 * @static
 */
List.ATTRS = {
	/**
	 * The list items. Each is represented by an object that can have the following keys:
	 *   - textPrimary: The item's main content.
	 *   - textSecondary: (Optional) The item's help content.
	 *   - icons: (Optional) A list of icon css classes to render on the right side.
	 *   - iconsHtml: (Optional) A list of icon css classes to render on the right side.
	 *   - avatar: (Optional) An object that specifies the avatar's content and, optionally, a css
	 *       class it should use.
	 * @type {!Array<!Object>}
	 * @default []
	 */
	items: {
		validator: Array.isArray,
		valueFn: function() {
			return [];
		}
	},

	/**
	 * The list items as HTML to be added directly to the list.
	 * @type {string}
	 */
	itemsHtml: {
	}
};

export default List;
