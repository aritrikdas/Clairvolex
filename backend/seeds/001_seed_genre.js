/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('genre').del()
    .then(function () {
      return knex('genre').insert([
        {genre_id: 1, name: 'Fiction'},
        {genre_id: 2, name: 'Non-Fiction'},
        {genre_id: 3, name: 'Science Fiction'},
        {genre_id: 4, name: 'Fantasy'}
      ]);
    });
};
