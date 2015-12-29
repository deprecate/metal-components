'use strict';

import dom from 'bower:metal/src/dom/dom';
import object from 'bower:metal/src/object/object';
import SoyTemplates from 'bower:metal/src/soy/SoyTemplates';
import Treeview from '../src/Treeview';

var treeview;

describe('Treeview', function() {
	afterEach(function() {
		if (treeview) {
			treeview.dispose();
		}
	});

	it('should render no nodes by default', function() {
		treeview = new Treeview().render();

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
		}).render();

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
		}).render();

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

	it('should expand children nodes when specified on the attribute', function() {
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
		}).render();

		var nodesElement = treeview.element.querySelector('.treeview-nodes');
		assert.ok(dom.hasClass(nodesElement.childNodes[0].childNodes[0], 'expanded'));
		assert.ok(!dom.hasClass(nodesElement.childNodes[1].childNodes[0], 'expanded'));
	});

	it('should expand/collapse children nodes when parent node is clicked', function() {
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
		}).render();

		var nodeWrapperElement = treeview.element.querySelector('.treeview-node-wrapper');
		var nodeMainElement = nodeWrapperElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(dom.hasClass(nodeWrapperElement, 'expanded'));
		assert.strictEqual('true', nodeMainElement.getAttribute('aria-expanded'));

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));
		assert.strictEqual('false', nodeMainElement.getAttribute('aria-expanded'));
	});

	it('should expand/collapse children nodes when ENTER is pressed on parent node', function() {
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
		}).render();

		var nodeWrapperElement = treeview.element.querySelector('.treeview-node-wrapper');
		var nodeMainElement = nodeWrapperElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'keyup', {
			keyCode: 13
		});
		assert.ok(dom.hasClass(nodeWrapperElement, 'expanded'));

		dom.triggerEvent(nodeMainElement, 'keyup', {
			keyCode: 13
		});
		assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));
	});

	it('should expand/collapse children nodes when SPACE is pressed on parent node', function() {
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
		}).render();

		var nodeWrapperElement = treeview.element.querySelector('.treeview-node-wrapper');
		var nodeMainElement = nodeWrapperElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'keyup', {
			keyCode: 32
		});
		assert.ok(dom.hasClass(nodeWrapperElement, 'expanded'));

		dom.triggerEvent(nodeMainElement, 'keyup', {
			keyCode: 32
		});
		assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));
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
		}).render();

		var nodeWrapperElement = treeview.element.querySelector('.treeview-node-wrapper');
		var nodeMainElement = nodeWrapperElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'keyup', {
			keyCode: 1
		});
		assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));

		dom.triggerEvent(nodeMainElement, 'keyup', {
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
		}).render();

		var nodeElement = treeview.element.querySelectorAll('.treeview-node')[1];
		var nodeMainElement = nodeElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(treeview.nodes[0].children[0].expanded);

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(!treeview.nodes[0].children[0].expanded);
	});

	it('should not replace surface contents when node element is clicked', function(done) {
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
		}).render();

		var nodeElement = treeview.element.querySelector('.treeview-node');
		var nodeMainElement = nodeElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'click');
		treeview.on('attrsChanged', function() {
			assert.strictEqual(nodeElement, treeview.element.querySelector('.treeview-node'));
			done();
		});
	});

	it('should replace surface contents when nodes attr changes without click', function(done) {
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
		}).render();

		var nodeElement = treeview.element.querySelector('.treeview-node');
		treeview.nodes = [];
		treeview.on('attrsChanged', function() {
			assert.notStrictEqual(nodeElement, treeview.element.querySelector('.treeview-node'));
			done();
		});
	});

	it('should decorate content rendered via soy without repainting', function() {
		var data = {
			id: 'decorated',
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
		dom.append(document.body, SoyTemplates.get('Treeview', 'render')(data).content);

		var element = document.getElementById('decorated');
		var soyRenderedContent = element.innerHTML;

		treeview = new Treeview(object.mixin({
			element: element
		}, data)).decorate();
		assert.strictEqual(soyRenderedContent, treeview.element.innerHTML);
	});
});
