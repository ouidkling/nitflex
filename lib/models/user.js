'use strict';

const Joi = require('joi');
const { Model } = require('@hapipal/schwifty');

module.exports = class User extends Model {
	static get tableName() {
		return 'user';
	}

	static get jsonAttributes() {
		return ['scope'];
	}

	static get joiSchema() {
		return Joi.object({
			id: Joi.number()
				.required()
				.integer()
				.greater(0)
				.description('Unique ID of the user'),
			firstName: Joi.string()
				.required()
				.min(3)
				.example('John')
				.description('Firstname of the user'),
			lastName: Joi.string()
				.required()
				.min(3)
				.example('Doe')
				.description('Lastname of the user'),
			username: Joi.string()
				.required()
				.min(3)
				.lowercase()
				.example('johndoe')
				.description('Username of the user'),
			email: Joi.string()
				.email()
				.required()
				.lowercase()
				.example('john.doe@example.com')
				.description('Email address of the user'),
			password: Joi.string()
				.required()
				.min(8)
				.strict()
				.example('password')
				.description('Password of the user'),
			scope: Joi.array()
				.items(
					Joi.string()
						.lowercase()
						.valid('admin', 'user')
						.default('user')
				)
				.description('Roles of the user'),
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
