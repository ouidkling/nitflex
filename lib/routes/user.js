'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/user');

const params = Joi.object({
	id: joiSchema.extract('id').required(),
});

module.exports = {
	method: 'get',
	path: '/user/{id}',
	options: {
		auth: {
			scope: ['admin', 'user'],
		},
		tags: ['api'],
		validate: {
			params,
		},
		handler: async (request, h) => {
			const { userService } = request.services();

			return await userService.getUser(request.params.id);
		},
	},
};
