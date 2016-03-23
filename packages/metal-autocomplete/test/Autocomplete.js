'use strict';

import { async } from 'metal';
import { Align } from 'metal-position';
import Autocomplete from '../src/Autocomplete';
import dom from 'metal-dom';

var component;
var input;

var filterData = function(query) {
	return ['Alabama', 'Alaska'].filter(function(item) {
		return item.toLowerCase().indexOf(query.toLowerCase()) === 0;
	});
};

describe('Autocomplete', function() {
	afterEach(function() {
		if (component) {
			component.dispose();
		}
		if (input) {
			dom.exitDocument(input);
		}
	});

	beforeEach(function() {
		input = document.createElement('input');
		input.type = 'text';
		dom.enterDocument(input);
	});

	it('should process valid query and display element', function(done) {
		component = new Autocomplete({
			data: filterData,
			inputElement: input
		}).render();

		component.request('a').then(function() {
			async.nextTick(function() {
				assert.ok(component.visible);
				assert.strictEqual(2, component.element.querySelectorAll('li').length);
				done();
			});
		});
	});

	it('should process invalid query and hide element', function(done) {
		component = new Autocomplete({
			data: filterData,
			inputElement: input
		}).render();

		component.request('asparagus').then(function() {
			async.nextTick(function() {
				assert.ok(!component.visible);
				assert.strictEqual(0, component.element.querySelectorAll('li').length);
				done();
			});
		});
	});

	it('should process query null data and hide element', function(done) {
		component = new Autocomplete({
			data: null,
			inputElement: input
		}).render();

		component.request('asparagus').then(function() {
			async.nextTick(function() {
				assert.ok(!component.visible);
				assert.strictEqual(0, component.element.querySelectorAll('li').length);
				done();
			});
		});
	});

	it('should throws error with malformed data structure', function(done) {
		component = new Autocomplete({
			data: [1],
			inputElement: input
		}).render();

		component.request('query').catch(function(reason) {
			assert.strictEqual('Autocomplete item must be an object', reason.message);
			done();
		});
	});

	it('should throws error with malformed data object structure', function(done) {
		component = new Autocomplete({
			data: [{
				foo: 'foo'
			}],
			inputElement: input
		}).render();

		component.request('query').catch(function(reason) {
			assert.strictEqual('Autocomplete item must be an object with \'textPrimary\' key', reason.message);
			done();
		});
	});

	it('should hide element when select item', function(done) {
		component = new Autocomplete({
			data: filterData,
			inputElement: input
		}).render();

		input.setAttribute('value', 'a');
		input.focus();
		async.nextTick(function() {
			async.nextTick(function() {
				component.once('select', function(value) {
					assert.deepEqual({
						'textPrimary': 'Alabama'
					}, value);
					async.nextTick(function() {
						assert.ok(!component.visible);
						done();
					});
				});
				dom.triggerEvent(component.element.querySelectorAll('li')[0], 'click');
			});
		});
	});

	it('should hide element when click outside input', function(done) {
		component = new Autocomplete({
			data: filterData,
			inputElement: input
		}).render();

		var otherInput = document.createElement('input');
		otherInput.type = 'text';
		dom.enterDocument(otherInput);

		input.setAttribute('value', 'a');
		input.focus();
		async.nextTick(function() {
			async.nextTick(function() {
				async.nextTick(function() {
					assert.ok(!component.visible);
					dom.exitDocument(otherInput);
					done();
				});
				assert.ok(component.visible);
				otherInput.focus();
				dom.triggerEvent(otherInput, 'click');
			});
		});
	});

	it('should not hide element when clicking inside input', function(done) {
		component = new Autocomplete({
			data: filterData,
			inputElement: input
		}).render();

		input.setAttribute('value', 'a');
		input.focus();
		async.nextTick(function() {
			async.nextTick(function() {
				assert.ok(component.visible);
				done();
			});
			assert.ok(component.visible);
			dom.triggerEvent(input, 'click');
		});
	});

	it('should show element when focus input', function(done) {
		component = new Autocomplete({
			data: filterData,
			inputElement: input,
			visible: false
		}).render();

		input.value = 'Alabama';
		dom.triggerEvent(input, 'focus');

		async.nextTick(function() {
			assert.ok(component.visible);
			done();
		});
	});

	describe('Align', function() {
		beforeEach(function() {
			sinon.stub(Align, 'align');
		});

		afterEach(function() {
			Align.align.restore();
		});

		it('should update width to be equal to the input\'s width', function() {
			input.style.width = '200px';
			component = new Autocomplete({
				data: filterData,
				inputElement: input,
				visible: true
			}).render();
			assert.strictEqual(input.offsetWidth, component.element.offsetWidth);
		});

		it('should update width to be equal to the input\'s width when window resizes', function(done) {
			input.style.width = '200px';
			component = new Autocomplete({
				data: filterData,
				inputElement: input,
				visible: true
			}).render();

			// Simulating use case where resizing the window causes input width to change.
			input.style.width = '400px';
			dom.triggerEvent(window, 'resize');

			// Waits for the resize event's debounce function to finish.
			setTimeout(function() {
				assert.strictEqual(input.offsetWidth, component.element.offsetWidth);
				done();
			}, 200);
		});

		it('should align element when it is created already visible', function() {
			component = new Autocomplete({
				data: filterData,
				inputElement: input,
				visible: true
			});

			sinon.spy(component, 'attached');
			component.render();
			assert.ok(Align.align.calledAfter(component.attached));
		});

		it('should align element when it becomes visible', function(done) {
			component = new Autocomplete({
				data: filterData,
				inputElement: input
			}).render();
			assert.strictEqual(0, Align.align.callCount);

			component.visible = true;
			component.once('stateSynced', function() {
				assert.strictEqual(1, Align.align.callCount);
				done();
			});
		});

		it('should realign element when window resizes while the results are visible', function(done) {
			component = new Autocomplete({
				data: filterData,
				inputElement: input,
				visible: true
			}).render();

			Align.align.restore();
			sinon.spy(Align, 'align');
			dom.triggerEvent(window, 'resize');

			// Waits for the resize event's debounce function to finish.
			setTimeout(function() {
				assert.strictEqual(1, Align.align.callCount);
				done();
			}, 200);
		});

		it('should not realign element when window resizes while the results aren\'t visible', function(done) {
			component = new Autocomplete({
				data: filterData,
				inputElement: input
			}).render();

			dom.triggerEvent(window, 'resize');

			// Waits for the resize event's debounce function to finish.
			setTimeout(function() {
				assert.strictEqual(0, Align.align.callCount);
				done();
			}, 200);
		});

		it('should add "autocomplete-bottom" css class if results are aligned on the bottom', function() {
			Align.align.returns(Align.Bottom);
			component = new Autocomplete({
				data: filterData,
				inputElement: input,
				visible: true
			}).render();

			assert.ok(dom.hasClass(component.element, 'autocomplete-bottom'));
		});

		it('should add "autocomplete-top" css class if results are aligned on the top', function() {
			Align.align.returns(Align.Top);
			component = new Autocomplete({
				data: filterData,
				inputElement: input,
				visible: true
			}).render();

			assert.ok(dom.hasClass(component.element, 'autocomplete-top'));
		});
	});
});
