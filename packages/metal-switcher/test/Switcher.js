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
		}).render();
		assert.ok(dom.hasClass(switcher.element, 'switcher-on'));
	});

	it('should switcher turn off when checked state is false', function() {
		switcher = new Switcher({
			checked: false
		}).render();
		assert.ok(!dom.hasClass(switcher.element, 'switcher-on'));
	});

	it('should switcher toggle on click', function(done) {
		switcher = new Switcher().render();
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
		}).render();

		assert.strictEqual(switcher.element.outerHTML, outerHTML);
	});
});
