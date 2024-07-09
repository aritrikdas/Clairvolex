import { render, screen } from '@testing-library/react';
import App from './App';
import { fetchBooks } from './services/bookService';

// Mock the fetchBooks function
jest.mock('./services/bookService', () => ({
  fetchBooks: jest.fn(),
}));

describe('App component tests', () => {
  test('displays loading indicator while fetching books', async () => {
    fetchBooks.mockResolvedValueOnce([]); // Mock fetchBooks to resolve with an empty array
    render(<App />);
    const loadingIndicator = screen.getByText(/loading.../i); // Adjust this to match your loading indicator text or element
    expect(loadingIndicator).toBeInTheDocument();
  });

  test('renders "Book Search" heading', () => {
    fetchBooks.mockResolvedValueOnce([]); // Ensure fetchBooks is mocked if it's called on component mount
    render(<App />);
    const headingElement = screen.getByText(/Book Search/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('renders search form', () => {
    fetchBooks.mockResolvedValueOnce([]); // Ensure fetchBooks is mocked if it's called on component mount
    render(<App />);
    const searchFormElement = screen.getByRole('form'); // This assumes your SearchForm component has a form role
    expect(searchFormElement).toBeInTheDocument();
  });
});