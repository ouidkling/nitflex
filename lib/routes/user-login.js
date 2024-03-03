'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/user');

const payload = Joi.object({
	email: joiSchema.extract('email'),
	password: joiSchema.extract('password').min(0),
});

module.exports = {
	method: 'post',
	path: '/user/login',
	options: {
		auth: false,
		tags: ['api'],
		validate: {
			payload,
		},
		handler: async (request, h) => {
			const { userService } = request.services();

			return await userService.login(request.payload);
		},
	},
};
