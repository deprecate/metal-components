'use strict';

import dom from 'metal-dom';
import Soy from 'metal-soy';
import Alert from '../src/Alert';

describe('Alert', function() {
	var component;

	afterEach(function() {
		component.dispose();
	});

	it('should show alert and fire transitionend', function(done) {
		component = new Alert();
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
		});
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
		});
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
		});
		component.close();
		dom.once(component.element, 'transitionend', function() {
			assert.ok(component.isDisposed());
			done();
		});
	});

	it('should hide alert and fire transitionend from close element', function(done) {
		component = new Alert({
			visible: true
		});
		dom.triggerEvent(component.element.querySelector('.close'), 'click');
		dom.once(component.element, 'transitionend', function() {
			assert.ok(!component.visible);
			done();
		});
	});

	it('should show alert via `show` method', function() {
		component = new Alert();
		component.show();
		assert.ok(component.visible);
	});

	it('should alert be not dismissible', function() {
		component = new Alert({
			visible: true,
			dismissible: false
		});
		assert.ok(!dom.hasClass(component.element, 'alert-dismissible'));
		assert.ok(!component.element.querySelector('.close'));
	});

	it('should decorate', function() {
		var config = {
			elementClasses: 'alert-success fade',
			body: Soy.toIncDom('<b>body</b>'),
			dismissible: true
		};
		var element = document.createElement('div');
		IncrementalDOM.patch(element, () => Alert.TEMPLATE(config));

		var markupFromDom = element.childNodes[0].outerHTML;
		component = new Alert(config);

		assert.strictEqual(component.element.outerHTML, markupFromDom);
	});

	it('should close alert when click outside', function(done) {
		component = new Alert({
			visible: true
		});

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
		});

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
		});

		assert.ok(!component.visible);
		component.visible = true;
		dom.once(component.element, 'transitionend', function() {
			dom.once(component.element, 'transitionend', function() {
				setTimeout(function() {
					assert.ok(!component.visible);
					done();
				}, 100);
			});
		});
	});
});
