'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {
            table.string('username').notNullable().primary();
            table.string('email').notNullable().primary();
            table.string('hashed_password').notNullable();
        });
    },

    async down(knex) {

        await knex.schema.table('user', (table) => {
            table.dropColumn('username');
            table.dropColumn('email');
            table.dropColumn('hashed_password');
        });
    }
}
