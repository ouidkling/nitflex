'use strict';

module.exports = {
	async up(knex) {
		await knex.schema.createTable('movie', (table) => {
			table.increments('id').primary();
			table.string('title').notNullable();
			table.date('release');
			table.string('duration');
			table.string('director');
			table.string('about', 2000);
			table.bigInteger('budget');
			table.bigInteger('revenue');
			table.string('poster');

			table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
			table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
		});
	},

	async down(knex) {
		await knex.schema.dropTableIfExists('movie');
	},
};
