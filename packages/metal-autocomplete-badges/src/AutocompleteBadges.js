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
	 * Remove element from the badges list and add in element list
	 * @param {!Event} event
	 * @protected
	 */
	onBadgeItemClicked_(event) {
		const elementDOM = event.delegateTarget;
		const badge = this.badges[elementDOM.getAttribute('data-index')];

		this.dataItems.push(badge.text);
		this.dataItems = this.dataItems;

		this.badges.splice(this.badges.indexOf(badge), 1);
		this.badges = this.badges;
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
	 * The list items of text tha will be filtered by input data.
	 * @type {!Array<!Object>}
	 * @default []
	 */
	dataItems: {
		validator: Array.isArray,
		valueFn: function() {
			return [];
		}
	}
};

export default AutocompleteBadges;
