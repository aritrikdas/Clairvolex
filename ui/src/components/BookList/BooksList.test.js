import React from 'react';
import { render, screen } from '@testing-library/react';
import BooksList from './BookList';
import Book from '../Book/Book';
import PaginationComponent from '../PaginationComponent';

// Mock the Book and PaginationComponent to isolate the test to BooksList component
jest.mock('../Book/Book', () => jest.fn(() => <div>Book Component</div>));
jest.mock('../PaginationComponent', () => jest.fn(() => <div>Pagination Component</div>));

describe('BooksList Component', () => {
    const mockBooksList = {
        "books": [
            {
                "book_id": 9,
                "title": "Doors of Stone",
                "author": "Patrick Rothfuss",
                "published_date": "0000-00-00",
                "genre": "Fantasy",
                "created_at": "2024-07-08T15:18:53.000Z",
                "updated_at": "2024-07-08T15:18:53.000Z",
                "in_stock": 1,
                "description": "The eagerly awaited third book of The Kingkiller Chronicle.",
                "isbn": "Not Yet Published",
                "availability": 0,
                "genreName": "Science Fiction"
            },
            {
                "book_id": 2,
                "title": "The Well of Ascension",
                "author": "Brandon Sanderson",
                "published_date": "2007-08-20T18:30:00.000Z",
                "genre": "Fantasy",
                "created_at": "2024-07-08T15:18:53.000Z",
                "updated_at": "2024-07-08T15:18:53.000Z",
                "in_stock": 1,
                "description": "The impossible has been accomplished. The Lord Ruler – the man who claimed to be god incarnate and brutally ruled the world for a thousand years – has been vanquished.",
                "isbn": "0765316889",
                "availability": 1,
                "genreName": "Science Fiction"
            }
        ],
        "pagination": {
            "page": 1,
            "pageSize": 4,
            "totalItems": 2,
            "totalPages": 1,
            "sortOrder": "asc"
        }
    };

    test('renders without crashing', () => {
        render(<BooksList bookList={mockBooksList} onPageChange={() => { }} />);
        expect(screen.getByText('Books List')).toBeInTheDocument();
    });

    test('displays the total number of books', () => {
        render(<BooksList bookList={mockBooksList} onPageChange={() => { }} />);
        expect(screen.getByText('Total Books: 2')).toBeInTheDocument();
    });

    // test('renders the correct number of Book components', () => {
    //     render(<BooksList bookList={mockBooksList} onPageChange={() => { }} />);
    //     // Since Book component is mocked, we check for the mocked component's placeholder text
    //     const bookComponents = screen.getAllByText('Book Component');
    //     expect(bookComponents.length).toBe(2);
    // });
    

    test('renders PaginationComponent with correct props', () => {
        render(<BooksList bookList={mockBooksList} onPageChange={() => { }} />);
        expect(PaginationComponent).toHaveBeenCalledWith({
            currentPage: 1,
            totalPages: 1,
            onPageChange: expect.any(Function),
        }, {});
    });
});