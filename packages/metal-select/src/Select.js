'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import SelectBase from './Select.soy';
import 'bower:metal-dropdown/src/Dropdown';

/**
 * Responsible for rendering and handling a custom select component, based
 * on `Dropdown`.
 */
class Select extends SelectBase {
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
	 * Focuses the option at the given index.
	 * @param {number} index
	 * @protected
	 */
	focusIndex_(index) {
		var option = this.element.querySelector('.select-option:nth-child(' + (index + 1) + ') a');
		if (option) {
			this.focusedIndex_ = index;
			option.focus();
		}
	}

	/**
	 * Gets the `Dropdown` instance used by this `Select`.
	 * @return {!Dropdown}
	 */
	getDropdown() {
		return this.components[this.id + '-dropdown'];
	}

	/**
	 * Handles a `attrsSynced` event for the dropdown.
	 * @param {!Object} data
	 * @protected
	 */
	handleDropdownAttrsSynced_(data) {
		if (this.openedWithKeyboard_) {
			// This is done on `attrsSynced` because the items need to have already
			// been made visible before we try focusing them.
			this.focusIndex_(0);
			this.openedWithKeyboard_ = false;
		} else if (data.changes.expanded) {
			this.focusedIndex_ = null;
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
		this.getDropdown().close();
		event.preventDefault();
	}

	/**
	 * Handles a `keydown` event on this component. Handles keyboard controls.
	 * @param {!Event} event
	 * @protected
	 */
	handleKeyDown_(event) {
		if (this.getDropdown().expanded) {
			switch (event.keyCode) {
				case 27:
					this.getDropdown().close();
					break;
				case 38:
					this.focusedIndex_ = core.isDefAndNotNull(this.focusedIndex_) ? this.focusedIndex_ : 1;
					this.focusIndex_(this.focusedIndex_ === 0 ? this.items.length - 1 : this.focusedIndex_ - 1);
					event.preventDefault();
					break;
				case 40:
					this.focusedIndex_ = core.isDefAndNotNull(this.focusedIndex_) ? this.focusedIndex_ : -1;
					this.focusIndex_(this.focusedIndex_ === this.items.length - 1 ? 0 : this.focusedIndex_ + 1);
					event.preventDefault();
					break;
			}
		} else if ((event.keyCode === 13 || event.keyCode === 32) && dom.hasClass(event.target, 'dropdown-select')) {
			this.openedWithKeyboard_ = true;
			this.getDropdown().open();
			event.preventDefault();
			return;
		}
	}
}

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
Select.ATTRS = {
	/**
	 * The CSS class used by the select menu arrow.
	 * @type {string}
	 * @default 'caret'
	 */
	arrowClass: {
		value: 'caret'
	},

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
	 * @type {string}
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

export default Select;
