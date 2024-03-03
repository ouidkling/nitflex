'use strict';

const Joi = require('joi');

module.exports = {
	method: 'patch',
	path: '/movie/{id}',
	options: {
		auth: {
			scope: ['admin'],
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
			payload: Joi.object({
				title: Joi.string()
					.required()
					.example('Neon Genesis Evangelion: The End of Evangelion')
					.description('Title of the movie'),
				release: Joi.date()
					.required()
					.example('1997-07-19')
					.description('Release date of the movie'),
				director: Joi.string()
					.required()
					.example('Hideaki Anno')
					.description('Director of the movie'),
				duration: Joi.number()
					.integer()
					.min(1)
					.example(87)
					.description('Duration of the movie in minutes'),
				about: Joi.string()
					.required()
					.example(
						'The second of two theatrically released follow-ups to the Neon Genesis Evangelion series. Comprising of two alternate episodes which were first intended to take the place of episodes 25 and 26, this finale answers many of the questions surrounding the series, while also opening up some new possibilities.'
					)
					.description('Description of the movie'),
				tagline: Joi.string()
					.example(
						'The fate of destruction is also the joy of rebirth'
					)
					.description('Tagline of the movie'),
				budget: Joi.number()
					.integer()
					.example(10000000)
					.description('Budget of the movie (USD)'),
				revenue: Joi.number()
					.integer()
					.example(20000000)
					.description('Revenue of the movie (USD)'),
				poster: Joi.string()
					.example(
						'https://image.tmdb.org/t/p/original/kv0WrCUZUNiE8lbxPojOT1O7YpF.jpg'
					)
					.description('URL of the poster of the movie'),
			}),
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
