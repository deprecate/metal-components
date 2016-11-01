'use strict';

import templates from './AutocompleteBadges.soy.js';
import Autocomplete from 'metal-autocomplete';
import Component from 'metal-component';
import Soy from 'metal-soy';

class AutocompleteBadges extends Component {

	/**
	 * @inheritDoc
	 */
	attached() {
		this.autocomplete_ = new Autocomplete({
			inputElement: this.refs.input,
			data: this.getFilteredElements_.bind(this)
		});

		this.autocomplete_.on('select', this.onListItemSelected_.bind(this));
	}

	/**
	 * @inheritDoc
	 */
	disposed() {
		if (this.autocomplete_) {
			this.autocomplete_.dispose();
		}
	}

	/**
	* Returns the `Autocomplete` component being used to render the matched items in a list.
	* @return {!Autocomplete}
	*/
	getAutocomplete() {
		return this.autocomplete_;
	}

	/**
	 * Recover a filtered list the according with the query search
	 * @param {String} query
	 * @return {Array} returns the filtered list
	 * @protected
	 */
	getFilteredElements_(query) {
		return this.dataItems.filter(function(item) {
			return query && item.toLowerCase().includes(query.toLowerCase());
		}).sort();
	}

	/**
	 * Returns the `input` element being used to insert data.
	 * @return {!Element}
	 */
	getInput() {
		return this.refs.input;
	}

	/**
	 * Handles Badge Item click event
	 * @param {!Event} event
	 * @protected
	 */
	onBadgeItemClicked_(event) {
		const elementDOM = event.delegateTarget;
		const badge = this.badges[elementDOM.getAttribute('data-index')];
		this.removeBadge_(badge);
	}

	/**
	 * Remove element from the badges list and add in element list
	 * @param badge
	 * @private
	 */
	removeBadge_(badge) {
		this.dataItems.push(badge.text);
		this.dataItems = this.dataItems;

		this.badges.splice(this.badges.indexOf(badge), 1);
		this.badges = this.badges;
	}

	/**
	 * Handles Badge Item KeyDown event
	 * @param event
	 * @private
	 */
	onBadgeKeyDown_(event) {

		const badgesElements = this.refs.badges.children;
		const selectedBadge = event.delegateTarget;
		const selectedIndex = +selectedBadge.getAttribute('data-index');

		switch (event.keyCode) {
			case KEY_CODE_LEFT_ARROW :
				if (selectedIndex > 0) {
					badgesElements[selectedIndex - 1].focus();
				}
				break;
			case KEY_CODE_RIGTH_ARROW :
				if (selectedIndex < badgesElements.length - 1) {
					badgesElements[selectedIndex + 1].focus();
				} else {
					this.refs.input.focus();
				}
				break;

			case KEY_CODE_BACKSPACE :
				this.removeBadge_(this.badges[selectedIndex]);
				if (selectedIndex > 0) {
					badgesElements[selectedIndex - 1].focus();
				} else {
					this.refs.input.focus();
				}
				break;

			case KEY_CODE_ENTER :
				this.refs.input.value = this.badges[selectedIndex].text;
				this.removeBadge_(this.badges[selectedIndex]);
				this.refs.input.focus();
				break;
		}
	}

	/**
	 * Handles input KeyDown event
	 * @param event
	 * @returns {boolean}
	 * @private
	 */
	onInputKeyDown_(event) {
		const badgesElements = this.refs.badges.children;

		if (this.refs.input.value !== '') {
			return true;
		}

		switch (event.keyCode) {
			case KEY_CODE_BACKSPACE :
			case KEY_CODE_LEFT_ARROW :
				if (badgesElements.length > 0) {
					badgesElements[badgesElements.length - 1].focus();
					return false;
				}
				break;
		}
	}

	/**
	 * Remove element from the list and add in badges list
	 * @param {!Element} item The list selected item.
	 * @protected
	 */
	onListItemSelected_(item) {
		const index = this.dataItems.indexOf(item.text);

		this.badges.push(item);
		this.badges = this.badges;

		this.dataItems.splice(index, 1);
		this.dataItems = this.dataItems;

		this.refs.input.value = '';
	}

	/**
	 * Setter for dataItems
	 * A copy of data items array should be created in oreder to
	 * avoid changing the array passed to different instances
	 * @param val
	 * @returns {!Array<!Object>}
	 * @protected
	 */
	setterDataItems_(val) {
		return val.slice();
	}

}
Soy.register(AutocompleteBadges, templates);

AutocompleteBadges.STATE = {
	/**
	 * The list to store the values selected in 'dataItems' list.
	 * @type {!Array<!Object>}
	 * @default []
	 */
	badges: {
		validator: Array.isArray,
		valueFn: function() {
			return [];
		}
	},

	/**
	 * The list items of text that will be filtered by input data.
	 * @type {!Array<!Object>}
	 * @default []
	 */
	dataItems: {
		validator: Array.isArray,
		valueFn: function() {
			return [];
		},
		setter: 'setterDataItems_'
	}
};

const KEY_CODE_LEFT_ARROW 		= 37;
const KEY_CODE_RIGTH_ARROW 		= 39;
const KEY_CODE_BACKSPACE 			= 8;
const KEY_CODE_ENTER					= 13;

export default AutocompleteBadges;
