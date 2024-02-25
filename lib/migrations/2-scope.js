'use strict';

module.exports = {
	async up(knex) {
		await knex.schema.alterTable('user', (table) => {
			table.json('scope').notNullable().defaultTo(['user']);
		});
	},

	async down(knex) {
		await knex.schema.table('user', (table) => {
			table.dropColumn('scope');
		});
	},
};
