'use strict';

import { async } from 'metal';
import dom from 'metal-dom';
import DragTestHelper from 'metal-drag-drop/test/fixtures/DragTestHelper';
import Position from 'metal-position';
import Slider from '../src/Slider';

var slider;

describe('Slider', function() {
	afterEach(function() {
		if (slider) {
			slider.dispose();
		}
	});

	it('should create a hidden named input so it can be embedded in a form', function() {
		slider = new Slider({
			inputName: 'sliderInput',
			value: 50
		});

		var sliderInput = slider.element.querySelector('input[name="sliderInput"]');

		assert.ok(sliderInput);
		assert.strictEqual('50', sliderInput.getAttribute('value'));
	});

	it('should update the value of the hidden input when the slider value changes', function(done) {
		slider = new Slider({
			inputName: 'sliderInput',
			value: 20
		});

		assert.strictEqual('20', slider.element.querySelector('input[name="sliderInput"]').getAttribute('value'));

		slider.value = 80;

		async.nextTick(function() {
			assert.strictEqual('80', slider.element.querySelector('input[name="sliderInput"]').getAttribute('value'));
			done();
		});
	});

	it('should update the value of the slider when clicking on the rail area', function(done) {
		slider = new Slider({
			min: 0,
			value: 50,
			max: 100
		});

		dom.triggerEvent(slider.element.querySelector('.rail'), 'mousedown', {
			offsetX: 0.9 * Position.getRegion(slider.element).width
		});

		async.nextTick(function() {
			assert.strictEqual(90, slider.value);

			dom.triggerEvent(slider.element.querySelector('.rail-active'), 'mousedown', {
				offsetX: 0.1 * Position.getRegion(slider.element).width
			});

			async.nextTick(function() {
				assert.strictEqual(10, slider.value);
				done();
			});
		});
	});

	it('should update the value of the slider when dragging the rail handle', function(done) {
		slider = new Slider({
			min: 0,
			value: 0,
			max: 100
		});

		var handle = slider.element.querySelector('.handle');

		DragTestHelper.triggerMouseEvent(handle, 'mousedown', 0, 0);
		DragTestHelper.triggerMouseEvent(document, 'mousemove', 0.5 * document.body.clientWidth, 0);

		async.nextTick(function() {
			assert.strictEqual(50, slider.value);
			done();
		});
	});

	it('should update the drag container when element changes', function() {
		slider = new Slider();
		assert.strictEqual(slider.element, slider.getDrag().container);

		slider.element = document.createElement('div');
		assert.strictEqual(slider.element, slider.getDrag().container);
	});

	it('should update the drag constrain element when element changes', function() {
		slider = new Slider();
		assert.strictEqual(slider.element, slider.getDrag().container);

		var element = document.createElement('div');
		dom.append(element, '<div class="rail"></div>');
		slider.element = element;
		assert.strictEqual(element.querySelector('.rail'), slider.getDrag().constrain);
	});

	it('shouldnt update value if its smaller than min', function() {
		slider = new Slider({
			min: 30,
			value: 50
		});

		slider.value = 10;

		assert.strictEqual(50, slider.value);
	});

	it('shouldnt update value if its bigger than max', function() {
		slider = new Slider({
			max: 100,
			value: 50
		});

		slider.value = 200;

		assert.strictEqual(50, slider.value);
	});

	it('should update value when max becomes smaller than value', function(done) {
		slider = new Slider({
			min: 0,
			value: 50
		});

		slider.min = 80;

		async.nextTick(function() {
			assert.strictEqual(80, slider.value);
			done();
		});
	});

	it('should update value when min becomes bigger than value', function(done) {
		slider = new Slider({
			max: 100,
			value: 50
		});

		slider.max = 20;

		async.nextTick(function() {
			assert.strictEqual(20, slider.value);
			done();
		});
	});

	it('should allow calling the soy template without params', function() {
		var element = document.createElement('div');
		IncrementalDOM.patch(element, Slider.TEMPLATE);
		assert.strictEqual('0%', element.querySelector('.rail-active').style.width);
		assert.strictEqual('0', element.textContent);
	});
});
