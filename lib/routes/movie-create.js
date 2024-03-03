'use strict';

const Joi = require('joi');
const { joiSchema } = require('../models/movie');

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
	method: 'post',
	path: '/movie',
	options: {
		auth: {
			scope: ['admin'],
		},
		tags: ['api'],
		validate: {
			payload,
		},
		handler: async (request, h) => {
			const { movieService } = request.services();

			return await movieService.create(request.payload);
		},
	},
};
