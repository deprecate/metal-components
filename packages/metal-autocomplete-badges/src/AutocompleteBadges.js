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
		this.inputElement = this.element.querySelector('.autocomplete-field');
		this.listBadgesElement = this.element.querySelector('.autocomplete-badges--list');

		this.autocomplete_ = new Autocomplete({
			inputElement: this.inputElement,
			data: this.getFilteredElements_.bind(this)
		});		

		this.autocomplete_.on('select', this.onListItemSelected_.bind(this));

		this.element.style.width = this.inputElement.offsetWidth + 'px';
	}

	/**
	 * @inheritDoc
	 */
	rendered() {
		if(this.listBadgesElement) {			
			this.inputElement.style.paddingLeft = this.getFullWidthListBadges_() + 'px';	
		}

		//console.log(this.element.querySelectorAll('.autocomplete-badges--list li').length);
	}

	/**
	 * Recover a full width of basges list	
	 * @return {Number} returns the width
	 * @protected
	 */
	getFullWidthListBadges_() {
		return this.listBadgesElement.offsetWidth + this.listBadgesElement.style.marginLeft +
				this.listBadgesElement.style.marginRight + this.listBadgesElement.style.paddingLeft + 
				this.listBadgesElement.style.paddingRight;
	}

	/**
	 * @inheritDoc
	 */
	disposed() {
		if(this.autocomplete_) {
			this.autocomplete_.dispose();
		}
	}

	/**
	 * Recover a filtered list the according with the query search
	 * @param {String} query
	 * @return {Array} returns the filtered list
	 * @protected
	 */
	getFilteredElements_(query) {
		return this.elements.filter(function(item) {
			return query && item.toLowerCase().includes(query.toLowerCase());
		}).sort();
	}

	/**
	 * Remove element from the list and add in badges list	 
	 * @param {!Element} item The list selected item.
	 * @protected
	 */
	onListItemSelected_(item) {
		let index,
			element;

		index = this.elements.indexOf(item.text);
		element = this.elements[index];
		
		this.badges.push(item);
		this.badges = this.badges;

		this.elements.splice(index, 1);
		this.elements = this.elements;

		this.element.querySelector('.autocomplete-field').value = "";		
	}

	/**
	 * Remove element from the badges list and add in element list	 
	 * @param {!Event} event
	 * @protected
	 */
	onBadgeItemClicked_(event) {
		let index,
			elementDOM,
			badge;

		elementDOM = event.delegateTarget;

		badge = this.badges[elementDOM.getAttribute('data-index')]

		this.elements.push(badge.text);		
		this.elements = this.elements;

		this.badges.splice(this.badges.indexOf(badge), 1);		
		this.badges = this.badges;
	}
}
Soy.register(AutocompleteBadges, templates);

AutocompleteBadges.STATE = {	
	/**	 
	 * @type {DOMElement|string}
	 */
	 inputElement: {
	 },
	/**	
	 * @type {DOMElement|string}
	 */
	 listBadgesElement: {
	 },
	/**	  
	 * @type {!Array<!Object>}
	 * @default []
	 */
	elements: {
		validator: Array.isArray,
		valueFn: function() {
			return [];
		}
	},
	/**	  
	 * @type {!Array<!Object>}
	 * @default []
	 */
	badges: {
		validator: Array.isArray,
		valueFn: function() {
			return [];
		}
	},
};	

export default AutocompleteBadges;
