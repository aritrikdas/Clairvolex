import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PaginationComponent from './PaginationComponent';

describe('PaginationComponent', () => {
    it('renders pagination items based on totalPages and highlights the current page', () => {
        const onPageChangeMock = jest.fn();
        render(<PaginationComponent currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />);

        // Check if the correct number of pagination items are rendered
        const paginationItems = screen.getAllByRole('button');
        expect(paginationItems).toHaveLength(5);

        // Check if the first item is active
        expect(paginationItems[0]).toHaveClass('active');
        expect(paginationItems[0]).toHaveTextContent('1');

        // Simulate click on the third pagination item
        fireEvent.click(paginationItems[2]);
        expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });
});