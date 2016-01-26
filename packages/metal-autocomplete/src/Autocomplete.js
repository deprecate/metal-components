'use strict';

import AutocompleteBase from './AutocompleteBase';
import { CancellablePromise as Promise } from 'npm:metal-promise/src/promise/Promise';
import core from 'npm:metal/src/core';
import dom from 'npm:metal/src/dom/dom';
import Align from 'npm:metal-position/src/Align';
import List from 'npm:metal-list/src/List';

/*
 * Autocomplete component.
 */
class Autocomplete extends AutocompleteBase {
	/**
	 * @inheritDoc
	 */
	constructor(opt_config) {
		super(opt_config);

		this.once('render', this.handleRender_);
	}

	/**
	 * @inheritDoc
	 */
	attached() {
		super.attached();
		this.list.attach(this.element);
		this.on('click', this.genericStopPropagation_);
		this.eventHandler_.add(dom.on(this.inputElement, 'focus', this.handleInputFocus_.bind(this)));
		this.eventHandler_.add(dom.on(document, 'click', this.handleDocClick_.bind(this)));
		if (this.visible) {
			this.align();
		}
	}

	/**
	 * @inheritDoc
	 */
	detached() {
		super.detached();
		this.list.detach();
	}

	/**
	 * Aligns main element to the input element.
	 */
	align() {
		this.element.style.width = this.inputElement.offsetWidth + 'px';
		Align.align(this.element, this.inputElement, Align.Bottom);
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
	 * Handles the `render` event, creating a `List` component and rendering
	 * it inside this autocomplete.
	 * @protected
	 */
	handleRender_() {
		this.list = new List().render(this.element);
		this.list.on('itemSelected', this.onListItemSelected_.bind(this));
	}

	/**
	 * @inheritDoc
	 */
	request(query) {
		var self = this;
		return super.request(query).then(function(data) {
			if (data) {
				data.forEach(self.assertItemObjectStructure_);
				self.list.items = data;
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
		this.emit('select', this.list.items[selectedIndex]);
		this.visible = false;
	}

	/**
	 * Stops propagation of an event.
	 * @param {!Event} event
	 * @protected
	 */
	genericStopPropagation_(event) {
		event.stopPropagation();
	}

	/**
	 * Synchronization logic for `visible` attribute.
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

/**
 * Attributes definition.
 * @type {!Object}
 * @static
 */
Autocomplete.ATTRS = {
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

/**
 * Provides a list of classes which have to be applied to the element's DOM element.
 * @type {string}
 * @static
 * @default 'autocomplete autocomplete-list'
 */
Autocomplete.ELEMENT_CLASSES = 'autocomplete autocomplete-list';

export default Autocomplete;
