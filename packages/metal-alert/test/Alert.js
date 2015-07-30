'use strict';

import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Alert from '../src/Alert';
import 'bower:metal/src/dom/events';

describe('Alert', function() {
	it('should show alert and fire transitionend', function(done) {
		var component = new Alert().render();
		assert.ok(!component.visible);
		dom.once(component.element, 'transitionend', function() {
			assert.ok(component.visible);
			component.dispose();
			done();
		});
		component.visible = true;
	});

	it('should hide alert and fire transitionend', function(done) {
		var component = new Alert({
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
		var component = new Alert({
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
		var component = new Alert({
			visible: true
		}).render();
		component.close();
		dom.once(component.element, 'transitionend', function() {
			assert.ok(component.isDisposed());
			done();
		});
	});

	it('should hide alert and fire transitionend from close element', function(done) {
		var component = new Alert({
			visible: true
		}).render();
		dom.triggerEvent(component.element.querySelector('.close'), 'click');
		dom.once(component.element, 'transitionend', function() {
			assert.ok(!component.visible);
			done();
		});
	});

	it('should alert be not dismissible', function() {
		var component = new Alert({
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

		var markup = ComponentRegistry.Templates.Alert.content(config);
		dom.append(document.body, markup.content);
		var markupFromDom = document.getElementById('alert').outerHTML;
		var component = new Alert(config).decorate();

		assert.strictEqual(component.element.outerHTML, markupFromDom);

		component.dispose();
	});

	it('should close alert when click outside', function(done) {
		var component = new Alert({
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
		var component = new Alert({
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
		var alert = new Alert({
			hideDelay: 0
		}).render();

		assert.ok(!alert.visible);
		alert.visible = true;
		dom.once(alert.element, 'transitionend', function() {
			dom.once(alert.element, 'transitionend', function() {
				assert.ok(!alert.visible);
				done();
			});
		});
	});
});
