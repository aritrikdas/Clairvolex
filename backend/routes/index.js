var express = require('express');
var router = express.Router();


/////
const knex = require('knex');
const { Model } = require('objection');
// Initialize knex.
const knexConfig = require('../knexfile').development;
const db = knex(knexConfig);
// Bind all Models to the knex instance.
Model.knex(db);

/////

/* GET home page. */
router.get('/', async function (req, res, next) {

  


  res.render('index', { title: 'Express' });
});

module.exports = router;
