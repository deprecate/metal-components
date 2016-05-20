'use strict';

import core from 'metal';
import templates from './Tabs.soy';
import Component from 'metal-component';
import Soy from 'metal-soy';

class Tabs extends Component {
	addTab(tab, index) {
		if (core.isNumber(index)) {
			this.tabs.splice(index, 0, tab);
		} else {
			this.tabs.push(tab);
		}

		this.tabs = this.tabs;
	}

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

	created() {
		this.lastState_ = {
			tab: this.tab
		};

		this.on(Tabs.Events.CHANGE_REQUEST, this.defaultChangeRequestFn_, true);
	}

	defaultChangeRequestFn_(event) {
		this.setState_(event.state);
	}

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

	onClickItem(event) {
		let item = event.delegateTarget;

		event.preventDefault();

		var index = parseInt(item.getAttribute('data-index'));

		this.dispatchRequest_({
			tab: index
		});
	}

	removeTab(index) {
		if (core.isNumber(index) && index > -1 && index < this.tabs.length) {
			let tabs = this.tabs.splice(index, 1);

			this.tabs = this.tabs;

			return tabs[0];
		}
	}

	setState_(state) {
		this.tab = state.tab;

		this.lastState_ = state;
	}

	setTabDisabled(index, disabled) {
		if (core.isNumber(index) && core.isBoolean(disabled)) {
			this.tabs[index].disabled = disabled;

			this.tabs = this.tabs;
		}
	}

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

Tabs.TYPES = {
	NONE: 'none',
	PILLS: 'pills',
	TABS: 'tabs'
};

Tabs.STATE = {
	disabled: {
		validator: core.isBoolean,
		value: false
	},

	tab: {
		validator: core.isNumber,
		valueFn: 'findFirstAvailableIndex_'
	},

	tabs: {
		validator: value => value.every(item => !!item.label),
		value: []
	},

	type: {
		validator: value => value.toUpperCase() in Tabs.TYPES,
		value: Tabs.TYPES.TABS
	}
};

export default Tabs;
