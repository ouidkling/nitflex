'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/movie');

const params = Joi.object({
	id: joiSchema.extract('id').required(),
});

module.exports = {
	method: 'delete',
	path: '/movie/{id}',
	options: {
		auth: {
			scope: ['admin'],
		},
		tags: ['api'],
		validate: {
			params,
		},
		handler: async (request, h) => {
			const { movieService } = request.services();

			return await movieService.delete(request.params.id);
		},
	},
};
