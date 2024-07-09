// test/books.test.js
const request = require('supertest');
const app = require('../app'); // Adjust the path as necessary

const knex = require('knex');
const { Model } = require('objection');
// Initialize knex.
const knexConfig = require('../knexfile').development;
const db = knex(knexConfig);
// Bind all Models to the knex instance.
Model.knex(db);

describe('Books API', () => {
    // afterAll(async () => {
    //     // Clean up resources
    //     await db.destroy();
    // });

    it('should return a list of books', async () => {
        const res = await request(app)
            .get('/api/v1.0/books')
            .query({ q: 'harry' })
            .expect(200);

        expect(res.body).toHaveProperty('books');
        expect(res.body.books).toBeInstanceOf(Array);
    });

    it('should return an empty array when no books by the author are found', async () => {
        const res = await request(app)
            .get('/api/v1.0/books')
            .query({ q: 'rowling' })
            .expect(200);

        expect(res.body).toHaveProperty('books');
        expect(res.body.books).toBeInstanceOf(Array);
        expect(res.body.books.length).toBe(0);
        expect(res.body).toHaveProperty('pagination');
        expect(res.body.pagination).toEqual({
            page: 1,
            pageSize: 4,
            totalItems: 0,
            totalPages: 0,
            sortOrder: 'asc'
        });
    });


    it('should return only available books', async () => {
        const res = await request(app)
            .get('/api/v1.0/books')
            .query({ availability: true })
            .expect(200);

        expect(res.body).toHaveProperty('books');
        expect(res.body.books).toBeInstanceOf(Array);

        for (const book of res.body.books) {
            expect(book).toHaveProperty('availability', 1);
        }
    });
    
});
