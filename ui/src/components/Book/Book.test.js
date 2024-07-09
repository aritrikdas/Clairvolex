import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Book from './Book'; // Adjust the import path as necessary
import { act } from 'react'; 

describe('Book component with updated mock data', () => {
    const mockBook = {
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
    };

    // it('renders correctly with updated mock data', () => {
    //     render(<Book book={mockBook} />);
    //     expect(screen.getByText(mockBook.title)).toBeInTheDocument();
    //     expect(screen.getByText(mockBook.author)).toBeInTheDocument();
    //     // expect(screen.getByText(`Genre: ${mockBook.genreName}`)).toBeInTheDocument();
    //     // expect(screen.getByText("Not Yet Published")).toBeInTheDocument();
    //     // expect(screen.getByText("Unavailable")).toBeInTheDocument();
    // });

    it('opens modal on info icon click and displays correct description', async () => {
        render(<Book book={mockBook} />);

        // Wrap the state-updating action in act()
        await act(async () => {
            fireEvent.click(screen.getByTestId('info-icon'));
        });

        
        expect(screen.getByText(mockBook.description)).toBeInTheDocument();
    });
});