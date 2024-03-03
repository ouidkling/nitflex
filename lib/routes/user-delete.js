'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/user');

const params = Joi.object({
	id: joiSchema.extract('id').required(),
});

module.exports = {
	method: 'delete',
	path: '/user/{id}',
	options: {
		auth: {
			scope: ['admin'],
		},
		tags: ['api'],
		validate: {
			params,
		},
		handler: async (request, h) => {
			const { userService } = request.services();

			return await userService.delete(request.params.id);
		},
	},
};
