'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/user');

const payload = Joi.object({
	firstName: joiSchema.extract('firstName'),
	lastName: joiSchema.extract('lastName'),
	username: joiSchema.extract('username'),
	email: joiSchema.extract('email'),
	password: joiSchema.extract('password'),
});

module.exports = {
	method: 'post',
	path: '/user',
	options: {
		auth: false,
		tags: ['api'],
		validate: {
			payload,
		},
		handler: async (request, h) => {
			const { userService } = request.services();

			return await userService.create(request.payload);
		},
	},
};
