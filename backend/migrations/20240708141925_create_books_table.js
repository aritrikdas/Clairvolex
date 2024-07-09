/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments('book_id').primary();
        table.string('title', 255).notNullable();
        table.string('author', 255).notNullable();
        table.date('published_date').notNullable();
        table.string('genre', 255);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
        table.boolean('in_stock').notNullable().defaultTo(true);
        table.text('description');
        table.string('isbn', 255).unique();
        // Added availability column
        table.boolean('availability').notNullable().defaultTo(true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('books');
};
