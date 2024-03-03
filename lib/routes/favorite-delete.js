'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/favorite');

const params = Joi.object({
	movie_id: joiSchema.extract('movie_id'),
});

module.exports = {
	method: 'delete',
	path: '/favorite/{movie_id}',
	options: {
		auth: {
			scope: ['admin', 'user'],
		},
		tags: ['api'],
		validate: {
			params,
		},
		handler: async (request, h) => {
			const { favoriteService } = request.services();

			return await favoriteService.remove(request);
		},
	},
};
