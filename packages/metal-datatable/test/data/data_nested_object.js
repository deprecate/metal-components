var data_nested_object = [{
	"name": "Eduardo Lundgren",
	"email": "edu@rdo.io",
	"address": {
		"street": "The Bowery",
		"city": "New York"
	}
}, {
	"name": "Adélaide",
	"email": "adelaide@domain.com",
	"address": {
		"street": "La Pigalle",
		"city": "Paris"
	}
}];

var data_nested_object_expanded = {
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
				"address": {
					"type": "object",
					"value": {
						"street": {
							"type": "string",
							"value": "The Bowery"
						},
						"city": {
							"type": "string",
							"value": "New York"
						}
					}
				}
			}
		},
		{
			"type": "object",
			"value": {
				"name": {
					"type": "string",
					"value": "Adélaide"
				},
				"email": {
					"type": "string",
					"value": "adelaide@domain.com"
				},
				"address": {
					"type": "object",
					"value": {
						"street": {
							"type": "string",
							"value": "La Pigalle"
						},
						"city": {
							"type": "string",
							"value": "Paris"
						}
					}
				}
			}
		}
	],
	"columns": [
		"address",
		"email",
		"name"
	],
	"columnsType": {
		"address": "object",
		"email": "string",
		"name": "string"
	}
};

export { data_nested_object, data_nested_object_expanded };