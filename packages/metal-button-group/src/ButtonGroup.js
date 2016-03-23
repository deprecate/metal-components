'use strict';

import core from 'metal';
import Component from 'metal-component';
import Soy from 'metal-soy';

import templates from './ButtonGroup.soy';

/**
 * Responsible for handling groups of buttons.
 */
class ButtonGroup extends Component {
	/**
	 * Handles a `click` event fired on one of the buttons. Appropriately selects
	 * or deselects the clicked button.
	 * @param {!Event} event
	 * @protected
	 */
	handleClick_(event) {
		var button = event.delegateTarget;
		var index = button.getAttribute('data-index');
		var selectedIndex = this.selected.indexOf(this.buttons[index].label);
		if (selectedIndex === -1) {
			this.selected.push(this.buttons[index].label);
			this.selected = this.selected;
		} else if (this.selected.length > this.minSelected) {
			this.selected.splice(selectedIndex, 1);
			this.selected = this.selected;
		}
	}

	/**
	 * Setter function for the `selected` state. Checks if the minimum number
	 * of buttons is selected. If not, the remaining number of buttons needed to
	 * reach the minimum will be selected.
	 * @param {!Object<number, boolean>|!Array<string>} selected
	 * @return {!Object<number, boolean>}
	 * @protected
	 */
	setterSelectedFn_(selected) {
		var minSelected = Math.min(this.minSelected, this.buttons.length);
		var i = 0;
		while (selected.length < minSelected) {
			if (selected.indexOf(this.buttons[i].label) === -1) {
				selected.push(this.buttons[i].label);
			}
			i++;
		}
		return selected;
	}
}
Soy.register(ButtonGroup, templates);

/**
 * State definition.
 * @type {!Object}
 * @static
 */
ButtonGroup.STATE = {
	/**
	 * Configuration for the buttons that should be rendered in this group.
	 * Each button config should be given as an object. Supported options are:
	 * label, type and cssClass.
	 * @type {!Array<!Object>}
	 * @default []
	 */
	buttons: {
		validator: val => val instanceof Array,
		valueFn: function() {
			return [];
		}
	},

	/**
	 * The minimum number of buttons that need to be selected at a time. If the
	 * minimum number of buttons is not already initially selected, this will
	 * automaticaly select the first `minSelected` buttons.
	 * @type {number}
	 * @default 0
	 */
	minSelected: {
		validator: core.isNumber,
		value: 0,
		writeOnce: true
	},

	/**
	 * An array with the labels of the buttons that should be selected.
	 * @type {!Array<string>}
	 */
	selected: {
		setter: 'setterSelectedFn_',
		validator: Array.isArray,
		valueFn: function() {
			return [];
		}
	}
};

/**
 * The CSS class added to selected buttons.
 * @type {string}
 * @static
 */
ButtonGroup.SELECTED_CLASS = 'btn-group-selected';

export default ButtonGroup;
