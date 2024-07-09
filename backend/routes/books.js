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
router.get('/', async function(req, res, next) {
  const { q, genre, availability: availabilityStr, sort_by, order = 'asc', page = 1, page_size = 4 } = req.query;
  // Convert availability query parameter to boolean
  const availability = availabilityStr === 'true';
  const searchText = q;
  let query = db('books');
  // if (title) query = query.where('title', 'like', `%${title}%`);
  // if (author) query = query.where('author', 'like', `%${author}%`);
  if (searchText) {
    query = query.where('title', 'like', `%${searchText}%`).orWhere('author', 'like', `%${searchText}%`);
  }

  if (genre) query = query.where('genre', genre);

  // Add logic to filter by availability
  if (availability) {
    console.log("availability check true")
    query = query.where('availability', true);
  }

  // const sortByField = ['title', 'author', 'published_date'].includes(sort_by) ? sort_by : 'title';
  // query = query.orderBy(sortByField, order).limit(page_size).offset((page - 1) * page_size);

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
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
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

module.exports = router;
