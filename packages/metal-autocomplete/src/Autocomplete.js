'use strict';

import core from 'metal';
import debounce from 'metal-debounce';
import dom from 'metal-dom';
import { CancellablePromise as Promise } from 'metal-promise';
import { Align } from 'metal-position';
import AutocompleteBase from './AutocompleteBase';
import Soy from 'metal-soy';

import 'metal-list';
import templates from './Autocomplete.soy';

/*
 * Autocomplete component.
 */
class Autocomplete extends AutocompleteBase {
	/**
	 * @inheritDoc
	 */
	attached() {
		super.attached();
		this.on('click', event => event.stopPropagation());
		this.eventHandler_.add(dom.on(this.inputElement, 'focus', this.handleInputFocus_.bind(this)));
		this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
		this.eventHandler_.add(dom.on(window, 'resize', debounce(this.handleWindowResize_.bind(this), 100)));
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
	 * Returns the `List` component being used to render the matched items.
	 * @return {!List}
	 */
	getList() {
		return this.components[this.id + '-list'];
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
		this.request(this.inputElement.value);
	}

	/**
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
	 * Emits a `select` event with the information about the selected item and
	 * hides the element.
	 * @param {!Element} item The list selected item.
	 * @protected
	 */
	onListItemSelected_(item) {
		var selectedIndex = parseInt(item.getAttribute('data-index'), 10);
		this.emit('select', this.getList().items[selectedIndex]);
		this.visible = false;
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
			return core.isString(item) ? {
				textPrimary: item
			} : item;
		}
	}
};

export default Autocomplete;
