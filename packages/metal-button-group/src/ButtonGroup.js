'use strict';

import core from 'bower:metal/src/core';
import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';
import './ButtonGroup.soy';

/**
 * Responsible for handling groups of buttons.
 */
class ButtonGroup extends SoyComponent {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);

		this.buttonElements_ = null;

		this.on('selectedChanged', this.defaultSelectedChanged_, true);
	}

	/**
	 * The default behavior of the `selectedChanged` event. Adds or removes the CSS
	 * class defined by `ButtonGroup.SELECTED_CLASS` to each button.
	 * @param {!Object} event
	 * @protected
	 */
	defaultSelectedChanged_(event) {
		for (var i = 0; i < this.buttonElements_.length; i++) {
			if (event.newVal.indexOf(this.buttons[i].label) !== -1) {
				dom.addClasses(this.buttonElements_[i], ButtonGroup.SELECTED_CLASS);
			} else {
				dom.removeClasses(this.buttonElements_[i], ButtonGroup.SELECTED_CLASS);
			}
		}
	}

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
	 * Setter function for the `selected` attribute. Checks if the minimum number
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

	/**
	 * Called whenever the `buttons` attr changes, as well as on the first
	 * render. This just stores the new button elements for later use.
	 */
	syncButtons() {
		this.buttonElements_ = this.element.querySelectorAll('button');
	}
}

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
ButtonGroup.ATTRS = {
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
 * Default element classes.
 * @type {string}
 * @static
 */
ButtonGroup.ELEMENT_CLASSES = 'btn-group';

/**
 * The CSS class added to selected buttons.
 * @type {string}
 * @static
 */
ButtonGroup.SELECTED_CLASS = 'btn-group-selected';

ComponentRegistry.register('ButtonGroup', ButtonGroup);

export default ButtonGroup;
