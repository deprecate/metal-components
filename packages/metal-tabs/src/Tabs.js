'use strict';

import core from 'metal';
import templates from './Tabs.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

/**
 * UI Component to navigate through tabbed data.
 */
class Tabs extends Component {
	/**
	 * Adds a tab to the tabs array at the specified index if given or
	 * appends it at the end.
	 * @param {Object} tab
	 * @param {number} index
	 */
	addTab(tab, index) {
		if (core.isNumber(index)) {
			this.tabs.splice(index, 0, tab);
		} else {
			this.tabs.push(tab);
		}

		this.tabs = this.tabs;
	}

	/**
	 * Adds a tab to the tabs array at the specified index if given or
	 * appends it at the end.
	 * @param {string} label
	 * @param {boolean} disabled
	 * @param {number} index
	 */
	addTabByName(label, disabled, index) {
		if (core.isString(label)) {
			let tab = {
				label: label,
				disabled: disabled
			};

			if (!core.isDef(disabled)) {
				tab.disabled = false;
			}

			this.addTab(tab, index);
		}
	}

	/**
	 * @inheritDoc
	 */
	created() {
		this.lastState_ = {
			tab: this.tab
		};

		this.on(Tabs.Events.CHANGE_REQUEST, this.defaultChangeRequestFn_, true);
	}

	/**
	 * Default `changeRequest` function, sets new state of tabs.
	 * @param {EventFacade} event
	 * @protected
	 */
	defaultChangeRequestFn_(event) {
		this.setState_(event.state);
	}

	/**
	 * Fires `changeRequest` event.
	 * @param {Object} state
	 * @protected
	 */
	dispatchRequest_(state) {
		this.emit(
			Tabs.Events.CHANGE_REQUEST,
			{
				lastState: this.lastState_,
				state: state,
				totalTabs: this.tabs.length
			}
		);
	}

	/**
	 * Removes the tab at the given index from the tabs array.
	 * @return {number} Returns the index of the first tab which is not disabled.
	 */
	findFirstAvailableIndex_() {
		if (!this.disabled) {
			for (let i = 0; i < this.tabs.length; i++) {
				if (!this.tabs[i].disabled) {
					return i;
				}
			}
		}

		return -1;
	}

	/**
	 * `onClick` handler for tab items.
	 * @param {EventFacade} event
	 */
	onClickItem(event) {
		let item = event.delegateTarget;

		event.preventDefault();

		var index = parseInt(item.getAttribute('data-index'));

		this.dispatchRequest_({
			tab: index
		});
	}

	/**
	 * Removes the tab at the given index from the tabs array.
	 * @param  {number} index
	 * @return {Object} Returns the removed tab.
	 */
	removeTab(index) {
		if (core.isNumber(index) && index > -1 && index < this.tabs.length) {
			let tabs = this.tabs.splice(index, 1);

			this.tabs = this.tabs;

			return tabs[0];
		}
	}

	/**
	 * Set the new tabs state. The state is a payload object
	 * containing the tab number, e.g. `{tab:1}`.
	 * @param {Object} state
	 * @protected
	 */
	setState_(state) {
		this.tab = state.tab;

		this.lastState_ = state;
	}

	/**
	 * Disables the tab at the given index in the tabs array.
	 * @param  {number} index
	 * @return {boolean} disabled
	 */
	setTabDisabled(index, disabled) {
		if (core.isNumber(index) && core.isBoolean(disabled)) {
			this.tabs[index].disabled = disabled;

			this.tabs = this.tabs;
		}
	}

	/**
	 * Toggles the disabled state of the tab at the given index in the tabs array.
	 * If the tab at the given index is active but toggled disabled the first
	 * the first not disabled tab will be selected.
	 * @param  {number} index
	 */
	toggleTabDisabled(index) {
		if (core.isNumber(index) && index >= 0 && index < this.tabs.length) {
			this.tabs[index].disabled = !this.tabs[index].disabled;

			if (index === this.tab) {
				this.tab = this.findFirstAvailableIndex_();
			}

			this.tabs = this.tabs;
		}
	}
}
Soy.register(Tabs, templates);

Tabs.Events = {
	CHANGE_REQUEST: 'changeRequest'
};

/**
 * Default types used to style the tabs component.
 */
Tabs.TYPES = {
	NONE: 'none',
	PILLS: 'pills',
	TABS: 'tabs'
};

/**
 * State definition.
 * @type {!Object}
 * @static
 */
Tabs.STATE = {
	/**
	 * Determines if the whole component should be disabled or not.
	 * @type {boolean}
	 * @default false
	 */
	disabled: {
		validator: core.isBoolean,
		value: false
	},

	/**
	 * Tab to display on initial paint. It has two attributes, 'label', which is
	 * required and 'disabled' which is optional.
	 * @type {number}
	 * @default Default will be set by the valueFn.
	 */
	tab: {
		validator: core.isNumber,
		valueFn: 'findFirstAvailableIndex_'
	},

	/**
	 * Tabs array, holding the actual tabs.
	 * @type {Array}
	 * @default []
	 */
	tabs: {
		validator: value => value.every(item => !!item.label),
		value: []
	},

	/**
	 * Type currently being used to style the tabs component.
	 * @type {string}
	 * @default {string}
	 */
	type: {
		validator: value => value.toUpperCase() in Tabs.TYPES,
		value: Tabs.TYPES.TABS
	}
};

export default Tabs;
