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
			if (event.newVal[i]) {
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
		if (this.selected[index]) {
			delete this.selected[index];
		} else {
			this.selected[index] = true;
		}
		this.selected = this.selected;
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
	 * An object that indicates which buttons are selected. The indices of the
	 * selected buttons will be keys on the object that are set to true.
	 * @type {!Object<number, boolean>}
	 */
	selected: {
		validator: core.isObject,
		valueFn: function() {
			return {};
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
