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
		modal = new Modal().render();
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
		}).render();
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
		}).render();
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
		}).render();
		var header = modal.element.querySelector('.modal-header').innerHTML;
		var body = modal.element.querySelector('.modal-body').innerHTML;
		var footer = modal.element.querySelector('.modal-footer').innerHTML;
		assert.strictEqual('', header);
		assert.strictEqual('', body);
		assert.strictEqual('footer', footer);
	});

	it('should cause dom repaint when body state changes', function(done) {
		modal = new Modal().render();
		modal.body = 'body';
		async.nextTick(function() {
			var body = modal.element.querySelector('.modal-body').innerHTML;
			assert.strictEqual('body', body);
			done();
		});
	});

	it('should cause dom repaint when header state changes', function(done) {
		modal = new Modal().render();
		modal.header = 'header';
		async.nextTick(function() {
			var header = modal.element.querySelector('.modal-header');
			assert.strictEqual('header', header.childNodes[1].textContent);
			assert.ok(dom.hasClass(header.childNodes[0], 'close'));
			done();
		});
	});

	it('should cause dom repaint when footer state changes', function(done) {
		modal = new Modal().render();
		modal.footer = 'footer';
		async.nextTick(function() {
			var footer = modal.element.querySelector('.modal-footer').innerHTML;
			assert.strictEqual('footer', footer);
			done();
		});
	});

	it('should cause dom repaint when visible state changes', function(done) {
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

	it('should show and hide overlay when overlay state changes', function(done) {
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

	it('should not close modal when press escape key and the hideOnEscape state is not true', function(done) {
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

	it('should set the "role" HTML attribute to value specified by the "role" state', function() {
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

		it('should not automatically focus any element if "autoFocus" state is set to "false"', function() {
			var prevActiveElement = document.activeElement;
			modal = new Modal({
				autoFocus: false,
				header: 'My Header'
			}).render();
			assert.strictEqual(prevActiveElement, document.activeElement);
		});

		it('should automatically focus internal element that matches selector specified by "autoFocus" state', function() {
			modal = new Modal({
				autoFocus: '.body-btn',
				body: '<button class="body-btn">Body Button</button>'
			}).render();
			assert.strictEqual(modal.element.querySelector('.body-btn'), document.activeElement);
		});

		it('should not automatically focus "autoFocus" element if modal is rendered invisible', function() {
			var prevActiveElement = document.activeElement;
			modal = new Modal({
				autoFocus: '.body-btn',
				body: '<button class="body-btn">Body Button</button>',
				visible: false
			}).render();
			assert.strictEqual(prevActiveElement, document.activeElement);
		});

		it('should automatically focus "autoFocus" element when modal becomes visible', function(done) {
			var element = document.createElement('button');
			dom.enterDocument(element);
			modal = new Modal({
				autoFocus: '.body-btn',
				body: '<button class="body-btn">Body Button</button>',
				visible: false
			}).render();

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
			}).render();

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
			modal = new Modal().render();

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
			}).render();

			outsideElement.focus();
			dom.triggerEvent(outsideElement, 'focus');
			assert.strictEqual(outsideElement, document.activeElement);
		});

		it('should restrict/unrestrict focusing outside modal as visibility changes', function(done) {
			modal = new Modal().render();

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
			}).render();

			outsideElement.focus();
			dom.triggerEvent(outsideElement, 'focus');
			assert.strictEqual(outsideElement, document.activeElement);
		});

		it('should not restrict focusing inside modal', function() {
			modal = new Modal({
				body: '<button class="body-btn">Body Button</button>',
			}).render();

			var element = modal.element.querySelector('.body-btn');
			element.focus();
			dom.triggerEvent(element, 'focus');
			assert.strictEqual(element, document.activeElement);
		});
	});

	it('should modal progressive enchance always as hidden', function() {
		var data = {
			id: 'modal',
			elementClasses: 'centered',
			header: () => IncrementalDOM.text('header'),
			body: () => IncrementalDOM.text('body'),
			footer: () => IncrementalDOM.text('footer'),
			overlay: true,
			role: 'dialog'
		};
		var element = document.createElement('div');
		dom.enterDocument(element);
		IncrementalDOM.patch(element, () => Modal.TEMPLATE(data));
		var outerHTML = element.innerHTML;

		modal = new Modal({
			element: '#modal',
			elementClasses: 'centered',
			header: 'header',
			body: 'body',
			footer: 'footer',
			visible: false
		}).decorate();

		assert.strictEqual(modal.element.outerHTML, outerHTML);
	});

	it('should change to visible when decorated and visible is true', function() {
		var data = {
			id: 'modal',
			elementClasses: 'centered',
			header: () => IncrementalDOM.text('header'),
			body: () => IncrementalDOM.text('body'),
			footer: () => IncrementalDOM.text('footer'),
			overlay: true
		};
		var element = document.createElement('div');
		dom.enterDocument(element);
		IncrementalDOM.patch(element, () => Modal.TEMPLATE(data));

		modal = new Modal({
			element: '#modal',
			header: 'header',
			body: 'body',
			footer: 'footer',
			visible: true
		}).render();

		assert.ok(!dom.hasClass(modal.element, 'hidden'));
	});

	it('should handle calling template without passing "elementClasses"', function() {
		var data = {
			id: 'modal',
			header: () => IncrementalDOM.text('header'),
			body: () => IncrementalDOM.text('body'),
			footer: () => IncrementalDOM.text('footer'),
			overlay: true
		};
		var element = document.createElement('div');
		IncrementalDOM.patch(element, () => Modal.TEMPLATE(data));

		element = element.querySelector('#modal');
		assert.strictEqual('modal', element.className);
	});

	it('should set "visible" state to false when "hide" method is called', function() {
		modal = new Modal().render();
		modal.hide();
		assert.ok(!modal.visible);
	});

	it('should set "visible" state to true when "show" method is called', function() {
		modal = new Modal({
			visible: false
		}).render();
		modal.show();
		assert.ok(modal.visible);
	});
});
