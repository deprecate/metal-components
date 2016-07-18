'use strict';

import dom from 'metal-dom';
import LayoutCol from '../../src/columns/LayoutCol';

describe('LayoutCol', function() {
	var col;

	afterEach(function() {
		if (col) {
			col.dispose();
		}
	});

	it('should render simple column', function() {
		col = new LayoutCol({
			content: 'Test Content',
			size: 3
		});

		assert.strictEqual('Test Content', col.element.textContent);
		assert.ok(dom.hasClass(col.element, 'col-md-3'));
	});
});
