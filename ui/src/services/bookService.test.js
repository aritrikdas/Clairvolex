import { fetchBooks } from './bookService';
import { jest } from '@jest/globals';

// Mock global.fetch
global.fetch = jest.fn()
    .mockImplementationOnce(() => // First call for fetching books
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                books: [
                    {
                        book_id: 9,
                        title: "Doors of Stone",
                        author: "Patrick Rothfuss",
                        published_date: "0000-00-00",
                        genre: "Fantasy",
                        created_at: "2024-07-08T15:18:53.000Z",
                        updated_at: "2024-07-08T15:18:53.000Z",
                        in_stock: 1,
                        description: "The eagerly awaited third book of The Kingkiller Chronicle.",
                        isbn: "Not Yet Published",
                        availability: 0,
                        genreName: "Science Fiction"
                    }
                ],
                pagination: {
                    page: 1,
                    pageSize: 4,
                    totalItems: 1,
                    totalPages: 1,
                    sortOrder: "asc"
                }
            }),
        })
    )
    .mockImplementationOnce(() => // Second call for fetching genres
        Promise.resolve({
            ok: true,
            json: () => Promise.resolve({
                status: "success",
                data: [
                    { genre_id: 4, name: "Fantasy" },
                    { genre_id: 1, name: "Fiction" },
                    { genre_id: 2, name: "Non-Fiction" },
                    { genre_id: 3, name: "Science Fiction" }
                ]
            }),
        })
    );

describe('fetchBooks', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should fetch books successfully with the expected response structure', async () => {
        const searchParams = { genre: 'Fantasy' };
        const response = await fetchBooks(searchParams);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(response).toEqual({
            books: [
                {
                    book_id: 9,
                    title: "Doors of Stone",
                    author: "Patrick Rothfuss",
                    published_date: "0000-00-00",
                    genre: "Fantasy",
                    created_at: "2024-07-08T15:18:53.000Z",
                    updated_at: "2024-07-08T15:18:53.000Z",
                    in_stock: 1,
                    description: "The eagerly awaited third book of The Kingkiller Chronicle.",
                    isbn: "Not Yet Published",
                    availability: 0,
                    genreName: "Science Fiction"
                }
            ],
            pagination: {
                page: 1,
                pageSize: 4,
                totalItems: 1,
                totalPages: 1,
                sortOrder: "asc"
            }
        });
    });
});


describe('fetchBooks', () => {
    beforeEach(() => {
        fetch.mockClear();
    });

    it('should fetch books successfully with the expected response structure', async () => {
        const searchParams = { genre: 'Fantasy' };
        const response = await fetchBooks(searchParams);

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(response).toEqual({
            books: [
                {
                    book_id: 9,
                    title: "Doors of Stone",
                    author: "Patrick Rothfuss",
                    published_date: "0000-00-00",
                    genre: "Fantasy",
                    created_at: "2024-07-08T15:18:53.000Z",
                    updated_at: "2024-07-08T15:18:53.000Z",
                    in_stock: 1,
                    description: "The eagerly awaited third book of The Kingkiller Chronicle.",
                    isbn: "Not Yet Published",
                    availability: 0,
                    genreName: "Science Fiction"
                }
            ],
            pagination: {
                page: 1,
                pageSize: 4,
                totalItems: 1,
                totalPages: 1,
                sortOrder: "asc"
            }
        });
    });
});