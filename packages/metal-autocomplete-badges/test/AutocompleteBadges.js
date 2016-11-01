'use strict';

import { async } from 'metal';
import AutocompleteBadges from '../src/AutocompleteBadges';
import dom from 'metal-dom';

var component;

const elements = ['Alabama', 'Arizona', 'California', 'Colorado', 'Florida', 'Indiana'];

describe('AutocompleteBadges', function() {

	afterEach(function() {
		if (component) {
			component.dispose();
		}
	});

	it('should check display component', function() {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		assert.ok(component.visible);
	});

	it('should check autocomplete is visible with valid query', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		component.getAutocomplete().request('a').then(function() {
			component.getAutocomplete().getList().once('rendered', function() {
				assert.ok(component.getAutocomplete().visible);
				done();
			});
		});
	});

	it('should check autocomplete is not visible with invalid query', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		component.getAutocomplete().request('sadaswqee').then(function() {
			async.nextTick(function() {
				assert.ok(!component.getAutocomplete().visible);
				done();
			});
		});
	});

	it('should process valid query', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		component.getAutocomplete().request('a').then(function() {
			async.nextTick(function() {
				assert.ok(component.getAutocomplete().visible);
				assert.strictEqual(6, component.getAutocomplete().element.querySelectorAll('li').length);
				done();
			});
		});
	});

	it('should process query null data and hide autocomplete', function(done) {
		component = new AutocompleteBadges({
			dataItems: null
		});

		component.getAutocomplete().request('asparagus').then(function() {
			async.nextTick(function() {
				assert.ok(!component.getAutocomplete().visible);
				assert.strictEqual(0, component.getAutocomplete().element.querySelectorAll('li').length);
				done();
			});
		});
	});

	it('should hide autocomplete when select item and check badges length it is equal to 1', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		component.getInput().value = 'a';
		dom.triggerEvent(component.getInput(), 'input');

		component.getAutocomplete().getList().once('rendered', function() {
			component.getAutocomplete().once('select', function(value) {
				assert.strictEqual('Alabama', value.text);
				component.once('rendered', function() {
					assert.ok(!component.getAutocomplete().visible);
					assert.strictEqual(1, component.element.querySelectorAll('.autocomplete-badges--list li').length);
					done();
				});
			});
			dom.triggerEvent(component.getAutocomplete().element.querySelectorAll('li')[0], 'click');
		});
	});

	it('should remove badge item and check if badges length it is equal to 0', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		addBadgesHelper_(component, 1, () => {
			component.once('rendered', function() {
				assert.strictEqual(0, component.element.querySelectorAll('.autocomplete-badges--list li').length);
				done();
			});
			var badge = component.element.querySelectorAll('.autocomplete-badges--list li')[0];
			dom.triggerEvent(badge.querySelector('.remove'), 'click');
		});
	});

	it('should not throw error if disposed before rendered', function() {
		component = new AutocompleteBadges({
			dataItems: elements
		}, false);
		assert.doesNotThrow(() => component.dispose());
	});


	it('should NOT select the first badge when backspace is pressed and the input has some text', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		addBadgesHelper_(component, 1, () => {
			component.getInput().value = 'some text';
			dom.triggerEvent(component.getInput(), 'keydown', {keyCode : 8});
			assert.strictEqual(component.getInput(), document.activeElement);
			done();
		});

	});

	it('should not do anything when left arrow is pressed and there are no badges', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		dom.triggerEvent(component.getInput(), 'keydown', {keyCode : 37});
		assert.strictEqual(0, component.element.querySelectorAll('.autocomplete-badges--list li:focus').length);
		done();

	});

	it('should navigate badges focus with left and right arrow keys', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		addBadgesHelper_(component, 2, () => {
			dom.triggerEvent(component.getInput(), 'keydown', {keyCode : 37});
			let badges = component.element.querySelectorAll('.autocomplete-badges--list li');
			assert.strictEqual(badges[1],document.activeElement);
			dom.triggerEvent(badges[1], 'keydown', {keyCode : 37});
			assert.strictEqual(badges[0],document.activeElement);
			dom.triggerEvent(badges[0], 'keydown', {keyCode : 37});
			assert.strictEqual(badges[0],document.activeElement);
			dom.triggerEvent(badges[0], 'keydown', {keyCode : 39});
			assert.strictEqual(badges[1],document.activeElement);
			dom.triggerEvent(badges[1], 'keydown', {keyCode : 39});
			assert.strictEqual(component.getInput(),document.activeElement);
			done();
		});
	});

	it('should respond to backspace key events properly', function(done) {

		var component = new AutocompleteBadges({
			dataItems: elements
		});

		addBadgesHelper_(component, 2, () => {
			dom.triggerEvent(component.getInput(), 'keydown', {keyCode : 8});
			let badges = component.element.querySelectorAll('.autocomplete-badges--list li');
			assert.strictEqual(badges[1],document.activeElement);
			component.once('rendered', function () {
				assert.strictEqual(1,component.element.querySelectorAll('.autocomplete-badges--list li').length);
				component.once('rendered', function () {
					assert.strictEqual(0,component.element.querySelectorAll('.autocomplete-badges--list li').length);
					assert.strictEqual(document.activeElement, component.getInput());
					done();
				});
				dom.triggerEvent(badges[0], 'keydown', {keyCode : 8});
			});
			dom.triggerEvent(badges[1], 'keydown', {keyCode : 8});
		});
	});


	it('should respond to Enter key properly', function(done) {
		component = new AutocompleteBadges({
			dataItems: elements
		});

		addBadgesHelper_(component, 1, () => {
			dom.triggerEvent(component.getInput(), 'keydown', {keyCode : 37});
			let badges = component.element.querySelectorAll('.autocomplete-badges--list li');
			assert.strictEqual(badges[0],document.activeElement);
			component.once('rendered', function () {
				assert.strictEqual(0, component.element.querySelectorAll('.autocomplete-badges--list li').length);
				assert.strictEqual(component.getInput().value, elements.slice().sort().shift());
				done();
			});
			dom.triggerEvent(badges[0], 'keydown', {keyCode : 13});
		});

	});

	/**
	 * Helper for adding badges to the component
	 * @param component
	 * @param count
	 * @param callback
	 * @private
	 */
	function addBadgesHelper_ (component, count, callback) {
		component.getInput().value = 'a';
		dom.triggerEvent(component.getInput(), 'input');
		component.getAutocomplete().getList().once('rendered', function() {
			component.getAutocomplete().once('select', function () {
				component.once('rendered', function () {
					if (count > 1) {
						addBadgesHelper_(component, count - 1, callback);
					} else {
						callback();
					}
				});
			});
			dom.triggerEvent(component.getAutocomplete().element.querySelectorAll('li')[0], 'click');
		});
	}

});
