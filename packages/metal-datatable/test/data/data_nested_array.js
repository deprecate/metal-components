var data_nested_array = [{
	"name": "Eduardo Lundgren",
	"email": "edu@rdo.io",
	"addresses": ["The Bowery, New York", "Casa Forte, Brazil"]
}, {
	"name": "Other Person",
	"email": "other@domain.com",
	"addresses": ["La Pigalle, Paris", "Harley Street, London"]
}];

var data_nested_array_expanded = {
	"type": "array",
	"value": [
		{
			"type": "object",
			"value": {
				"name": {
					"type": "string",
					"value": "Eduardo Lundgren"
				},
				"email": {
					"type": "string",
					"value": "edu@rdo.io"
				},
				"addresses": {
					"type": "array",
					"value": [
						{
							"type": "string",
							"value": "The Bowery, New York"
						},
						{
							"type": "string",
							"value": "Casa Forte, Brazil"
						}
					]
				}
			}
		},
		{
			"type": "object",
			"value": {
				"name": {
					"type": "string",
					"value": "Other Person"
				},
				"email": {
					"type": "string",
					"value": "other@domain.com"
				},
				"addresses": {
					"type": "array",
					"value": [
						{
							"type": "string",
							"value": "La Pigalle, Paris"
						},
						{
							"type": "string",
							"value": "Harley Street, London"
						}
					]
				}
			}
		}
	],
	"columns": [
		"addresses",
		"email",
		"name"
	]
};

export { data_nested_array, data_nested_array_expanded };