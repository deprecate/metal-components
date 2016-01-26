'use strict';

import dom from 'npm:metal/src/dom/dom';
import Alert from '../src/Alert';
import SoyTemplates from 'npm:metal/src/soy/SoyTemplates';
import 'npm:metal/src/dom/events';

describe('Alert', function() {
	var component;

	afterEach(function() {
		component.dispose();
	});

	it('should show alert and fire transitionend', function(done) {
		component = new Alert().render();
		assert.ok(!component.visible);
		dom.once(component.element, 'transitionend', function() {
			assert.ok(component.visible);
			component.dispose();
			done();
		});
		component.visible = true;
	});

	it('should hide alert and fire transitionend', function(done) {
		component = new Alert({
			visible: true
		}).render();
		assert.ok(component.visible);
		dom.once(component.element, 'transitionend', function() {
			assert.ok(!component.visible);
			component.dispose();
			done();
		});
		component.visible = false;
	});

	it('should toggle alert and fire transitionend', function(done) {
		component = new Alert({
			visible: true
		}).render();
		assert.ok(component.visible);
		dom.once(component.element, 'transitionend', function() {
			assert.ok(!component.visible);
			dom.once(component.element, 'transitionend', function() {
				component.dispose();
				done();
			});
			component.toggle();
		});
		component.toggle();
	});

	it('should close alert, fire transitionend and dispose itself', function(done) {
		component = new Alert({
			visible: true
		}).render();
		component.close();
		dom.once(component.element, 'transitionend', function() {
			assert.ok(component.isDisposed());
			done();
		});
	});

	it('should hide alert and fire transitionend from close element', function(done) {
		component = new Alert({
			visible: true
		}).render();
		dom.triggerEvent(component.element.querySelector('.close'), 'click');
		dom.once(component.element, 'transitionend', function() {
			assert.ok(!component.visible);
			done();
		});
	});

	it('should alert be not dismissible', function() {
		component = new Alert({
			visible: true,
			dismissible: false
		}).render();
		assert.ok(!dom.hasClass(component.element, 'alert-dismissible'));
		assert.ok(!component.element.querySelector('.close'));
	});

	it('should decorate', function() {
		var config = {
			element: '#alert',
			elementClasses: 'alert-success fade',
			id: 'alert',
			body: 'body',
			dismissible: true
		};

		var markup = SoyTemplates.get('Alert', 'render')(config);
		dom.append(document.body, markup.content);
		var markupFromDom = document.getElementById('alert').outerHTML;
		component = new Alert(config).decorate();

		assert.strictEqual(component.element.outerHTML, markupFromDom);

		component.dispose();
	});

	it('should close alert when click outside', function(done) {
		component = new Alert({
			visible: true
		}).render();

		assert.ok(component.visible);
		dom.triggerEvent(component.element, 'click');
		dom.once(component.element, 'transitionend', function() {
			assert.ok(component.visible);
			dom.triggerEvent(document, 'click');
			dom.once(component.element, 'transitionend', function() {
				assert.ok(!component.visible);
				done();
			});
		});
	});

	it('should not close alert when click on the element', function(done) {
		component = new Alert({
			visible: true
		}).render();

		assert.ok(component.visible);
		dom.triggerEvent(component.element, 'click');
		dom.once(component.element, 'transitionend', function() {
			assert.ok(component.visible);
			dom.triggerEvent(component.element, 'click');
			assert.ok(component.visible);
			done();
		});
	});

	it('should hide alert after delay', function(done) {
		component = new Alert({
			hideDelay: 0
		}).render();

		assert.ok(!component.visible);
		component.visible = true;
		dom.once(component.element, 'transitionend', function() {
			dom.once(component.element, 'transitionend', function() {
				assert.ok(!component.visible);
				done();
			});
		});
	});
});
