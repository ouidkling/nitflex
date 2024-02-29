'use strict';

module.exports = {
	async up(knex) {
		await knex.schema.createTable('movie', (table) => {
			table.increments('id').primary();
			table.string('title').notNullable();
			table.date('released');
			table.time('duration');
			table.string('genre');
			table.string('director');
			table.string('writer');
			table.string('actors');
			table.string('plot');
			table.string('poster');
			table.string('boxOffice');

			table.dateTime('createdAt').notNullable().defaultTo(knex.fn.now());
			table.dateTime('updatedAt').notNullable().defaultTo(knex.fn.now());
		});
	},

	async down(knex) {
		await knex.schema.dropTableIfExists('movie');
	},
};
