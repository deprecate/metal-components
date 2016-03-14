var data_nested_object = [{
	'name': 'Eduardo Lundgren',
	'address': {
		'street': 'abc',
		'foo': true
	}
}];

var data_nested_object_expanded = {
	'type': 'array',
	'value': [{
		'type': 'object',
		'value': {
			'name': {
				'type': 'string',
				'value': 'Eduardo Lundgren'
			},
			'address': {
				'type': 'object',
				'value': {
					'street': {
						'type': 'string',
						'value': 'abc'
					},
					'foo': {
						'type': 'boolean',
						'value': true
					}
				},
				'columns': [
					'foo',
					'street'
				],
				'columnsType': {
					'street': 'string',
					'foo': 'boolean'
				}
			}
		},
		'columns': [
			'address',
			'name'
		],
		'columnsType': {
			'name': 'string',
			'address': 'object'
		}
	}],
	'columns': [
		'address',
		'name'
	],
	'columnsType': {
		'name': 'string',
		'address': 'object'
	}
};

export { data_nested_object, data_nested_object_expanded };