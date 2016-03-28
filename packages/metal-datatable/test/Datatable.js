'use strict';

import core from 'metal';
import dom from 'metal-dom';
import Datatable from '../src/Datatable';
import Soy from 'metal-soy';
import { data_nested_array, data_nested_array_expanded_fn } from './data/data_nested_array.js';
import { data_nested_deep, data_nested_deep_expanded_fn } from './data/data_nested_deep.js';
import { data_nested_object, data_nested_object_expanded_fn } from './data/data_nested_object.js';
import { data_simple, data_simple_expanded_fn } from './data/data_simple.js';

describe.only('Datatable', function() {
	describe('Expand Data', function() {
		beforeEach(function() {
			sinon.stub(Soy, 'toIncDom', function(str) {
				return str;
			});
		});

		afterEach(function() {
			Soy.toIncDom.restore();
		});

		it('should expand simple data with JSON types', function() {
			var data = {
				data: data_simple
			};
			assert.deepEqual(data_simple_expanded_fn(), new Datatable(data).data);
		});

		it('should expand nested deep data with JSON types', function() {
			var data = {
				data: data_nested_deep
			};
			assert.deepEqual(data_nested_deep_expanded_fn(), new Datatable(data).data);
		});

		it('should expand nested object data with JSON types', function() {
			var data = {
				data: data_nested_object
			};
			assert.deepEqual(data_nested_object_expanded_fn(), new Datatable(data).data);
		});

		it('should expand nested array data with JSON types', function() {
			var data = {
				data: data_nested_array
			};
			assert.deepEqual(data_nested_array_expanded_fn(), new Datatable(data).data);
		});

		it('should expand null data with JSON type', function() {
			var data = {
				data: null
			};
			var expandedData = {
				type: 'null',
				value: null
			};
			assert.deepEqual(expandedData, new Datatable(data).data);
		});

		it('should expand undefined data with JSON type', function() {
			var data = {
				data: undefined
			};
			var expandedData = {
				type: 'undefined',
				value: undefined
			};
			assert.deepEqual(expandedData, new Datatable(data).data);
		});

		it('should expand string data with JSON type', function() {
			var data = {
				data: 'string'
			};
			var expandedData = {
				type: 'string',
				value: 'string'
			};
			assert.deepEqual(expandedData, new Datatable(data).data);
		});

		it('should expand number data with JSON type', function() {
			var data = {
				data: 1
			};
			var expandedData = {
				type: 'number',
				value: 1
			};
			assert.deepEqual(expandedData, new Datatable(data).data);
		});

		it('should expand boolean data with JSON type', function() {
			var data = {
				data: true
			};
			var expandedData = {
				type: 'boolean',
				value: true
			};
			assert.deepEqual(expandedData, new Datatable(data).data);
		});

		it('should expand object data with JSON type', function() {
			var object = {};
			var data = {
				data: object
			};
			var expandedData = new Datatable(data).data;
			assert.strictEqual('object', expandedData.type);
			assert.strictEqual(object, expandedData.value);
			assert.ok(Array.isArray(expandedData.columns));
			assert.ok(core.isObject(expandedData.columnsType));
		});
	});

	it('should expand table contents when clicking on labels', function() {
		var datatable = new Datatable({
			data: [1, 2, 3]
		}).render();
		var label = datatable.element.querySelector('.datatable-label');
		assert.ok(dom.hasClass(label, 'collapsed'));
		assert.ok(dom.hasClass(dom.next(label, 'table'), 'hidden'));
		dom.triggerEvent(label, 'click');
		assert.ok(dom.hasClass(label, 'expanded'));
		assert.ok(!dom.hasClass(dom.next(label, 'table'), 'hidden'));
		datatable.dispose();
	});

	it('should throw exception when data contains mixed types inside array', function() {
		assert.throws(function() {
			new Datatable({
				data: [0, false]
			}).render();
		}, Error);
	});

	it('should display column types', function() {
		var datatable = new Datatable({
			data: [{
				a: {
					b: {
						c: true
					}
				}
			}]
		}).render();
		var types = datatable.element.querySelectorAll('.datatable-type');
		assert.strictEqual(3, types.length);
		assert.strictEqual('object', types[0].innerText.trim());
		assert.strictEqual('object', types[1].innerText.trim());
		assert.strictEqual('boolean', types[2].innerText.trim());
		datatable.dispose();
	});

	it('should not display column types', function() {
		var datatable = new Datatable({
			data: [{
				a: {
					b: {
						c: true
					}
				}
			}],
			displayColumnsType: false
		}).render();
		var types = datatable.element.querySelectorAll('.datatable-type');
		assert.strictEqual(0, types.length);
		datatable.dispose();
	});

	it('should not expanded already expanded data', function() {
		var expandedData = {
			columns: [],
			type: ''
		};
		var datatable = new Datatable({
			data: expandedData
		}).render();
		assert.strictEqual(expandedData, datatable.data);
		datatable.dispose();
	});

	it('should detect sanitized html objects as string', function() {
		var datatable = new Datatable({
			data: {
				content: '',
				contentKind: 'HTML'
			}
		}).render();
		assert.strictEqual('string', datatable.data.type);
		datatable.dispose();
	});
});
