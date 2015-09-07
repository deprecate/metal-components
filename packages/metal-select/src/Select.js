'use strict';

import core from 'bower:metal/src/core';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import 'bower:steel-dropdown/src/Dropdown';
import './Select.soy';

/**
 * Responsible for rendering and handling a custom select component, based
 * on `Dropdown`.
 */
class Select extends SoyComponent {
	/**
	 * Finds the index of the given element in the items array.
	 * @param {!Element} element
	 * @return {number}
	 * @protected
	 */
	findItemIndex_(element) {
		var items = this.element.querySelectorAll('li');
		for (var i = 0; i < items.length; i++) {
			if (items.item(i) === element) {
				return i;
			}
		}
	}

	/**
	 * Handles a `click` event on one of the items. Updates `selectedIndex`
	 * accordingly.
	 * @param {!Event} event
	 * @protected
	 */
	handleItemClick_(event) {
		this.selectedIndex = this.findItemIndex_(event.delegateTarget);
		this.components[this.id + '-dropdown'].close();
		event.preventDefault();
	}

}

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
Select.ATTRS = {
	/**
	 * The CSS class used by the select menu button.
	 * @type {string}
	 * @default 'btn btn-default'
	 */
	buttonClass: {
		validator: core.isString,
		value: 'btn btn-default'
	},

	/**
	 * The name of the hidden input field
	 * @type {string}
	 */
	hiddenInputName: {
		validator: core.isString
	},

	/**
	 * A list representing the select dropdown items. Can be either already a list
	 * of objects specifying both name and value for each item, or just a list of
	 * names, in which case the values will be the indexes where the names show up
	 * on the list.
	 * @type {!Array<string>|!Array<!{name: string, value: string}>}
	 * @default []
	 */
	items: {
		validator: val => val instanceof Array,
		valueFn: function() {
			return [];
		}
	},

	/**
	 * The label that should be used for the select menu when no item is
	 * selected. If not set, the first item will be selected automatically.
	 * @type {Object}
	 */
	label: {
		validator: core.isString
	},

	/**
	 * The index of the currently selected item, or -1 if none is selected.
	 * @type {number}
	 */
	selectedIndex: {
		validator: core.isNumber,
		valueFn: function() {
			return this.label || !this.items.length ? -1 : 0;
		}
	}
};

/**
 * Default element classes.
 * @type {string}
 * @static
 */
Select.ELEMENT_CLASSES = 'select';

ComponentRegistry.register('Select', Select);

export default Select;
