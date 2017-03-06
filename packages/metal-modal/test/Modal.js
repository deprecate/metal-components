'use strict';

import { async } from 'metal';
import dom from 'metal-dom';
import Modal from '../src/Modal';

describe('Modal', function() {
	var modal;

	afterEach(function() {
		if (modal) {
			modal.dispose();
		}
	});

	it('should render with default state', function() {
		modal = new Modal();
		var header = modal.element.querySelector('.modal-header');
		var body = modal.element.querySelector('.modal-body');
		var footer = modal.element.querySelector('.modal-footer');
		assert.strictEqual('', header.innerHTML);
		assert.strictEqual('', body.innerHTML);
		assert.strictEqual('', footer.innerHTML);
		assert.strictEqual('block', modal.element.style.display);
	});

	it('should render with header only', function() {
		modal = new Modal({
			header: 'header'
		});
		var headerElement = modal.element.querySelector('.modal-header');
		var body = modal.element.querySelector('.modal-body').innerHTML;
		var footer = modal.element.querySelector('.modal-footer').innerHTML;
		assert.strictEqual('header', headerElement.childNodes[1].textContent);
		assert.ok(dom.hasClass(headerElement.childNodes[0], 'close'));
		assert.strictEqual('', body);
		assert.strictEqual('', footer);
	});

	it('should render with body only', function() {
		modal = new Modal({
			body: 'body'
		});
		var header = modal.element.querySelector('.modal-header').innerHTML;
		var body = modal.element.querySelector('.modal-body').innerHTML;
		var footer = modal.element.querySelector('.modal-footer').innerHTML;
		assert.strictEqual('', header);
		assert.strictEqual('body', body);
		assert.strictEqual('', footer);
	});

	it('should render with footer only', function() {
		modal = new Modal({
			footer: 'footer'
		});
		var header = modal.element.querySelector('.modal-header').innerHTML;
		var body = modal.element.querySelector('.modal-body').innerHTML;
		var footer = modal.element.querySelector('.modal-footer').innerHTML;
		assert.strictEqual('', header);
		assert.strictEqual('', body);
		assert.strictEqual('footer', footer);
	});

	it('should cause dom repaint when body state changes', function(done) {
		modal = new Modal();
		modal.body = 'body';
		async.nextTick(function() {
			var body = modal.element.querySelector('.modal-body').innerHTML;
			assert.strictEqual('body', body);
			done();
		});
	});

	it('should cause dom repaint when header state changes', function(done) {
		modal = new Modal();
		modal.header = 'header';
		async.nextTick(function() {
			var header = modal.element.querySelector('.modal-header');
			assert.strictEqual('header', header.childNodes[1].textContent);
			assert.ok(dom.hasClass(header.childNodes[0], 'close'));
			done();
		});
	});

	it('should cause dom repaint when footer state changes', function(done) {
		modal = new Modal();
		modal.footer = 'footer';
		async.nextTick(function() {
			var footer = modal.element.querySelector('.modal-footer').innerHTML;
			assert.strictEqual('footer', footer);
			done();
		});
	});

	it('should cause dom repaint when visible state changes', function(done) {
		modal = new Modal();
		modal.visible = false;
		async.nextTick(function() {
			assert.strictEqual('none', modal.element.style.display);

			modal.visible = true;
			async.nextTick(function() {
				assert.strictEqual('block', modal.element.style.display);
				done();
			});
		});
	});

	it('should show and hide overlay when overlay state changes', function(done) {
		modal = new Modal();
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
		});
		dom.triggerEvent(modal.element.querySelector('.close'), 'click');
		async.nextTick(function() {
			assert.ok(!modal.visible);
			done();
		});
	});

	it('should close modal when press the escape key', function(done) {
		modal = new Modal();
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

	it('should not close modal when press escape key and the hideOnEscape state is not true', function(done) {
		modal = new Modal({
			hideOnEscape: false
		});
		dom.triggerEvent(document, 'keyup', {
			keyCode: 27
		});
		async.nextTick(function() {
			assert.ok(modal.visible);
			done();
		});
	});

	it('should close modal overlay when modal closes', function(done) {
		modal = new Modal();
		modal.hide();
		async.nextTick(function() {
			assert.ok(!modal.overlayElement.parentNode);
			done();
		});
	});

	it('should only show modal overlay when modal is visible', function(done) {
		modal = new Modal({
			visible: false
		});
		assert.ok(!modal.overlayElement.parentNode);
		modal.visible = true;
		async.nextTick(function() {
			assert.ok(modal.overlayElement.parentNode);
			done();
		});
	});

	it('should set the "role" HTML attribute to "dialog" by default', function() {
		modal = new Modal();
		assert.strictEqual('dialog', modal.element.childNodes[0].getAttribute('role'));
	});

	it('should set the "role" HTML attribute to value specified by the "role" state', function() {
		modal = new Modal({
			role: 'alertdialog'
		});
		assert.strictEqual('alertdialog', modal.element.childNodes[0].getAttribute('role'));
	});

	it('should set the header and body ids to values specified by the user', function() {
		modal = new Modal({
			bodyId: 'body',
			header: 'My Header',
			headerId: 'header'
		});
		assert.ok(modal.element.querySelector('#header'));
		assert.ok(modal.element.querySelector('#body'));
	});

	describe('Automatic Focus', function() {
		it('should automatically focus close button', function() {
			modal = new Modal({
				header: 'My Header'
			});
			assert.strictEqual(modal.element.querySelector('.close'), document.activeElement);
		});

		it('should not automatically focus any element if "autoFocus" state is set to "false"', function() {
			var prevActiveElement = document.activeElement;
			modal = new Modal({
				autoFocus: false,
				header: 'My Header'
			});
			assert.strictEqual(prevActiveElement, document.activeElement);
		});

		it('should automatically focus internal element that matches selector specified by "autoFocus" state', function() {
			modal = new Modal({
				autoFocus: '.body-btn',
				body: '<button class="body-btn">Body Button</button>'
			});
			assert.strictEqual(modal.element.querySelector('.body-btn'), document.activeElement);
		});

		it('should not automatically focus "autoFocus" element if modal is rendered invisible', function() {
			var prevActiveElement = document.activeElement;
			modal = new Modal({
				autoFocus: '.body-btn',
				body: '<button class="body-btn">Body Button</button>',
				visible: false
			});
			assert.strictEqual(prevActiveElement, document.activeElement);
		});

		it('should automatically focus "autoFocus" element when modal becomes visible', function(done) {
			var element = document.createElement('button');
			dom.enterDocument(element);
			modal = new Modal({
				autoFocus: '.body-btn',
				body: '<button class="body-btn">Body Button</button>',
				visible: false
			});

			modal.visible = true;
			modal.once('stateChanged', function() {
				assert.strictEqual(modal.element.querySelector('.body-btn'), document.activeElement);
				dom.exitDocument(element);
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
			});

			modal.visible = true;
			modal.once('stateChanged', function() {
				assert.notStrictEqual(element, document.activeElement);
				modal.visible = false;
				modal.once('stateChanged', function() {
					assert.strictEqual(element, document.activeElement);
					dom.exitDocument(element);
					done();
				});
			});
		});

		it('should refocus the previously active element when modal is hidden and element changes', function(done) {
			var element = document.createElement('button');
			dom.enterDocument(element);
			element.focus();

			modal = new Modal({
				header: 'My Header',
				visible: false
			});

			modal.visible = true;
			modal.once('stateChanged', function() {
				assert.notStrictEqual(element, document.activeElement);
				var oldElement = modal.element;
				modal.element = document.createElement('div');
				dom.exitDocument(oldElement);
				assert.notStrictEqual(element, document.activeElement);

				modal.visible = false;
				modal.once('stateChanged', function() {
					assert.strictEqual(element, document.activeElement);
					dom.exitDocument(element);
					done();
				});
			});
		});
	});

	describe('Restrict Focus', function() {
		var outsideElement;

		beforeEach(function() {
			outsideElement = document.createElement('button');
			dom.enterDocument(outsideElement);
		});

		afterEach(function() {
			dom.exitDocument(outsideElement);
		});

		it('should not allow focusing elements outside the modal while it\'s visible', function() {
			modal = new Modal();

			// Focus and call the `focus` event manually, since the test browser's window may not have
			// focus at the moment, and it's not guaranteed that the event will fire autimatically.
			outsideElement.focus();
			dom.triggerEvent(outsideElement, 'focus');
			assert.notStrictEqual(outsideElement, document.activeElement);
			assert.strictEqual(modal.element.querySelector('.modal-dialog'), document.activeElement);
		});

		it('should not restrict focusing outside modal if not visible', function() {
			modal = new Modal({
				visible: false
			});

			outsideElement.focus();
			dom.triggerEvent(outsideElement, 'focus');
			assert.strictEqual(outsideElement, document.activeElement);
		});

		it('should restrict/unrestrict focusing outside modal as visibility changes', function(done) {
			modal = new Modal();

			modal.visible = false;
			modal.once('stateChanged', function() {
				outsideElement.focus();
				dom.triggerEvent(outsideElement, 'focus');
				assert.strictEqual(outsideElement, document.activeElement);

				modal.visible = true;
				modal.once('stateChanged', function() {
					outsideElement.focus();
					dom.triggerEvent(outsideElement, 'focus');
					assert.notStrictEqual(outsideElement, document.activeElement);
					assert.strictEqual(modal.element.querySelector('.modal-dialog'), document.activeElement);
					done();
				});
			});
		});

		it('should not restrict focusing outside modal if "overlay" is false', function() {
			modal = new Modal({
				overlay: false
			});

			outsideElement.focus();
			dom.triggerEvent(outsideElement, 'focus');
			assert.strictEqual(outsideElement, document.activeElement);
		});

		it('should not restrict focusing inside modal', function() {
			modal = new Modal({
				body: '<button class="body-btn">Body Button</button>',
			});

			var element = modal.element.querySelector('.body-btn');
			element.focus();
			dom.triggerEvent(element, 'focus');
			assert.strictEqual(element, document.activeElement);
		});
	});

	it('should progressive enhance always as hidden', function() {
		var data = {
			body: 'body',
			bodyId: 'header',
			elementClasses: 'centered',
			footer: 'footer',
			header: 'header',
			headerId: 'header',
			id: 'modal',
			noCloseButton: true,
			overlay: true,
			role: 'dialog'
		};
		var element = document.createElement('div');
		IncrementalDOM.patch(element, () => Modal.TEMPLATE(data));
		var outerHTML = element.innerHTML;

		modal = new Modal({
			body: 'body',
			bodyId: 'header',
			element: element.childNodes[0],
			elementClasses: 'centered',
			footer: 'footer',
			header: 'header',
			headerId: 'header',
			noCloseButton: true,
			visible: false
		});

		assert.strictEqual(modal.element.outerHTML, outerHTML);
	});

	it('should change to visible when decorated and visible is true', function() {
		var data = {
			id: 'modal',
			elementClasses: 'centered',
			header: 'header',
			body: 'body',
			footer: 'footer',
			overlay: true
		};
		var element = document.createElement('div');
		IncrementalDOM.patch(element, () => Modal.TEMPLATE(data));

		modal = new Modal({
			element: element.childNodes[0],
			header: 'header',
			body: 'body',
			footer: 'footer',
			visible: true
		});

		assert.ok(!dom.hasClass(modal.element, 'hidden'));
	});

	it('should handle calling template without passing "elementClasses"', function() {
		var data = {
			header: 'header',
			body: 'body',
			footer: 'footer',
			overlay: true
		};
		var element = document.createElement('div');
		IncrementalDOM.patch(element, () => Modal.TEMPLATE(data));

		element = element.childNodes[0];
		assert.strictEqual('modal', element.className);
	});

	it('should set "visible" state to false when "hide" method is called', function() {
		modal = new Modal();
		modal.hide();
		assert.ok(!modal.visible);
	});

	it('should set "visible" state to true when "show" method is called', function() {
		modal = new Modal({
			visible: false
		});
		modal.show();
		assert.ok(modal.visible);
	});

	it('should emit the "hide" event when the hide method is called', function() {
		var spy = sinon.spy();
		modal = new Modal({
			events: {hide: spy},
			visible: false
		});
		modal.hide();
		assert.ok(spy.called);
	});

	it('should not set visibility to false on "hide" when preventDefault is called on the hide event', function() {
		modal = new Modal({
			events: {
				hide: event => event.preventDefault()
			},
			visible: true
		});
		modal.hide();
		assert.ok(modal.visible);
	});

	it('should add classes passed to "dialogClasses" to the modal dialog element', function() {
		modal = new Modal({
			dialogClasses: 'modal-lg'
		});
		var dialog = modal.element.querySelector('.modal-dialog');
		assert.ok(dialog.classList.contains('modal-lg'));
	});
});
