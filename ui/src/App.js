import React, { useState, useEffect } from 'react';
// import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { fetchBooks } from './services/bookService';
import BooksList from './components/BookList/BookList';
import SearchForm from './components/SearchForm/SearchForm';

// import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';

function App() {
  const [bookList, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state


  // Define a reusable function for fetching and setting books
  const fetchAndSetBooks = async (searchParams = '') => {
    try {
      setIsLoading(true);
      // Pass searchParams to fetchBooks, assuming it can handle them
      const booksData = await fetchBooks(searchParams);
      setBooks(booksData);
    } catch (error) {
      console.error("Failed to load books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Use useEffect to call fetchAndSetBooks on initial load
  useEffect(() => {
    const getSearchParamsFromURL = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const params = {};
      for (const [key, value] of searchParams) {
        params[key] = value;
      }
      return params;
    };

    // Extract search parameters and pass them to fetchAndSetBooks
    const searchParams = getSearchParamsFromURL();
    fetchAndSetBooks(searchParams);
  }, []);

  const handleSearch = (searchTerm) => {
    console.log("searchTerm", searchTerm);
    const filteredSearchTerm = Object.entries(searchTerm).reduce((acc, [key, value]) => {
      if (value !== '' && value !== false) {
        acc[key] = value;
      }
      return acc;
    }, {});

    // Use URLSearchParams to construct the query string
    const searchParams = new URLSearchParams(filteredSearchTerm).toString();
    console.log("searchParams >> ", searchParams);
    // Construct the new URL with search parameters
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${searchParams}`;
    // Update the URL in the browser without reloading the page
    window.history.pushState({ path: newUrl }, '', newUrl);
    // Call fetchAndSetBooks with the search parameters
    fetchAndSetBooks(filteredSearchTerm);
  };

  const handlePageChange = (newPage) => {
    console.log("newPage handlePageChange", newPage);
    // Fetch new books based on newPage and update state accordingly
    // Extract current search parameters from the URL
    const currentSearchParams = new URLSearchParams(window.location.search);
    // Update the page parameter
    currentSearchParams.set('page', newPage);
    // Construct the new URL with updated page parameter
    const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?${currentSearchParams.toString()}`;
    // Update the URL in the browser without reloading the page
    window.history.pushState({ path: newUrl }, '', newUrl);
    // Convert URLSearchParams back to a plain object to pass to fetchAndSetBooks
    const searchParamsObj = Object.fromEntries(currentSearchParams.entries());
    // Call fetchAndSetBooks with the updated search parameters
    fetchAndSetBooks(searchParamsObj);
  };

  return (
    <div className="container">
      <div className="row mb-3">
        <div className="col-12">
          <h1>Book Search</h1>
          {/* <SearchForm onSearch={handleSearch} /> */}
        </div>
      </div>
      <div className="row">
        <div className="col-md-4 col-lg-3">
          <SearchForm onSearch={handleSearch} />
        </div>
        <div className="col-md-8 col-lg-9">

          {/* <BooksList books={books} /> */}
          {isLoading ? (
            <Card style={{ width: '18rem' }}>
              {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
              <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                  <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                  <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                  <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <Placeholder.Button variant="primary" xs={6} />
              </Card.Body>
            </Card>// Show loading indicator while loading
          ) : (
            <BooksList bookList={bookList} onPageChange={handlePageChange} /> // Render BooksList only when not loading
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
