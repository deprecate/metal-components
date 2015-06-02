'use strict';

import dom from 'bower:metaljs/src/dom/dom';
import TreeView from '../src/TreeView';

var treeView;

describe('TreeView', function() {
	afterEach(function() {
		if (treeView) {
			treeView.dispose();
		}
	});

	it('should render no nodes by default', function() {
		treeView = new TreeView().render();

		var nodesElement = treeView.element.querySelector('.treeview-nodes');
		assert.strictEqual(0, nodesElement.childNodes.length);
	});

	it('should render the given nodes', function() {
		treeView = new TreeView({
			nodes: [
				{
					name: 'Node 1'
				},
				{
					name: 'Node 2'
				}
			]
		}).render();

		var nodesElement = treeView.element.querySelector('.treeview-nodes');
		assert.strictEqual(2, nodesElement.childNodes.length);
		assert.strictEqual('Node 1', nodesElement.childNodes[0].textContent);
		assert.strictEqual('Node 2', nodesElement.childNodes[1].textContent);
	});

	it('should render nested children nodes', function() {
		treeView = new TreeView({
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

		var nodesElement = treeView.element.querySelector('.treeview-nodes');
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
		treeView = new TreeView({
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

		var nodesElement = treeView.element.querySelector('.treeview-nodes');
		assert.ok(dom.hasClass(nodesElement.childNodes[0].childNodes[0], 'expanded'));
		assert.ok(!dom.hasClass(nodesElement.childNodes[1].childNodes[0], 'expanded'));
	});

	it('should expand/collapse children nodes when parent node is clicked', function() {
		treeView = new TreeView({
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

		var nodeWrapperElement = treeView.element.querySelector('.treeview-node-wrapper');
		var nodeMainElement = nodeWrapperElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(dom.hasClass(nodeWrapperElement, 'expanded'));

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(!dom.hasClass(nodeWrapperElement, 'expanded'));
	});

	it('should update the node object when the node element is clicked', function() {
		treeView = new TreeView({
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

		var nodeElement = treeView.element.querySelectorAll('.treeview-node')[1];
		var nodeMainElement = nodeElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(treeView.nodes[0].children[0].expanded);

		dom.triggerEvent(nodeMainElement, 'click');
		assert.ok(!treeView.nodes[0].children[0].expanded);
	});

	it('should not replace surface contents when node element is clicked', function(done) {
		treeView = new TreeView({
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

		var nodeElement = treeView.element.querySelector('.treeview-node');
		var nodeMainElement = nodeElement.querySelector('.treeview-node-main');

		dom.triggerEvent(nodeMainElement, 'click');
		treeView.on('attrsChanged', function() {
			assert.strictEqual(nodeElement, treeView.element.querySelector('.treeview-node'));
			done();
		});
	});

	it('should replace surface contents when nodes attr changes without click', function(done) {
		treeView = new TreeView({
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

		var nodeElement = treeView.element.querySelector('.treeview-node');
		treeView.nodes = [];
		treeView.on('attrsChanged', function() {
			assert.notStrictEqual(nodeElement, treeView.element.querySelector('.treeview-node'));
			done();
		});
	});
});
