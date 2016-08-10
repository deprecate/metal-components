'use strict';

import { async } from 'metal';
import dom from 'metal-dom';
import Switcher from '../src/Switcher';

var switcher;

describe('Switcher', function() {
	afterEach(function() {
		if (switcher) {
			switcher.dispose();
		}
	});

	it('should turn on switcher when checked state is true', function() {
		switcher = new Switcher({
			checked: true
		});
		assert.ok(dom.hasClass(switcher.element, 'switcher-on'));
	});

	it('should turn off switcher when checked state is false', function() {
		switcher = new Switcher({
			checked: false
		});
		assert.ok(!dom.hasClass(switcher.element, 'switcher-on'));
	});

	it('should toggle switcher on click', function(done) {
		switcher = new Switcher();
		dom.triggerEvent(switcher.element, 'click');
		async.nextTick(function() {
			assert.ok(dom.hasClass(switcher.element, 'switcher-on'));
			dom.triggerEvent(switcher.element, 'click');
			async.nextTick(function() {
				assert.ok(!dom.hasClass(switcher.element, 'switcher-on'));
				done();
			});
		});
	});

	it('should toggle switcher on ENTER or SPACE keys', function(done) {
		switcher = new Switcher();
		dom.triggerEvent(switcher.element, 'keyup', {
			keyCode: 13
		});
		async.nextTick(function() {
			assert.ok(dom.hasClass(switcher.element, 'switcher-on'));
			dom.triggerEvent(switcher.element, 'keyup', {
				keyCode: 32
			});
			async.nextTick(function() {
				assert.ok(!dom.hasClass(switcher.element, 'switcher-on'));
				done();
			});
		});
	});

	it('should not toggle switcher on key other than ENTER or SPACE', function(done) {
		switcher = new Switcher();
		dom.triggerEvent(switcher.element, 'keyup', {
			keyCode: 20
		});
		async.nextTick(function() {
			assert.ok(!dom.hasClass(switcher.element, 'switcher-on'));
			done();
		});
	});

	it('should update aria attributes when switcher is checked/unchecked', function(done) {
		switcher = new Switcher();
		assert.strictEqual('checkbox', switcher.element.getAttribute('role'));

		dom.triggerEvent(switcher.element, 'click');
		async.nextTick(function() {
			assert.strictEqual('true', switcher.element.getAttribute('aria-checked'));
			dom.triggerEvent(switcher.element, 'click');
			async.nextTick(function() {
				assert.strictEqual('false', switcher.element.getAttribute('aria-checked'));
				done();
			});
		});
	});

	it('should decorate', function() {
		var element = document.createElement('div');
		dom.enterDocument(element);
		IncrementalDOM.patch(element, () => {
			Switcher.TEMPLATE({
				checked: true
			});
		});
		var outerHTML = element.childNodes[0].outerHTML;

		switcher = new Switcher({
			checked: true,
			element: element.childNodes[0]
		});

		assert.strictEqual(switcher.element.outerHTML, outerHTML);
	});
});
