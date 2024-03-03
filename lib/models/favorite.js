'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class Favorite extends Model {
	static get tableName() {
		return 'favorite';
	}

	static get joiSchema() {
		return Joi.object({
			user_id: Joi.number().integer().greater(0),
			movie_id: Joi.number().integer().greater(0),
		});
	}
};
