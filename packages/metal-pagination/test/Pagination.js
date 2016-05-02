'use strict';

import dom from 'metal-dom';
import Pagination from '../src/Pagination';

var pagination;

describe('Pagination', function() {
	afterEach(function() {
		if (pagination) {
			pagination.dispose();
		}
	});

	it('should render just 2 control nodes by default', function() {
		pagination = new Pagination();

		var paginationElement = pagination.element;
		assert.strictEqual(2, paginationElement.childNodes.length);

		var controlNodes = paginationElement.querySelectorAll('li.pagination-control');
		assert.strictEqual(2, controlNodes.length);

		var itemNodes = paginationElement.querySelectorAll('li.pagination-item');
		assert.strictEqual(0, itemNodes.length);
	});

	it('should render control nodes with Prev and Next text by default', function() {
		pagination = new Pagination();

		var controlNodes = pagination.element.querySelectorAll('li.pagination-control');
		assert.equal('Prev', controlNodes[0].textContent);
		assert.equal('Next', controlNodes[1].textContent);
	});

	it('should render item nodes with correct text values by default', function() {
		pagination = new Pagination({
			total: 2
		});

		var itemNodes = pagination.element.querySelectorAll('li.pagination-item');
		assert.equal('1', itemNodes[0].textContent);
		assert.equal('2', itemNodes[1].textContent);
	});

	it('should render item nodes with correct text values if the given offset value is 100', function() {
		pagination = new Pagination({
			offset: 100,
			total: 2
		});

		var itemNodes = pagination.element.querySelectorAll('li.pagination-item');
		assert.equal('100', itemNodes[0].textContent);
		assert.equal('101', itemNodes[1].textContent);
	});

	it('should set and render control nodes if the given "strings" state is {next:">>",prev:"<<"}', function() {
		var next = '>>',
			prev = '<<';

		pagination = new Pagination({
			strings: {
				next: next,
				prev: prev
			}
		});

		var controlNodes = pagination.element.querySelectorAll('li.pagination-control');
		assert.equal(prev, controlNodes[0].textContent);
		assert.equal(next, controlNodes[1].textContent);
	});

	it('should render no control nodes if the given "showControls" state is false', function() {
		pagination = new Pagination({
			showControls: false
		});

		var controlNodes = pagination.element.querySelectorAll('li.pagination-control');
		assert.strictEqual(0, controlNodes.length);
	});

	it('should render 5 item nodes if the given "total" state is 5', function() {
		pagination = new Pagination({
			total: 5
		});

		var itemNodes = pagination.element.querySelectorAll('li.pagination-item');
		assert.strictEqual(5, itemNodes.length);
	});

	it('should fire a "changeRequest" event with correct values if you click on a none active item', function() {
		pagination = new Pagination({
			total: 5
		});

		var itemNodes = pagination.element.querySelectorAll('li.pagination-item');
		var itemNode2 = itemNodes[1];

		pagination.once('changeRequest', function(event) {
			assert.ok(!dom.hasClass(itemNode2, 'active'));
			assert.strictEqual(0, event.lastState.page);
			assert.strictEqual(1, event.state.page);
			assert.strictEqual(1, event.offset);
			assert.strictEqual(5, event.total);
		});
		dom.triggerEvent(itemNode2, 'click');
	});

	it('should fire a "changeRequest" with correct values if you click on any controls', function() {
		pagination = new Pagination({
			page: 2,
			total: 5
		});

		var controlNodes = pagination.element.querySelectorAll('li.pagination-control');
		var prevControl = controlNodes[0];
		var nextControl = controlNodes[1];

		pagination.once('changeRequest', function(event) {
			assert.strictEqual(2, event.lastState.page);
			assert.strictEqual(1, event.state.page);
		});
		dom.triggerEvent(prevControl, 'click');

		pagination.once('changeRequest', function(event) {
			assert.strictEqual(1, event.lastState.page);
			assert.strictEqual(2, event.state.page);
		});
		dom.triggerEvent(nextControl, 'click');
	});

	it('should calculate offsetPageNumber value correctly', function() {
		pagination = new Pagination({
			offset: 100,
			page: 2,
			total: 5
		});

		assert.strictEqual(102, pagination.getOffsetPageNumber());
	});

	it('should calculate offsetTotalPages value correctly', function() {
		pagination = new Pagination({
			offset: 100,
			page: 2,
			total: 5
		});

		assert.strictEqual(105, pagination.getOffsetTotalPages());
	});

	it('should circulate pages by default', function() {
		pagination = new Pagination({
			page: 4,
			total: 5
		});

		var controlNodes = pagination.element.querySelectorAll('li.pagination-control');
		var prevControl = controlNodes[0];
		var nextControl = controlNodes[1];

		pagination.once('changeRequest', function(event) {
			assert.strictEqual(0, event.state.page);
		});
		dom.triggerEvent(nextControl, 'click');

		pagination.once('changeRequest', function(event) {
			assert.strictEqual(4, event.state.page);
		});
		dom.triggerEvent(prevControl, 'click');
	});

	it('should not circulate pages with "next" control if the given "circular" state is false', function() {
		pagination = new Pagination({
			circular: false,
			page: 4,
			total: 5
		});

		var controlNodes = pagination.element.querySelectorAll('li.pagination-control');
		var nextControl = controlNodes[1];

		assert.ok(dom.hasClass(nextControl, 'disabled'));
	});

	it('should not circulate pages with "prev" control if the given "circular" state is false', function() {
		pagination = new Pagination({
			circular: false,
			total: 5
		});

		var controlNodes = pagination.element.querySelectorAll('li.pagination-control');
		var prevControl = controlNodes[0];

		assert.ok(dom.hasClass(prevControl, 'disabled'));
	});
});