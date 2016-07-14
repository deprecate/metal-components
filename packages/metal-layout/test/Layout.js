'use strict';

import dom from 'metal-dom';
import Layout from '../src/Layout';

describe('Layout', function() {
	var layout;

	afterEach(function() {
		if (layout) {
			layout.dispose();
		}
	});

	it('should start with an empty layout data by default', function() {
		layout = new Layout();
		assert.deepEqual([], layout.data);
	});

	it('should render simple layout', function() {
		layout = new Layout({
			data: [
				{
					columns: [
						{
							content: 'Column 1.1',
							size: 3
						},
						{
							content: 'Column 1.2',
							size: 7
						},
						{
							content: 'Column 1.3',
							size: 2
						}
					]
				},
				{
					columns: [
						{
							content: 'Column 2.1',
							size: 8
						},
						{
							content: 'Column 2.2',
							size: 4
						}
					]
				}
			]
		});

		const rows = layout.element.childNodes;
		assert.strictEqual(2, rows.length);

		let columns = rows[0].childNodes;
		assert.strictEqual(3, columns.length);
		assert.strictEqual('Column 1.1', columns[0].textContent);
		assert.ok(dom.hasClass(columns[0], 'col-md-3'));
		assert.strictEqual('Column 1.2', columns[1].textContent);
		assert.ok(dom.hasClass(columns[1], 'col-md-7'));
		assert.strictEqual('Column 1.3', columns[2].textContent);
		assert.ok(dom.hasClass(columns[2], 'col-md-2'));

		columns = rows[1].childNodes;
		assert.strictEqual(2, columns.length);
		assert.strictEqual('Column 2.1', columns[0].textContent);
		assert.ok(dom.hasClass(columns[0], 'col-md-8'));
		assert.strictEqual('Column 2.2', columns[1].textContent);
		assert.ok(dom.hasClass(columns[1], 'col-md-4'));
	});
});
