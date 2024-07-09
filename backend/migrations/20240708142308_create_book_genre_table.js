/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('book_genre', function (table) {
        table.integer('book_id').unsigned();
        table.integer('genre_id').unsigned();
        table.primary(['book_id', 'genre_id']);
        table.foreign('book_id').references('books.book_id').onDelete('CASCADE');
        table.foreign('genre_id').references('genre.genre_id').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable('book_genre');
};
