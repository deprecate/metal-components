'use strict';

import async from 'bower:metal/src/async/async';
import dom from 'bower:metal/src/dom/dom';
import Position from 'bower:metal-position/src/Position';
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
		}).render();

		var sliderInput = slider.element.querySelector('input[name="sliderInput"]');

		assert.ok(sliderInput);
		assert.strictEqual('50', sliderInput.getAttribute('value'));
	});

	it('should update the value of the hidden input when the slider value changes', function(done) {
		slider = new Slider({
			inputName: 'sliderInput',
			value: 20
		}).render();

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
		}).render();

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

	it('shouldnt update value if its smaller than min', function() {
		slider = new Slider({
			min: 30,
			value: 50
		}).render();

		slider.value = 10;

		assert.strictEqual(50, slider.value);
	});

	it('shouldnt update value if its bigger than max', function() {
		slider = new Slider({
			max: 100,
			value: 50
		}).render();

		slider.value = 200;

		assert.strictEqual(50, slider.value);
	});

	it('should update value when max becomes smaller than value', function(done) {
		slider = new Slider({
			min: 0,
			value: 50
		}).render();

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
		}).render();

		slider.max = 20;

		async.nextTick(function() {
			assert.strictEqual(20, slider.value);
			done();
		});
	});
});
