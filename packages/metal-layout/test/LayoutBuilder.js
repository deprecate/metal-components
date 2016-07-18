'use strict';

import dom from 'metal-dom';
import LayoutBuilder from '../src/LayoutBuilder';

describe('LayoutBuilder', function() {
	var builder;

	afterEach(function() {
		if (builder) {
			builder.dispose();
		}
	});

	it('should start with an empty layout data by default', function() {
		builder = new LayoutBuilder();
		assert.deepEqual([], builder.data);
	});

	it('should remove row when button is clicked', function(done) {
		builder = new LayoutBuilder({
			data: [
				{
					columns: [
						{
							content: 'Row 1'
						}
					]
				},
				{
					columns: [
						{
							content: 'Row 2'
						}
					]
				}
			]
		});

		let rows = builder.element.childNodes;
		assert.strictEqual(2, rows.length);
		assert.strictEqual('Row 1', rows[0].textContent);
		assert.strictEqual('Row 2', rows[1].textContent);

		const button = rows[0].childNodes[0];
		assert.ok(dom.hasClass(button, 'layout-builder-remove-row'));
		dom.triggerEvent(button, 'click');

		builder.once('stateSynced', function() {
			rows = builder.element.childNodes;
			assert.strictEqual(1, rows.length);
			assert.strictEqual('Row 2', rows[0].textContent);
			assert.strictEqual(1, builder.data.length);
			done();
		});
	});
});
