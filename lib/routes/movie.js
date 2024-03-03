'use strict';

const Joi = require('joi');

module.exports = {
	method: 'get',
	path: '/movie/{id}',
	options: {
		auth: {
			scope: ['user'],
		},
		tags: ['api'],
		validate: {
			params: Joi.object({
				id: Joi.number()
					.integer()
					.required()
					.example(8)
					.description('Unique ID of the movie'),
			}),
		},
		handler: async (request, h) => {
			const { movieService } = request.services();

			return await movieService.getMovie(request.params.id);
		},
	},
};
