import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchForm from './SearchForm'; // Adjust the import path as necessary
import '@testing-library/jest-dom/extend-expect';

describe('SearchForm', () => {
    const mockHandleChange = jest.fn();
    const mockGenres = [
        { genre_id: '1', name: 'Fantasy' },
        { genre_id: '2', name: 'Science Fiction' }
    ];

    it('updates search input field on change', () => {
        const { getByPlaceholderText } = render(<SearchForm handleChange={mockHandleChange} searchParams={{ q: '', genre: '' }} isLoading={false} genres={[]} />);
        const searchInput = getByPlaceholderText('Search by Title or Author');
        fireEvent.change(searchInput, { target: { value: 'Harry Potter' } });
        expect(mockHandleChange).toHaveBeenCalled();
    });

    it('updates genre select on change when genres are loaded', () => {
        const { getByLabelText } = render(<SearchForm handleChange={mockHandleChange} searchParams={{ q: '', genre: '' }} isLoading={false} genres={mockGenres} />);
        const genreSelect = getByLabelText('Select Genre');
        fireEvent.change(genreSelect, { target: { value: '1' } });
        expect(mockHandleChange).toHaveBeenCalled();
    });

    it('displays loading state correctly', () => {
        const { getByText } = render(<SearchForm handleChange={mockHandleChange} searchParams={{ q: '', genre: '' }} isLoading={true} genres={[]} />);
        expect(getByText('Loading genres...')).toBeInTheDocument();
    });
});