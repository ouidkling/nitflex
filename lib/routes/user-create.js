'use strict';

const Joi = require('joi');

module.exports = {
	method: 'post',
	path: '/user',
	options: {
		auth: false,
		tags: ['api'],
		validate: {
			payload: Joi.object({
				firstName: Joi.string()
					.required()
					.min(3)
					.example('John')
					.description('Firstname of the user'),
				lastName: Joi.string()
					.required()
					.min(3)
					.example('Doe')
					.description('Lastname of the user'),
				username: Joi.string()
					.required()
					.min(3)
					.lowercase()
					.example('johndoe')
					.description('Username of the user'),
				email: Joi.string()
					.email()
					.required()
					.lowercase()
					.example('john.doe@example.com')
					.description('Email address of the user'),
				password: Joi.string()
					.required()
					.min(8)
					.strict()
					.description('Password of the user'),
			}),
		},
		handler: async (request, h) => {
			const { userService } = request.services();

			return await userService.create(request.payload);
		},
	},
};
