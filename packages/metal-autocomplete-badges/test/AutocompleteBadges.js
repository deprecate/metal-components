'use strict';

import { async } from 'metal';
import AutocompleteBadges from '../src/AutocompleteBadges';
import dom from 'metal-dom';

var component;

var elements = ['Alabama', 'Arizona', 'California', 'Colorado', 'Florida', 'Indiana'];

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

		component.getInput().value = 'a';
		dom.triggerEvent(component.getInput(), 'input');

		component.getAutocomplete().getList().once('rendered', function() {
			component.getAutocomplete().once('select', function() {
				component.once('rendered', function() {
					component.once('rendered', function() {
						assert.strictEqual(0, component.element.querySelectorAll('.autocomplete-badges--list li').length);
						done();
					});
					var badge = component.element.querySelectorAll('.autocomplete-badges--list li')[0];
					dom.triggerEvent(badge.querySelector('.remove'), 'click');
				});
			});
			dom.triggerEvent(component.getAutocomplete().element.querySelectorAll('li')[0], 'click');
		});
	});

});
