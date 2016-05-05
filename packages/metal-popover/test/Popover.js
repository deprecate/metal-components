'use strict';

import dom from 'metal-dom';
import Popover from '../src/Popover';

describe('Popover', function() {
	var popover;

	afterEach(function() {
		popover.dispose();
	});

	it('should render content', function() {
		popover = new Popover({
			content: 'content'
		});
		var innerElement = popover.element.querySelector('.popover-content');
		assert.strictEqual('content', innerElement.textContent);
	});

	it('should render incremental dom content', function() {
		popover = new Popover({
			content: () => IncrementalDOM.text('content')
		});
		var innerElement = popover.element.querySelector('.popover-content');
		assert.strictEqual('content', innerElement.textContent);
	});

	it('should render html content', function() {
		popover = new Popover({
			content: '<b>content</b>'
		});
		var innerElement = popover.element.querySelector('.popover-content p');
		assert.strictEqual('B', innerElement.childNodes[0].tagName);
		assert.strictEqual('content', innerElement.textContent);
	});

	it('should render title', function() {
		popover = new Popover({
			title: 'title'
		});
		var innerElement = popover.element.querySelector('.popover-title');
		assert.strictEqual('title', innerElement.textContent);
	});

	it('should render html title', function() {
		popover = new Popover({
			title: '<b>title</b>'
		});
		var innerElement = popover.element.querySelector('.popover-title');
		assert.strictEqual('B', innerElement.childNodes[0].tagName);
		assert.strictEqual('title', innerElement.textContent);
	});

	it('should set display to "block" when popover becomes visible', function(done) {
		popover = new Popover({
			visible: false
		});
		assert.notStrictEqual('block', popover.element.style.display);

		popover.visible = true;
		popover.once('stateSynced', function() {
			assert.strictEqual('block', popover.element.style.display);
			done();
		});
	});

	it('should open and close on click events by default', function(done) {
		dom.enterDocument('<div id="trigger">trigger</div>');
		var trigger = dom.toElement('#trigger');

		popover = new Popover({
			delay: [0, 0],
			visible: false,
			selector: '#trigger',
		});

		dom.triggerEvent(trigger, 'click');
		setTimeout(function() {
			assert.ok(popover.visible);
			assert.strictEqual(trigger, popover.alignElement);
			dom.exitDocument(trigger);
			done();
		}, 25);
	});

	it('should get content from the align element\'s data-content', function(done) {
		dom.enterDocument('<div id="trigger" data-content="Test Content">trigger</div>');
		var trigger = dom.toElement('#trigger');

		popover = new Popover({
			delay: [0, 0],
			visible: false,
			selector: '#trigger',
		});

		dom.triggerEvent(trigger, 'click');
		popover.once('contentChanged', function() {
			assert.strictEqual('Test Content', popover.content);
			dom.exitDocument(trigger);
			done();
		});
	});

	it('should decorate', function() {
		var element = document.createElement('div');
		dom.enterDocument(element);
		IncrementalDOM.patch(element, () => {
			Popover.TEMPLATE({
				content: () => IncrementalDOM.text('content'),
				title: () => IncrementalDOM.text('title')
			});
		});
		var outerHTML = element.childNodes[0].outerHTML;

		popover = new Popover({
			element: element.childNodes[0],
			content: 'content',
			title: 'title',
			visible: false
		});

		assert.strictEqual(popover.element.outerHTML, outerHTML);
	});
});
