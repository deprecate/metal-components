'use strict';

import { async } from 'metal';
import dom from 'metal-dom';
import { Align } from 'metal-position';
import Dropdown from '../src/Dropdown';
import { SoyTemplates } from 'metal-soy';

describe('Dropdown', function() {
	var component;

	afterEach(function() {
		component.dispose();
	});

	it('should render html header', function() {
		component = new Dropdown({
			header: '<div class="myHeader"></div>'
		}).render();
		assert.ok(component.element.querySelector('.myHeader'));
	});

	it('should render html body', function() {
		component = new Dropdown({
			body: '<div class="myBody"></div>'
		}).render();
		assert.ok(component.element.querySelector('.myBody'));
	});

	it('should get header content from existing html', function() {
		var element = document.createElement('div');
		dom.append(
			element,
			'<div class="myHeader"></div><div class="dropdown-menu"><div class="myBody"></div></div>'
		);
		component = new Dropdown({
			element: element
		}).render();

		assert.strictEqual('<div class="myHeader"></div>', component.header);
	});

	it('should get body content from existing html', function() {
		var element = document.createElement('div');
		dom.append(
			element,
			'<div class="myHeader"></div><div class="dropdown-menu"><div class="myBody"></div></div>'
		);
		component = new Dropdown({
			element: element
		}).render();

		assert.strictEqual('<div class="myBody"></div>', component.body);
	});

	it('should open dropdown', function(done) {
		component = new Dropdown().render();
		assert.ok(!component.expanded);
		assert.ok(!dom.hasClass(component.element, 'open'));
		component.open();
		component.once('attrsChanged', function() {
			assert.ok(component.expanded);
			assert.ok(dom.hasClass(component.element, 'open'));
			component.dispose();
			done();
		});
	});

	it('should close dropdown', function(done) {
		component = new Dropdown({
			expanded: true
		}).render();
		assert.ok(dom.hasClass(component.element, 'open'));
		component.close();
		component.once('attrsChanged', function() {
			assert.ok(!component.expanded);
			assert.ok(!dom.hasClass(component.element, 'open'));
			component.dispose();
			done();
		});
	});

	it('should toggle dropdown', function(done) {
		component = new Dropdown().render();
		assert.ok(!component.expanded);
		assert.ok(!dom.hasClass(component.element, 'open'));
		component.toggle();
		component.once('attrsChanged', function() {
			assert.ok(component.expanded);
			assert.ok(dom.hasClass(component.element, 'open'));
			component.toggle();
			component.once('attrsChanged', function() {
				assert.ok(!component.expanded);
				assert.ok(!dom.hasClass(component.element, 'open'));
				component.dispose();
				done();
			});
		});
	});

	it('should change dropdown position', function(done) {
		component = new Dropdown({
			position: 'up'
		}).render();
		assert.ok(dom.hasClass(component.element, 'dropdown'));
		assert.ok(dom.hasClass(component.element, 'dropup'));
		component.position = 'down';
		async.nextTick(function() {
			assert.ok(dom.hasClass(component.element, 'dropdown'));
			assert.ok(!dom.hasClass(component.element, 'dropup'));
			component.position = 'invalid';
			async.nextTick(function() {
				assert.ok(dom.hasClass(component.element, 'dropdown'));
				assert.ok(!dom.hasClass(component.element, 'dropinvalid'));
				component.dispose();
				done();
			});
		});
	});

	describe('Align', function() {
		beforeEach(function() {
			sinon.spy(Align, 'align');
		});

		afterEach(function() {
			Align.align.restore();
		});

		it('should automatically align through Align.align if alignElementSelector is given', function(done) {
			component = new Dropdown({
				alignElementSelector: 'button',
				header: '<button></button>'
			}).render();

			assert.strictEqual(0, Align.align.callCount);
			component.expanded = true;
			component.once('attrsSynced', function() {
				assert.strictEqual(1, Align.align.callCount);
				done();
			});
		});

		it('should not automatically align through Align.align if alignElementSelector doesn\'t match anything', function(done) {
			component = new Dropdown({
				alignElementSelector: 'nomatch',
				header: '<button></button>'
			}).render();

			assert.strictEqual(0, Align.align.callCount);
			component.expanded = true;
			component.once('attrsSynced', function() {
				assert.strictEqual(0, Align.align.callCount);
				done();
			});
		});
	});

	it('should close dropdown when click outside', function(done) {
		component = new Dropdown().render();
		component.open();

		assert.ok(component.isOpen());
		dom.triggerEvent(component.element.firstChild, 'click');
		async.nextTick(function() {
			assert.ok(component.isOpen());
			dom.triggerEvent(document, 'click');
			async.nextTick(function() {
				assert.ok(!component.isOpen());
				component.dispose();
				done();
			});
		});
	});

	it('should decorate', function() {
		var config = {
			element: '#dropdown',
			id: 'dropdown',
			body: 'body',
			header: 'header'
		};

		var markup = SoyTemplates.get('Dropdown', 'render')(config);
		dom.append(document.body, markup.content);
		var markupFromDom = document.getElementById('dropdown').outerHTML;
		component = new Dropdown(config).decorate();

		assert.strictEqual(component.element.outerHTML, markupFromDom);

		component.dispose();
	});
});
