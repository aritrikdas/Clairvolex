var express = require('express');
var router = express.Router();

//
const knex = require('knex');
const { Model } = require('objection');
// Initialize knex.
const knexConfig = require('../knexfile').development;
const db = knex(knexConfig);
// Bind all Models to the knex instance.
Model.knex(db);

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const { q, genre, availability: availabilityStr, sort_by, order = 'asc', page = 1, page_size = 4 } = req.query;
  // Convert availability query parameter to boolean
  const availability = availabilityStr === 'true';
  const searchText = q;
  let query = db('books')
    .select('books.*', 'genre.name as genreName')
    .leftJoin('book_genre', 'books.book_id', 'book_genre.book_id')
    .leftJoin('genre', 'book_genre.genre_id', 'genre.genre_id');

  if (genre) query = query.andWhere('genre.genre_id', genre);

  // Add logic to filter by availability
  if (availability) {
    console.log("availability check true")
    query = query.andWhere('availability', true);
  }

  if (searchText) {
    query = query.where('title', 'like', `%${searchText}%`).orWhere('author', 'like', `%${searchText}%`);
  }

  // const books = await query;
  // Calculate total items
  const totalItemsResult = await query.clone().count({ count: '*' }).first();
  const totalItems = totalItemsResult.count;

  const sortByField = ['title', 'author', 'published_date'].includes(sort_by) ? sort_by : 'title';
  const booksQuery = query.clone().orderBy(sortByField, order).limit(page_size).offset((page - 1) * page_size);

  const books = await booksQuery;

  // Calculate total pages
  const totalPages = Math.ceil(totalItems / page_size);

  // Allow CORS for all routes
  res.json({
    books,
    pagination: {
      page: parseInt(page, 10),
      pageSize: parseInt(page_size, 10),
      totalItems: parseInt(totalItems, 10),
      totalPages,
      sortOrder: order
    }
  });
});

/**
 * GET genres list.
 * This endpoint retrieves all genres from the database and returns them in a structured JSON format.
 * On success, it returns a JSON object with a status of "success" and an array of genres under the "data" key.
 * On failure, it returns a JSON object with a status of "failed" and an error message.
 */
router.get('/genre', async function (req, res) {
  try {
    const genres = await db('genre').select('*');
    res.json({
      status: 'success',
      data: genres
    });
  } catch (error) {
    res.json({
      status: 'failed',
      message: error.message
    });
  }
});

module.exports = router;
