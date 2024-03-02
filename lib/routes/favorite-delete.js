'use strict';

const Joi = require('joi');

module.exports = {
	method: 'delete',
	path: '/favorite/{movie_id}',
	options: {
		auth: {
			scope: ['admin', 'user'],
		},
		tags: ['api'],
		validate: {
			params: Joi.object({
				movie_id: Joi.number()
					.integer()
					.required()
					.example(8)
					.description('Unique ID of the movie'),
			}),
		},
		handler: async (request, h) => {
			const { favoriteService } = request.services();

			return await favoriteService.remove(request);
		},
	},
};
