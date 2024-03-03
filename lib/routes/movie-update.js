'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/movie');

const params = Joi.object({
	id: joiSchema.extract('id').required(),
});

const payload = Joi.object({
	title: joiSchema.extract('title'),
	release: joiSchema.extract('release'),
	director: joiSchema.extract('director'),
	duration: joiSchema.extract('duration'),
	about: joiSchema.extract('about'),
	tagline: joiSchema.extract('tagline'),
	budget: joiSchema.extract('budget'),
	revenue: joiSchema.extract('revenue'),
	poster: joiSchema.extract('poster'),
});

module.exports = {
	method: 'patch',
	path: '/movie/{id}',
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
			const { movieService } = request.services();

			return await movieService.update(
				request.params.id,
				request.payload
			);
		},
	},
};
