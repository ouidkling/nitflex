'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/user');

const params = Joi.object({
	id: joiSchema.extract('id').required(),
});

const payload = Joi.object({
	firstName: joiSchema.extract('firstName'),
	lastName: joiSchema.extract('lastName'),
	username: joiSchema.extract('username'),
	email: joiSchema.extract('email'),
	password: joiSchema.extract('password'),
});

module.exports = {
	method: 'patch',
	path: '/user/{id}',
	options: {
		auth: {
			scope: ['admin'],
		},
		tags: ['api'],
		validate: {
			params,
			payload,
		},
		handler: async (request, h) => {
			const { userService } = request.services();

			return await userService.update(request.params.id, request.payload);
		},
	},
};
