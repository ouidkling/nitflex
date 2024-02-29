'use strict';

exports.seed = function (knex) {
	return knex('user')
		.del()
		.then(() => {
			return knex('user').insert([
				{
					firstname: 'admin',
					lastname: 'admin',
					username: 'admin',
					email: process.env.ADMIN_EMAIL,
					password: process.env.ADMIN_PASSWORD,
					scope: JSON.stringify(['admin', 'user']),
				},
				{
					firstname: 'John',
					lastname: 'Doe',
					username: 'johndoe',
					email: 'johndoe@example.com',
					password: 'p4ssw0rd',
					scope: JSON.stringify(['user']),
				},
			]);
		});
};
