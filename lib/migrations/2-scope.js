'use strict';

module.exports = {

    async up(knex) {

        await knex.schema.alterTable('user', (table) => {
            table.string('scope').notNullable();
        });
    },

    async down(knex) {

        await knex.schema.table('user', (table) => {
            table.dropColumn('scope');
        });
    }
};
