/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('book_genre').del()
  await knex('book_genre').insert([
    {book_id: 1, genre_id: 1}, // 'The Final Empire' is Fantasy
    {book_id: 2, genre_id: 3}, // 'The Well of Ascension' is Fantasy
    {book_id: 3, genre_id: 2}, // 'The Hero of Ages' is Fantasy
    {book_id: 4, genre_id: 4}, // 'Elantris' is Fantasy
    {book_id: 5, genre_id: 4}, // 'Mistborn: The Alloy of Law' is Fantasy
    {book_id: 6, genre_id: 2}, // 'The Name of the Wind' is Fantasy
    {book_id: 7, genre_id: 2}, // 'The Wise Man's Fear' is Fantasy
    {book_id: 8, genre_id: 4}, // 'The Slow Regard of Silent Things' is Fantasy
    {book_id: 9, genre_id: 3}, // 'Doors of Stone' is Fantasy (assuming it would be)
    {book_id: 10, genre_id: 1} //
  ]);
};
