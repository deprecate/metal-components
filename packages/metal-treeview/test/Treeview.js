'use strict';

import dom from 'metal-dom';
import { object } from 'metal';
import Treeview from '../src/Treeview';

var treeview;

describe('Treeview', function() {
	afterEach(function() {
		if (treeview) {
			treeview.dispose();
		}
	});

	it('should render no nodes by default', function() {
		treeview = new Treeview();

		var nodesElement = treeview.element.querySelector('.treeview-nodes');
		assert.strictEqual(0, nodesElement.childNodes.length);
	});

	it('should render the given nodes', function() {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1'
				},
				{
					name: 'Node 2'
				}
			]
		});

		var nodesElement = treeview.element.querySelector('.treeview-nodes');
		assert.strictEqual(2, nodesElement.childNodes.length);
		assert.strictEqual('Node 1', nodesElement.childNodes[0].textContent);
		assert.strictEqual('Node 2', nodesElement.childNodes[1].textContent);
	});

	it('should render nested children nodes', function() {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						},
						{
							name: 'Node 1.2'
						}
					]
				},
				{
					name: 'Node 2'
				}
			]
		});

		var nodesElement = treeview.element.querySelector('.treeview-nodes');
		var childrenNodes = nodesElement.childNodes;
		assert.strictEqual(2, childrenNodes.length);
		assert.strictEqual('Node 1', childrenNodes[0].querySelector('.treeview-node-name').textContent);
		assert.strictEqual('Node 2', childrenNodes[1].querySelector('.treeview-node-name').textContent);

		nodesElement = childrenNodes[0].querySelector('.treeview-nodes');
		assert.ok(nodesElement);
		childrenNodes = nodesElement.childNodes;
		assert.strictEqual(2, childrenNodes.length);
		assert.strictEqual('Node 1.1', childrenNodes[0].querySelector('.treeview-node-name').textContent);
		assert.strictEqual('Node 1.2', childrenNodes[1].querySelector('.treeview-node-name').textContent);

		nodesElement = nodesElement.childNodes[0].querySelector('.treeview-nodes');
		assert.ok(!nodesElement);
	});

	it('should expand children nodes when specified on the state', function() {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					],
					expanded: true
				},
				{
					name: 'Node 2',
					children: [
						{
							name: 'Node 2.1'
						}
					]
				}
			]
		});

		var nodesElement = treeview.element.querySelector('.treeview-nodes');
		assert.ok(dom.hasClass(nodesElement.childNodes[0].childNodes[0], 'expanded'));
		assert.ok(!dom.hasClass(nodesElement.childNodes[1].childNodes[0], 'expanded'));
	});

	it('should expand/collapse children nodes when parent node is clicked', function(done) {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					]
				}
			]
		});

		var nodeWrapperElement = treeview.element.querySelector('.treeview-node-wrapper');
		var nodeMainElement = nodeWrapperElement.querySelector('.treeview-node-main');
		var nodeListElement = nodeWrapperElement.parentNode;

		dom.triggerEvent(nodeMainElement, 'click');
		treeview.once('stateChanged', function() {
			assert.ok(dom.hasClass(nodeWrapperElement, 'expanded'));
			assert.strictEqual('true', nodeListElement.getAttribute('aria-expanded'));

			dom.triggerEvent(nodeMainElement, 'click');
			treeview.once('stateChanged', function() {
				assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));
				assert.strictEqual('false', nodeListElement.getAttribute('aria-expanded'));
				done();
			});
		});
	});

	it('should expand/collapse children nodes when ENTER is pressed on parent node', function(done) {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					]
				}
			]
		});

		var nodeWrapperElement = treeview.element.querySelector('.treeview-node-wrapper');
		dom.triggerEvent(nodeWrapperElement, 'keyup', {
			keyCode: 13
		});
		treeview.once('stateChanged', function() {
			assert.ok(dom.hasClass(nodeWrapperElement, 'expanded'));

			dom.triggerEvent(nodeWrapperElement, 'keyup', {
				keyCode: 13
			});
			treeview.once('stateChanged', function() {
				assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));
				done();
			});
		});
	});

	it('should expand/collapse children nodes when SPACE is pressed on parent node', function(done) {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					]
				}
			]
		});

		var nodeWrapperElement = treeview.element.querySelector('.treeview-node-wrapper');

		dom.triggerEvent(nodeWrapperElement, 'keyup', {
			keyCode: 32
		});
		treeview.once('stateChanged', function() {
			assert.ok(dom.hasClass(nodeWrapperElement, 'expanded'));

			dom.triggerEvent(nodeWrapperElement, 'keyup', {
				keyCode: 32
			});
			treeview.once('stateChanged', function() {
				assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));
				done();
			});
		});
	});

	it('should not expand/collapse children nodes when key different from SPACE and ENTER is pressed on parent node', function() {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					]
				}
			]
		});

		var nodeWrapperElement = treeview.element.querySelector('.treeview-node-wrapper');

		dom.triggerEvent(nodeWrapperElement, 'keyup', {
			keyCode: 1
		});
		assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));

		dom.triggerEvent(nodeWrapperElement, 'keyup', {
			keyCode: 20
		});
		assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));
	});

	it('should update the node object when the node element is clicked', function() {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					]
				}
			]
		});

		var nodeElement = treeview.element.querySelectorAll('.treeview-node')[1];
		var nodeMainElement = nodeElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(treeview.nodes[0].children[0].expanded);

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(!treeview.nodes[0].children[0].expanded);
	});

	it('should not replace whole content when node element is clicked', function(done) {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					]
				}
			]
		});

		var nodeElement = treeview.element.querySelector('.treeview-node');
		var nodeMainElement = nodeElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'click');
		treeview.on('stateChanged', function() {
			assert.strictEqual(nodeElement, treeview.element.querySelector('.treeview-node'));
			done();
		});
	});

	it('should replace whole content when node contents actually change', function(done) {
		treeview = new Treeview({
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					]
				}
			]
		});

		var nodeElement = treeview.element.querySelector('.treeview-node');
		treeview.nodes = [];
		treeview.on('stateChanged', function() {
			assert.notStrictEqual(nodeElement, treeview.element.querySelector('.treeview-node'));
			done();
		});
	});

	it('should decorate content rendered via soy without repainting', function() {
		var data = {
			nodes: [
				{
					name: 'Node 1',
					children: [
						{
							name: 'Node 1.1'
						}
					]
				}
			]
		};
		var element = document.createElement('div');
		IncrementalDOM.patch(element, () => Treeview.TEMPLATE(data));

		element = element.childNodes[0];
		dom.enterDocument(element);
		var soyRenderedContent = element.innerHTML;

		treeview = new Treeview(object.mixin({
			element: element
		}, data));
		assert.strictEqual(soyRenderedContent, treeview.element.innerHTML);
	});

	describe('Keyboard focus', function() {
		it('should go move between nodes at the same level via up/down arrow keys', function() {
			treeview = new Treeview({
				nodes: [
					{
						name: 'Node 1'
					},
					{
						name: 'Node 2'
					},
					{
						name: 'Node 3'
					}
				]
			});

			var itemElements = treeview.element.querySelectorAll('.treeview-node');
			dom.triggerEvent(itemElements[1], 'keydown', {
				keyCode: 40
			});
			assert.strictEqual(itemElements[2], document.activeElement);

			dom.triggerEvent(itemElements[2], 'keydown', {
				keyCode: 38
			});
			assert.strictEqual(itemElements[1], document.activeElement);
		});

		it('should expand collapsed nodes via the right arrow key', function() {
			treeview = new Treeview({
				nodes: [
					{
						children: [
							{
								name: 'Node 1.1'
							}
						],
						expanded: false,
						name: 'Node 1'
					}
				]
			});

			var prevFocusedElement = document.activeElement;
			dom.triggerEvent(treeview.refs['node-0'], 'keydown', {
				keyCode: 39
			});
			assert.ok(treeview.nodes[0].expanded);
			assert.strictEqual(prevFocusedElement, document.activeElement);
		});

		it('should focus first child when the right arrow key is pressed on expanded node', function() {
			treeview = new Treeview({
				nodes: [
					{
						children: [
							{
								name: 'Node 1.1'
							},
							{
								name: 'Node 1.2'
							}
						],
						expanded: true,
						name: 'Node 1'
					}
				]
			});

			dom.triggerEvent(treeview.refs['node-0'], 'keydown', {
				keyCode: 39
			});
			assert.ok(treeview.nodes[0].expanded);
			assert.strictEqual(treeview.refs['node-0-0'], document.activeElement);
		});

		it('should do nothing if right arrow key is pressed on childless node', function() {
			treeview = new Treeview({
				nodes: [
					{
						name: 'Node 1'
					}
				]
			});

			var prevFocusedElement = document.activeElement;
			dom.triggerEvent(treeview.refs['node-0'], 'keydown', {
				keyCode: 39
			});
			assert.ok(!treeview.nodes[0].hasOwnProperty('expanded'));
			assert.strictEqual(prevFocusedElement, document.activeElement);
		});

		it('should focus parent when the left arrow key is pressed on childless node', function() {
			treeview = new Treeview({
				nodes: [
					{
						children: [
							{
								name: 'Node 1.1'
							}
						],
						expanded: true,
						name: 'Node 1'
					}
				]
			});

			dom.triggerEvent(treeview.refs['node-0-0'], 'keydown', {
				keyCode: 37
			});
			assert.strictEqual(treeview.refs['node-0'], document.activeElement);
			assert.ok(treeview.nodes[0].expanded);
		});

		it('should do nothing if the left arrow key is pressed on childless root', function() {
			treeview = new Treeview({
				nodes: [
					{
						name: 'Node 1'
					}
				]
			});

			var prevFocusedElement = document.activeElement;
			dom.triggerEvent(treeview.refs['node-0'], 'keydown', {
				keyCode: 37
			});
			assert.ok(!treeview.nodes[0].hasOwnProperty('expanded'));
			assert.strictEqual(prevFocusedElement, document.activeElement);
		});

		it('should focus parent when the left arrow key is pressed on collapsed child node', function() {
			treeview = new Treeview({
				nodes: [
					{
						children: [
							{
								children: [
									{
										name: 'Node 1.1.1'
									}
								],
								expanded: false,
								name: 'Node 1.1'
							}
						],
						expanded: true,
						name: 'Node 1'
					}
				]
			});

			dom.triggerEvent(treeview.refs['node-0-0'], 'keydown', {
				keyCode: 37
			});
			assert.strictEqual(treeview.refs['node-0'], document.activeElement);
			assert.ok(!treeview.nodes[0].children[0].expanded);
			assert.ok(treeview.nodes[0].expanded);
		});

		it('should collapse node when the left arrow key is pressed on expanded node', function() {
			treeview = new Treeview({
				nodes: [
					{
						children: [
							{
								children: [
									{
										name: 'Node 1.1.1'
									}
								],
								expanded: true,
								name: 'Node 1.1'
							}
						],
						expanded: true,
						name: 'Node 1'
					}
				]
			});

			var prevFocusedElement = document.activeElement;
			dom.triggerEvent(treeview.refs['node-0-0'], 'keydown', {
				keyCode: 37
			});
			assert.strictEqual(prevFocusedElement, document.activeElement);
			assert.ok(!treeview.nodes[0].children[0].expanded);
		});
	});
});
