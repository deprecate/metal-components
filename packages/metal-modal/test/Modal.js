'use strict';

import async from 'bower:metal/src/async/async';
import dom from 'bower:metal/src/dom/dom';
import ComponentRegistry from 'bower:metal/src/component/ComponentRegistry';
import Modal from '../src/Modal';
import SoyComponent from 'bower:metal/src/soy/SoyComponent';

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

	it('should set the "role" HTML attribute to "dialog" by default', function() {
		modal = new Modal().render();
		assert.strictEqual('dialog', modal.element.getAttribute('role'));
	});

	it('should set the "role" HTML attribute to value specified by the "role" attr', function() {
		modal = new Modal({
			role: 'alertdialog'
		}).render();
		assert.strictEqual('alertdialog', modal.element.getAttribute('role'));
	});

	describe('Automatic Focus', function() {
		it('should automatically focus close button', function() {
			modal = new Modal({
				header: 'My Header'
			}).render();
			assert.strictEqual(modal.element.querySelector('.close'), document.activeElement);
		});

		it('should not automatically focus any element if "autoFocus" attr is set to "false"', function() {
			var prevActiveElement = document.activeElement;
			modal = new Modal({
				autoFocus: false,
				header: 'My Header'
			}).render();
			assert.strictEqual(prevActiveElement, document.activeElement);
		});

		it('should automatically focus internal element that matches selector specified by "autoFocus" attr', function() {
			modal = new Modal({
				autoFocus: '.body-btn',
				body: SoyComponent.sanitizeHtml('<button class="body-btn">Body Button</button>')
			}).render();
			assert.strictEqual(modal.element.querySelector('.body-btn'), document.activeElement);
		});

		it('should not automatically focus "autoFocus" element if modal is rendered invisible', function() {
			var prevActiveElement = document.activeElement;
			modal = new Modal({
				autoFocus: '.body-btn',
				body: SoyComponent.sanitizeHtml('<button class="body-btn">Body Button</button>'),
				visible: false
			}).render();
			assert.strictEqual(prevActiveElement, document.activeElement);
		});

		it('should automatically focus "autoFocus" element when modal becomes visible', function(done) {
			var element = document.createElement('button');
			dom.enterDocument(element);
			modal = new Modal({
				autoFocus: '.body-btn',
				body: SoyComponent.sanitizeHtml('<button class="body-btn">Body Button</button>'),
				visible: false
			}).render();

			modal.visible = true;
			modal.once('attrsChanged', function() {
				assert.strictEqual(modal.element.querySelector('.body-btn'), document.activeElement);
				done();
			});
		});
	});

	describe('Refocus Last Element', function() {
		it('should refocus the previously active element when modal is hidden', function(done) {
			var element = document.createElement('button');
			dom.enterDocument(element);
			element.focus();

			modal = new Modal({
				header: 'My Header',
				visible: false
			}).render();

			modal.visible = true;
			modal.once('attrsChanged', function() {
				assert.notStrictEqual(element, document.activeElement);
				modal.visible = false;
				modal.once('attrsChanged', function() {
					assert.strictEqual(element, document.activeElement);
					done();
				});
			});
		});
	});

	describe('Restrict Focus', function() {
		it('should not allow focusing elements outside the modal while it\'s visible', function() {
			var element = document.createElement('button');
			dom.enterDocument(element);
			modal = new Modal().render();

			// Focus and call the `focus` event manually, since the test browser's window may not have
			// focus at the moment, and it's not guaranteed that the event will fire autimatically.
			element.focus();
			dom.triggerEvent(element, 'focus');
			assert.notStrictEqual(element, document.activeElement);
			assert.strictEqual(modal.element.querySelector('.modal-dialog'), document.activeElement);
		});

		it('should not restrict focusing outside modal if not visible', function() {
			var element = document.createElement('button');
			dom.enterDocument(element);
			modal = new Modal({
				visible: false
			}).render();

			element.focus();
			dom.triggerEvent(element, 'focus');
			assert.strictEqual(element, document.activeElement);
		});

		it('should restrict/unrestrict focusing outside modal as visibility changes', function(done) {
			var element = document.createElement('button');
			dom.enterDocument(element);
			modal = new Modal().render();

			modal.visible = false;
			modal.once('attrsChanged', function() {
				element.focus();
				dom.triggerEvent(element, 'focus');
				assert.strictEqual(element, document.activeElement);

				modal.visible = true;
				modal.once('attrsChanged', function() {
					element.focus();
					dom.triggerEvent(element, 'focus');
					assert.notStrictEqual(element, document.activeElement);
					assert.strictEqual(modal.element.querySelector('.modal-dialog'), document.activeElement);
					done();
				});
			});
		});

		it('should not restrict focusing outside modal if "overlay" is false', function() {
			var element = document.createElement('button');
			dom.enterDocument(element);
			modal = new Modal({
				overlay: false
			}).render();

			element.focus();
			dom.triggerEvent(element, 'focus');
			assert.strictEqual(element, document.activeElement);
		});

		it('should not restrict focusing inside modal', function() {
			modal = new Modal({
				body: SoyComponent.sanitizeHtml('<button class="body-btn">Body Button</button>'),
			}).render();

			var element = modal.element.querySelector('.body-btn');
			element.focus();
			dom.triggerEvent(element, 'focus');
			assert.strictEqual(element, document.activeElement);
		});
	});

	it('should modal progressive enchance always as hidden', function() {
		var markup = ComponentRegistry.Templates.Modal.content({
			id: 'modal',
			elementClasses: 'centered',
			header: 'header',
			body: 'body',
			footer: 'footer',
			overlay: true,
			role: 'dialog'
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
