/* Few common schemas for user login and setup */
var schema = require('json-schema');
var emailRegex = /^[\w\.\+\-_%]+@(?:[\w\-]+\.)+[A-Za-z]{2,6}$/i;

exports.schemas = {
	subscribeSchema: {
		description: 'Email subscribtion',
		type: 'object',
		properties: {
			email: {
				required: true,
				pattern: emailRegex,
				example: 'john.doe@email.com',
			}
		},
		additionalProperties: false
	},
	findOrCreateUserSchema: {
		description: 'Local login and register',
		type: 'object',
		properties: {
			email: {
				type: 'string',
				required: true,
				pattern: emailRegex,
				example: 'john.doe@email.com'
			},
			password: {
				type: 'string',
				required: true,
				maxLength: 30
			}
		},
		additionalProperties: false
	},
	setupUserSchema: {
		description: 'Common user setup',
		type: 'object',
		properties: {
			email: {
				type: ['null','string'],
				pattern: emailRegex,
				example: 'john.doe@email.com'
			},
			username: {
				type: 'string',
				required: true,
				maxLength: 250
			},
		},
		additionalProperties: false
	}
};

exports.validate = function (json, model, callback) {
	var result = schema.validate(json, this.schemas[model]);
	if (!result.valid) {
		return callback({ message: 'Error validating against schema', error: result.errors });
	}
	return callback(null);
};
