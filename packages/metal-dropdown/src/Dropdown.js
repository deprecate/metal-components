'use strict';

import dom from 'bower:metal/src/dom/dom';
import EventHandler from 'bower:metal/src/events/EventHandler';
import DropdownBase from './Dropdown.soy';
import SoyRenderer from 'bower:metal/src/soy/SoyRenderer';

/**
 * Dropdown component.
 */
class Dropdown extends DropdownBase {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);
		this.eventHandler_ = new EventHandler();
	}

	/**
	 * @inheritDoc
	 */
	attached() {
		super.attached();
		this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
	}

	/**
	 * @inheritDoc
	 */
	detached() {
		super.detached();
		this.eventHandler_.removeAllListeners();
	}

	/**
	 * Closes the dropdown.
	 */
	close() {
		this.expanded = false;
	}

	/**
	 * Checks if the dropdown is currently open.
	 * @return {boolean}
	 */
	isOpen() {
		return this.expanded;
	}

	/**
	 * Handles document click in order to hide menu.
	 * @param {!Event} event
	 * @protected
	 */
	handleDocClick_(event) {
		if (this.element.contains(event.target)) {
			return;
		}
		this.close();
	}

	/**
	 * Opens the dropdown.
	 */
	open() {
		this.expanded = true;
	}

	/**
	 * Synchronization logic for `expanded` attribute.
	 * @param {boolean} expanded
	 */
	syncExpanded(expanded) {
		if (expanded) {
			dom.addClasses(this.element, 'open');
		} else {
			dom.removeClasses(this.element, 'open');
		}
	}

	/**
	 * Synchronization logic for `position` attribute.
	 * @param {string} position
	 * @param {string} oldPosition
	 */
	syncPosition(position, oldPosition) {
		if (oldPosition) {
			dom.removeClasses(this.element, 'drop' + oldPosition.toLowerCase());
		}
		dom.addClasses(this.element, 'drop' + position.toLowerCase());
	}

	/**
	 * Toggles the dropdown, closing it when open or opening it when closed.
	 */
	toggle() {
		this.expanded = !this.expanded;
	}

	/**
	 * Validator for the `position` attribute.
	 * @param {string} position
	 * @return {boolean}
	 * @protected
	 */
	validatePosition_(position) {
		switch (position.toLowerCase()) {
			case 'up':
			case 'down':
				return true;
			default:
				return false;
		}
	}

	/**
	 * Gets the default value for the `body` attribute. Retrieves existing
	 * html for the body from the element, if there is any.
	 * @return {?string}
	 */
	valueBodyFn_() {
		var dropdownMenu = this.element && this.element.querySelector('.dropdown-menu');
		return dropdownMenu ? dropdownMenu.innerHTML : '';
	}

	/**
	 * Gets the default value for the `header` attribute. Retrieves existing
	 * html for the header from the element, if there is any.
	 * @return {?string}
	 */
	valueHeaderFn_() {
		if (this.element) {
			var wrapper = document.createElement('div');
			for (var i = 0; i < this.element.childNodes.length; i++) {
				if (dom.hasClass(this.element.childNodes[i], 'dropdown-menu')) {
					break;
				}
				wrapper.appendChild(this.element.childNodes[i].cloneNode(true));
			}
			return wrapper.innerHTML;
		}
		return '';
	}
}

/**
 * Attrbutes definition.
 * @type {!Object}
 * @static
 */
Dropdown.ATTRS = {
	/**
	 * The dropdown's body content.
	 * @type {string}
	 */
	body: {
		setter: SoyRenderer.sanitizeHtml,
		valueFn: 'valueBodyFn_'
	},

	/**
	 * The dropdown's header content.
	 * @type {string}
	 */
	header: {
		setter: SoyRenderer.sanitizeHtml,
		valueFn: 'valueHeaderFn_'
	},

	/**
	 * Flag indicating if the dropdown is expanded (open) or not.
	 * @type {boolean}
	 * @default false
	 */
	expanded: {
		value: false
	},

	/**
	 * The position of the dropdown (either 'up' or 'down').
	 * @type {string}
	 * @default 'down'
	 */
	position: {
		value: 'down',
		validator: 'validatePosition_'
	}
};

/**
 * Default dropdown elementClasses.
 * @default dropdown
 * @type {string}
 * @static
 */
Dropdown.ELEMENT_CLASSES = 'dropdown';

export default Dropdown;
