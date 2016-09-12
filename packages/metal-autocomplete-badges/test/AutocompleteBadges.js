'use strict';

import { async } from 'metal';
import AutocompleteBadges from '../src/AutocompleteBadges';
import dom from 'metal-dom';

var component;
var input;

var elements = ['Alabama', 'Arizona', 'California', 'Colorado', 'Florida', 'Indiana'];

describe('AutocompleteBadges', function() {

	afterEach(function() {
		if (component) {
			component.dispose();
		}		
	});

	it('should check display component', function() {
		component = new AutocompleteBadges({
			elements: elements
		});

		assert.ok(component.visible);
	});

	it('should check elements length greater than zero with valid query', function() {
		component = new AutocompleteBadges({
			elements: elements
		});

		assert.ok(component.getFilteredElements_('a').length > 0);
	});

	it('should check elements length equals zero with invalid query', function() {
		component = new AutocompleteBadges({
			elements: elements
		});

		assert.ok(component.getFilteredElements_('sadaswqee').length === 0);
	});

	it('should process valid query', function(done) {
		component = new AutocompleteBadges({
			elements: elements
		});

		component.autocomplete_.request('a').then(function() {
			async.nextTick(function() {
				assert.ok(component.autocomplete_.visible);
				assert.strictEqual(6, component.autocomplete_.element.querySelectorAll('li').length);
				done();
			});
		})
	});

	it('should process query null data and hide autocomplete', function(done) {
		component = new AutocompleteBadges({
			elements: null
		});

		component.autocomplete_.request('asparagus').then(function() {
			async.nextTick(function() {
				assert.ok(!component.autocomplete_.visible);
				assert.strictEqual(0, component.autocomplete_.element.querySelectorAll('li').length);
				done();
			});
		});
	});

	it('should select item and check badges length it is equal to 1', function(done) {		
		component = new AutocompleteBadges({
			elements: elements
		});

		component.inputElement.value = 'a';
		dom.triggerEvent(component.inputElement, 'input');

		component.autocomplete_.getList().once('rendered', function() {
			component.autocomplete_.once('select', function(value) {
				assert.strictEqual('Alabama', value.text);
				component.once('rendered', function() {					
					assert.strictEqual(1, component.element.querySelectorAll('.autocomplete-badges--list li').length);
					done();	
				})				
			});
			dom.triggerEvent(component.autocomplete_.element.querySelectorAll('li')[0], 'click');
		});
	});

});
