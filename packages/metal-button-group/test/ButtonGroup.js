'use strict';

import dom from 'bower:metal/src/dom/dom';
import ButtonGroup from '../src/ButtonGroup';

describe('ButtonGroup', function() {
	var buttonGroup;

	it('should render the requested buttons', function() {
		buttonGroup = new ButtonGroup({
			buttons: [
				{
					cssClass: 'btn btn-primary',
					label: 'Ok',
					type: 'submit'
				},
				{
					label: 'Cancel'
				}
			]
		}).render();

		var buttonElements = buttonGroup.element.querySelectorAll('button');
		assert.strictEqual(2, buttonElements.length);
		assert.strictEqual('Ok', buttonElements[0].textContent);
		assert.strictEqual('btn btn-primary', buttonElements[0].className);
		assert.strictEqual('submit', buttonElements[0].getAttribute('type'));
		assert.strictEqual('Cancel', buttonElements[1].textContent);
		assert.strictEqual('btn btn-default', buttonElements[1].className);
		assert.strictEqual('button', buttonElements[1].getAttribute('type'));
	});

	it('should render no buttons by default', function() {
		buttonGroup = new ButtonGroup().render();

		var buttonElements = buttonGroup.element.querySelectorAll('button');
		assert.strictEqual(0, buttonElements.length);
		assert.strictEqual(0, buttonGroup.buttons.length);
	});

	it('should add ButtonGroup.SELECTED_CLASS to buttons specified in "selected" attr', function() {
		buttonGroup = new ButtonGroup({
			buttons: [
				{
					label: 'First'
				},
				{
					label: 'Second'
				}
			],
			selected: {
				'0': true
			}
		}).render();

		var buttonElements = buttonGroup.element.querySelectorAll('button');
		assert.ok(dom.hasClass(buttonElements[0], ButtonGroup.SELECTED_CLASS));
		assert.ok(!dom.hasClass(buttonElements[1], ButtonGroup.SELECTED_CLASS));
	});

	it('should add/remove ButtonGroup.SELECTED_CLASS to elements when clicked', function() {
		buttonGroup = new ButtonGroup({
			buttons: [
				{
					label: 'First'
				},
				{
					label: 'Second'
				}
			]
		}).render();

		var buttonElements = buttonGroup.element.querySelectorAll('button');
		assert.ok(!dom.hasClass(buttonElements[0], ButtonGroup.SELECTED_CLASS));
		assert.ok(!dom.hasClass(buttonElements[1], ButtonGroup.SELECTED_CLASS));

		dom.triggerEvent(buttonElements[0], 'click');
		assert.ok(dom.hasClass(buttonElements[0], ButtonGroup.SELECTED_CLASS));
		assert.ok(!dom.hasClass(buttonElements[1], ButtonGroup.SELECTED_CLASS));

		dom.triggerEvent(buttonElements[1], 'click');
		assert.ok(dom.hasClass(buttonElements[0], ButtonGroup.SELECTED_CLASS));
		assert.ok(dom.hasClass(buttonElements[1], ButtonGroup.SELECTED_CLASS));

		dom.triggerEvent(buttonElements[0], 'click');
		assert.ok(!dom.hasClass(buttonElements[0], ButtonGroup.SELECTED_CLASS));
		assert.ok(dom.hasClass(buttonElements[1], ButtonGroup.SELECTED_CLASS));
	});
});
