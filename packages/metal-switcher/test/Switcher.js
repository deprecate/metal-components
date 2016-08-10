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

	it('should switcher turn on when checked state is true', function() {
		switcher = new Switcher({
			checked: true
		});
		assert.ok(dom.hasClass(switcher.element, 'switcher-on'));
	});

	it('should switcher turn off when checked state is false', function() {
		switcher = new Switcher({
			checked: false
		});
		assert.ok(!dom.hasClass(switcher.element, 'switcher-on'));
	});

	it('should switcher toggle on click', function(done) {
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

	it('should switcher toggle on ENTER or SPACE keys', function(done) {
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

	it('should not switcher toggle on key other than ENTER or SPACE', function(done) {
		switcher = new Switcher();
		dom.triggerEvent(switcher.element, 'keyup', {
			keyCode: 20
		});
		async.nextTick(function() {
			assert.ok(!dom.hasClass(switcher.element, 'switcher-on'));
			done();
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
