'use strict';

import async from 'bower:metal/src/async/async';
import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Modal from '../src/Modal';

var modal;

describe('Modal', function() {
	afterEach(function() {
		if (modal) {
			modal.dispose();
		}
	});

	it('should render with default attributes', function() {
		modal = new Modal().render();
		var header = modal.getSurfaceElement('header').innerHTML;
		var body = modal.getSurfaceElement('body').innerHTML;
		var footer = modal.getSurfaceElement('footer').innerHTML;
		assert.strictEqual('', header);
		assert.strictEqual('', body);
		assert.strictEqual('', footer);
		assert.strictEqual('block', modal.element.style.display);
	});

	it('should render with header only', function() {
		modal = new Modal({
			header: 'header'
		}).render();
		var headerElement = modal.getSurfaceElement('header');
		var body = modal.getSurfaceElement('body').innerHTML;
		var footer = modal.getSurfaceElement('footer').innerHTML;
		assert.strictEqual('header', headerElement.childNodes[1].textContent);
		assert.ok(dom.hasClass(headerElement.childNodes[0], 'close'));
		assert.strictEqual('', body);
		assert.strictEqual('', footer);
	});

	it('should render with body only', function() {
		modal = new Modal({
			body: 'body'
		}).render();
		var header = modal.getSurfaceElement('header').innerHTML;
		var body = modal.getSurfaceElement('body').innerHTML;
		var footer = modal.getSurfaceElement('footer').innerHTML;
		assert.strictEqual('', header);
		assert.strictEqual('body', body);
		assert.strictEqual('', footer);
	});

	it('should render with footer only', function() {
		modal = new Modal({
			footer: 'footer'
		}).render();
		var header = modal.getSurfaceElement('header').innerHTML;
		var body = modal.getSurfaceElement('body').innerHTML;
		var footer = modal.getSurfaceElement('footer').innerHTML;
		assert.strictEqual('', header);
		assert.strictEqual('', body);
		assert.strictEqual('footer', footer);
	});

	it('should cause dom repaint when body attribute change', function(done) {
		modal = new Modal().render();
		modal.body = 'body';
		async.nextTick(function() {
			var body = modal.getSurfaceElement('body').innerHTML;
			assert.strictEqual('body', body);
			done();
		});
	});

	it('should cause dom repaint when header attribute change', function(done) {
		modal = new Modal().render();
		modal.header = 'header';
		async.nextTick(function() {
			var header = modal.getSurfaceElement('header');
			assert.strictEqual('header', header.childNodes[1].textContent);
			assert.ok(dom.hasClass(header.childNodes[0], 'close'));
			done();
		});
	});

	it('should cause dom repaint when footer attribute change', function(done) {
		modal = new Modal().render();
		modal.footer = 'footer';
		async.nextTick(function() {
			var footer = modal.getSurfaceElement('footer').innerHTML;
			assert.strictEqual('footer', footer);
			done();
		});
	});

	it('should cause dom repaint when visible attribute change', function(done) {
		modal = new Modal().render();
		modal.visible = false;
		async.nextTick(function() {
			assert.strictEqual('', modal.element.style.display);

			modal.visible = true;
			async.nextTick(function() {
				assert.strictEqual('block', modal.element.style.display);
				done();
			});
		});
	});

	it('should show and hide overlay when overlay attribute change', function(done) {
		modal = new Modal().render();
		modal.overlay = false;
		async.nextTick(function() {
			assert.ok(!modal.overlayElement.parentNode);
			modal.overlay = true;
			async.nextTick(function() {
				assert.ok(modal.overlayElement.parentNode);
				done();
			});
		});
	});

	it('should close on clicking close icon', function(done) {
		modal = new Modal({
			header: 'header'
		}).render();
		dom.triggerEvent(modal.element.querySelector('.close'), 'click');
		async.nextTick(function() {
			assert.ok(!modal.visible);
			done();
		});
	});

	it('should close modal when press the escape key', function(done) {
		modal = new Modal().render();
		dom.triggerEvent(document, 'keyup');
		async.nextTick(function() {
			assert.ok(modal.visible);
			dom.triggerEvent(document, 'keyup', {
				keyCode: 27
			});
			async.nextTick(function() {
				assert.ok(!modal.visible);
				done();
			});
		});
	});

	it('should not close modal when press escape key and the attribute hideOnEscape is not true', function(done) {
		modal = new Modal({
			hideOnEscape: false
		}).render();
		dom.triggerEvent(document, 'keyup', {
			keyCode: 27
		});
		async.nextTick(function() {
			assert.ok(modal.visible);
			done();
		});
	});

	it('should close modal overlay when modal closes', function(done) {
		modal = new Modal().render();
		modal.hide();
		async.nextTick(function() {
			assert.ok(!modal.overlayElement.parentNode);
			done();
		});
	});

	it('should only show modal overlay when modal is visible', function(done) {
		modal = new Modal({
			visible: false
		}).render();
		assert.ok(!modal.overlayElement.parentNode);
		modal.visible = true;
		async.nextTick(function() {
			assert.ok(modal.overlayElement.parentNode);
			done();
		});
	});

	it('should modal progressive enchance always as hidden', function() {
		var markup = ComponentRegistry.Templates.Modal.content({
			id: 'modal',
			elementClasses: 'centered',
			header: 'header',
			body: 'body',
			footer: 'footer',
			overlay: true
		});

		dom.append(document.body, markup.content);
		var outerHTML = document.getElementById('modal').outerHTML;

		modal = new Modal({
			element: '#modal',
			header: 'header',
			body: 'body',
			footer: 'footer',
			visible: false
		}).decorate();

		assert.strictEqual(modal.element.outerHTML, outerHTML);
	});

	it('should change to visible when decorated and visible is true', function() {
		var markup = ComponentRegistry.Templates.Modal.content({
			id: 'modal',
			elementClasses: 'centered',
			header: 'header',
			body: 'body',
			footer: 'footer',
			overlay: true
		}, null);

		dom.append(document.body, markup.content);

		modal = new Modal({
			element: '#modal',
			header: 'header',
			body: 'body',
			footer: 'footer',
			visible: true
		}).decorate();

		assert.ok(!dom.hasClass(modal.element, 'hidden'));
	});

	it('should handle calling template without passing "elementClasses"', function() {
		var markup = ComponentRegistry.Templates.Modal.content({
			id: 'modal',
			header: 'header',
			body: 'body',
			footer: 'footer',
			overlay: true
		}, null);
		dom.append(document.body, markup.content);

		var element = document.querySelector('#modal');
		assert.strictEqual('modal component', element.className);

		element.remove();
	});

	it('should set "visible" attr to false when "hide" method is called', function() {
		modal = new Modal().render();
		modal.hide();
		assert.ok(!modal.visible);
	});

	it('should set "visible" attr to true when "show" method is called', function() {
		modal = new Modal({
			visible: false
		}).render();
		modal.show();
		assert.ok(modal.visible);
	});
});
