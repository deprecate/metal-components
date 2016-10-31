'use strict';

import core from 'metal';
import debounce from 'metal-debounce';
import dom from 'metal-dom';
import { CancellablePromise as Promise } from 'metal-promise';
import { Align } from 'metal-position';
import AutocompleteBase from './AutocompleteBase';
import Soy from 'metal-soy';

import 'metal-list';
import templates from './Autocomplete.soy.js';

/*
 * Autocomplete component.
 */
class Autocomplete extends AutocompleteBase {
	/**
	 * @inheritDoc
	 */
	attached() {
		super.attached();
		this.setAriaAttributes_();
		this.eventHandler_.add(dom.on(this.inputElement, 'focus', this.handleInputFocus_.bind(this)));
		this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
		this.eventHandler_.add(dom.on(window, 'resize', debounce(this.handleWindowResize_.bind(this), 100)));
		this.eventHandler_.add(dom.on(this.inputElement, 'keydown', this.handleKeyDown_.bind(this)));
		if (this.visible) {
			this.align();
		}
	}

	/**
	 * Aligns main element to the input element.
	 */
	align() {
		this.element.style.width = this.inputElement.offsetWidth + 'px';
		var position = Align.align(this.element, this.inputElement, Align.Bottom);

		dom.removeClasses(this.element, this.positionCss_);
		switch (position) {
			case Align.Top:
			case Align.TopLeft:
			case Align.TopRight:
				this.positionCss_ = 'autocomplete-top';
				break;
			case Align.Bottom:
			case Align.BottomLeft:
			case Align.BottomRight:
				this.positionCss_ = 'autocomplete-bottom';
				break;
			default:
				this.positionCss_ = null;

		}
		dom.addClasses(this.element, this.positionCss_);
	}

	/**
	 * Focuses the option at the given index.
	 * @param {number} index
	 * @protected
	 */
	focusIndex_(index) {
		let option = this.currentList_[index];
		this.focusedIndex_ = index;
		this.inputElement.setAttribute('aria-activedescendant', option.getAttribute('id'));
		this.selectItem_(option);
	}

	/**
	 * Returns the `List` component being used to render the matched items.
	 * @return {!List}
	 */
	getList() {
		return this.components.list;
	}

	/**
	 * Handles action keys interactions.
	 * @param {!Event} event
	 * @protected
	 */
	handleActionKeys_() {
		let selectedItem = this.getList().items[this.focusedIndex_];
		this.selectOption_(selectedItem);
	}

	/**
	 * Handles `click` events, stopping their propagation.
	 * @param {!Event} event
	 * @protected
	 */
	handleClick_(event) {
		event.stopPropagation();
	}

	/**
	 * Handles document click in order to hide autocomplete. If input element is
	 * focused autocomplete will not hide.
	 * @param {!Event} event
	 */
	handleDocClick_() {
		if (document.activeElement === this.inputElement) {
			return;
		}
		this.visible = false;
	}

	/**
	 * Handles input focus.
	 * @param {!Event} event
	 */
	handleInputFocus_() {
		this.unSelectCurrentFocusedItem_();
		this.request(this.inputElement.value);
	}

	/**

	/**
	 * Handles a `keydown` event on this component. Handles keyboard controls.
	 * @param {!Event} event
	 * @protected
	 */
	handleKeyDown_(event) {
		if (this.visible) {
			switch (event.keyCode) {
				case 38:
					this.unSelectCurrentFocusedItem_();
					this.focusIndex_(this.focusedIndex_ === 0 ? this.getList().items.length - 1 : this.focusedIndex_ - 1);
					event.preventDefault();
					break;
				case 40:
					this.unSelectCurrentFocusedItem_();
					this.focusIndex_(this.focusedIndex_ === this.getList().items.length - 1 ? 0 : this.focusedIndex_ + 1);
					event.preventDefault();
					break;
				case 13:
				case 32:
					this.handleActionKeys_();
					event.preventDefault();
				break;
			}
		}
	}
	 * Handles window resize events. Realigns the autocomplete results list to
	 * the input field.
	 */
	handleWindowResize_() {
		if (this.visible) {
			this.align();
		}
	}

	/**
	 * @inheritDoc
	 */
	request(query) {
		if (this.autocompleteClosing_) {
			// While closing the input element will be focused, causing another
			// request. This request should be ignored though, since we wish to close
			// the dropdown list, not open it again.
			return;
		}

		var self = this;
		return super.request(query).then(function(data) {
			if (data) {
				data.forEach(self.assertItemObjectStructure_);
				self.getList().items = data;
			}
			self.visible = !!(data && data.length > 0);
		});
	}

	/**
	 * Adds the CSS class to mark that item as selected.
	 * @protected
	 */
	selectItem_(option) {
		dom.addClasses(option, 'active');
	}

	/**
	 * Emits a `select` event with the information about the selected item and
	 * hides the element.
	 * @param {!Element} item The list selected item.
	 * @protected
	 */
	onListItemSelected_(item) {
		var selectedIndex = parseInt(item.getAttribute('data-index'), 10);
		this.autocompleteClosing_ = true;
		this.emit('select', this.getList().items[selectedIndex]);
		this.visible = false;
		this.autocompleteClosing_ = false;
	}

	/**
	 * Set the required ARIA attributes to the inputElement.
	 * @protected
	 */
	setAriaAttributes_() {
		this.inputElement.setAttribute('aria-activedescendant', '');
		this.inputElement.setAttribute('aria-autocomplete', 'list');
		this.inputElement.setAttribute('aria-haspopup', true);
		this.inputElement.setAttribute('aria-owns', this.id);
		this.inputElement.setAttribute('role', 'combobox');
	}

	/**
	 * Synchronization logic for `visible` state.
	 * @param {boolean} visible
	 */
	syncVisible(visible) {
		super.syncVisible(visible);

		if (visible) {
			this.align();
		}
	}

	/**
	 * Removes the CSS class from that current selected element.
	 * @protected
	 */
	unSelectCurrentFocusedItem_() {
		if (core.isDef(this.focusedIndex_)) {
				dom.removeClasses(this.currentList_[this.focusedIndex_], 'active');
		}
	}

	/**
	 * Asserts that formatted data is valid. Throws error if item is not in the
	 * valid syntax.
	 * @param {*} item
	 * @protected
	 */
	assertItemObjectStructure_(item) {
		if (!core.isObject(item)) {
			throw new Promise.CancellationError('Autocomplete item must be an object');
		}
		if (!item.hasOwnProperty('textPrimary')) {
			throw new Promise.CancellationError('Autocomplete item must be an object with \'textPrimary\' key');
		}
	}
}
Soy.register(Autocomplete, templates);

/**
 * State definition.
 * @type {!Object}
 * @static
 */
Autocomplete.STATE = {
	/**
	 * Function that converts a given item to the format that should be used by
	 * the autocomplete.
	 * @type {!function()}
	 */
	format: {
		value: function(item) {
			if (core.isString(item)) {
				item = {
					textPrimary: item
				};
			}
			if (core.isObject(item) && !item.text) {
				item.text = item.textPrimary;
			}
			return item;
		}
	}
};

export default Autocomplete;
