'use strict';

import dom from 'metal-dom';
import Tabs from '../src/Tabs';

let tabs;

describe('Tabs', function() {
	afterEach(function() {
		if (tabs) {
			tabs.dispose();
		}
	});

	it('should not render anything if there is a tab without label since the validation should fail', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1'
				},
				{
					label: 'test_label2'
				},
				{
					label: 'undefined'
				},
				{
					label: ''
				}
			]
		});

		let navElement = tabs.element;

		assert.isNull(navElement);
	});

	it('should render the navigation with the regular style if no type or elementClasses were given', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1'
				},
				{
					label: 'test_label2'
				},
				{
					label: 'undefined'
				}
			]
		});

		assert.ok(dom.hasClass(tabs.element, 'nav-tabs'));
	});

	it('should render the navigation with the tabs style if TYPES.TABS was given', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1'
				},
				{
					label: 'test_label2'
				},
				{
					label: 'undefined'
				}
			],
			type: Tabs.TYPES.TABS
		});

		assert.ok(dom.hasClass(tabs.element, 'nav-tabs'));
	});

	it('should render the navigation with the pills style if TYPES.PILLS was given', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1'
				},
				{
					label: 'test_label2'
				},
				{
					label: 'undefined'
				}
			],
			type: Tabs.TYPES.PILLS
		});

		assert.ok(dom.hasClass(tabs.element, 'nav-pills'));
	});

	it('should render the navigation without nav style if TYPES.NONE was given', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1'
				},
				{
					label: 'test_label2'
				},
				{
					label: 'undefined'
				}
			],
			type: Tabs.TYPES.NONE
		});

		assert.ok(!dom.hasClass(tabs.element, 'nav-pills'));
		assert.ok(!dom.hasClass(tabs.element, 'nav-tabs'));
	});

	it('should fire a "changeRequest" event with correct values if you click on a none active item', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1'
				},
				{
					label: 'test_label2'
				},
				{
					label: 'undefined'
				}
			]
		});

		let navElement = tabs.element;
		let pagesNodes = navElement.querySelectorAll('li');
		let page2 = pagesNodes[1];

		tabs.once('changeRequest', function(event) {
			assert.ok(!dom.hasClass(page2, 'active'));
			assert.strictEqual(0, event.lastState.tab);
			assert.strictEqual(1, event.state.tab);
			assert.strictEqual(3, event.totalTabs);
		});

		dom.triggerEvent(page2, 'click');
	});

	it('should automatically select the next available (not disabled) tab as active on init if the previous ones are disabled', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1',
					disabled: true
				},
				{
					label: 'test_label2',
					disabled: true
				},
				{
					label: 'undefined'
				}
			]
		});

		assert.equal(2, tabs.tab);
	});

	it('should toggle the tab disabled state correctly', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1',
					disabled: true
				},
				{
					label: 'test_label2',
					disabled: false
				},
				{
					label: 'test_label3',
					disabled: true
				},
				{
					label: 'test_label4',
					disabled: true
				},
				{
					label: 'test_label4'
				},
				{
					label: 'test_label6',
					disabled: true
				},
				{
					label: 'test_label7',
					disabled: true
				}
			]
		});

		assert.equal(true, tabs.tabs[0].disabled);
		assert.equal(false, tabs.tabs[1].disabled);

		tabs.toggleTabDisabled(0);
		tabs.toggleTabDisabled(1);

		assert.equal(false, tabs.tabs[0].disabled);
		assert.equal(true, tabs.tabs[1].disabled);

		tabs.toggleTabDisabled(10);
		assert.isUndefined(tabs.tabs[10]);
	});

	it('should disable / enable the tab at the given index', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1',
					disabled: false
				}
			]
		});

		assert.equal(false, tabs.tabs[0].disabled);

		tabs.setTabDisabled(0, true);
		assert.equal(true, tabs.tabs[0].disabled);

		tabs.setTabDisabled(0);
		assert.equal(true, tabs.tabs[0].disabled);

		tabs.setTabDisabled(0, false);
		assert.equal(false, tabs.tabs[0].disabled);
	});

	it('should delete the tab at the given index', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1'
				},
				{
					label: 'test_label2'
				},
				{
					label: 'test_label3'
				}
			]
		});

		assert.equal(3, tabs.tabs.length);

		let removedTab1 = tabs.removeTab(1);

		assert.equal(2, tabs.tabs.length);
		assert.equal(removedTab1.label, 'test_label2');

		let removedTab2 = tabs.removeTab(10);
		assert.isUndefined(removedTab2);
	});

	it('should add the tab with the given name', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1',
					disabled: true
				},
				{
					label: 'test_label2',
					disabled: true
				},
				{
					label: 'test_label3'
				}
			]
		});

		assert.equal(3, tabs.tabs.length);

		tabs.addTabByName('test_label4');

		assert.equal(4, tabs.tabs.length);
		assert.equal(tabs.tabs[3].label, 'test_label4');

		tabs.addTabByName('test_label5', false);
		assert.equal(5, tabs.tabs.length);
		assert.equal(tabs.tabs[4].label, 'test_label5');

		tabs.addTabByName(false);
		assert.equal(5, tabs.tabs.length);
	});

	it('should add an object tab into the tabs array', () => {
		tabs = new Tabs({
			tabs: [
				{
					label: 'test_label1',
					disabled: true
				},
				{
					label: 'test_label2',
					disabled: true
				},
				{
					label: 'test_label3'
				}
			]
		});

		assert.equal(3, tabs.tabs.length);

		let tab1 = {
			label: 'test_label5',
			disabled: false
		};

		tabs.addTab(tab1);
		assert.equal(4, tabs.tabs.length);
		assert.equal(tabs.tabs[3].label, 'test_label5');

		let tab2 = {
			label: 'test_label6',
			disabled: false
		};

		tabs.addTab(tab2, 0);
		assert.equal(5, tabs.tabs.length);
		assert.equal(tabs.tabs[0].label, 'test_label6');
	});

	it('should disable the whole tab', () => {
		tabs = new Tabs({
			disabled: true,
			tabs: [
				{
					label: 'test_label1',
					disabled: true
				},
				{
					label: 'test_label2',
					disabled: true
				},
				{
					label: 'test_label3'
				}
			]
		});

		assert.equal(true, tabs.disabled);
	});
});
