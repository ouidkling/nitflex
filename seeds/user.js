'use strict';

const Encrypt = require('../lib/modules/encrypt');

exports.seed = function (knex) {
	return knex('user')
		.del()
		.then(() => {
			return knex('user').insert([
				{
					firstname: 'admin',
					lastname: 'admin',
					username: 'admin',
					email: process.env.ADMIN_EMAIL || 'admin@example.com',
					password: Encrypt.rsaSha256(
						process.env.ADMIN_PASSWORD || 'admin'
					),
					scope: JSON.stringify(['admin', 'user']),
				},
				{
					firstname: 'John',
					lastname: 'Doe',
					username: 'johndoe',
					email: 'johndoe@example.com',
					password: Encrypt.rsaSha256('password'),
					scope: JSON.stringify(['user']),
				},
			]);
		});
};
