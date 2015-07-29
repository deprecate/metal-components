'use strict';

import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import './ListItem.js';
import './List.soy.js';

/**
 * List component.
 */
class List extends SoyComponent {
	constructor(opt_config) {
		super(opt_config);
	}

	/**
	 * Handles click event on the list. The function fires an
	 * {@code itemSelected} event.
	 *
	 * @protected
	 * @param {Event} event The native click event
	 */
	handleClick(event) {
		this.emit('itemSelected', event.delegateTarget);
	}
}

/**
 * Default list elementClasses.
 * @default list
 * @type {String}
 * @static
 */
List.ELEMENT_CLASSES = 'list';

/**
 * List attributes definition.
 * @type {Object}
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
	}
};

ComponentRegistry.register('List', List);

export default List;
