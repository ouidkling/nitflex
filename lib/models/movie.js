'use strict';

const Joi = require('joi').extend(require('@joi/date'));
const { Model } = require('@hapipal/schwifty');

module.exports = class Movie extends Model {
	static get tableName() {
		return 'movie';
	}

	static get joiSchema() {
		return Joi.object({
			id: Joi.number()
				.required()
				.integer()
				.greater(0)
				.description('Unique ID of the movie'),
			title: Joi.string()
				.required()
				.example('Neon Genesis Evangelion: The End of Evangelion')
				.description('Title of the movie'),
			release: Joi.date()
				.required()
				.format('YYYY-MM-DD')
				.example('1997-07-19')
				.description('Release date of the movie'),
			duration: Joi.number()
				.integer()
				.min(1)
				.example(87)
				.description('Duration of the movie in minutes'),
			director: Joi.string()
				.required()
				.example('Hideaki Anno')
				.description('Director of the movie'),
			about: Joi.string()
				.required()
				.example(
					'The second of two theatrically released follow-ups to the Neon Genesis Evangelion series. Comprising of two alternate episodes which were first intended to take the place of episodes 25 and 26, this finale answers many of the questions surrounding the series, while also opening up some new possibilities.'
				)
				.description('Description of the movie'),
			tagline: Joi.string()
				.example('The fate of destruction is also the joy of rebirth')
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
				.uri()
				.example(
					'https://image.tmdb.org/t/p/original/kv0WrCUZUNiE8lbxPojOT1O7YpF.jpg'
				)
				.description('URL of the poster of the movie'),
			createdAt: Joi.date(),
			updatedAt: Joi.date(),
		});
	}

	$beforeInsert(queryContext) {
		this.updatedAt = new Date();
		this.createdAt = this.updatedAt;
	}

	$beforeUpdate(opt, queryContext) {
		this.updatedAt = new Date();
	}
};
