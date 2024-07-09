import React, { useState, useCallback, useEffect } from 'react';
import { fetchGenre } from '../../services/bookService';
import toast, { Toaster } from 'react-hot-toast';

const SearchForm = ({ onSearch }) => {
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    q: '',
    genre: '',
    publishedDate: '',
    inStock: false,
    availability: false,
  });

  useEffect(() => {
    // Parse query parameters from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const qParam = queryParams.get('q') || ''; // Default to '' if q is not present


    // Fetch genres on component load
    const loadGenres = async () => {
      try {
        const response = await fetchGenre();

        console.log("load Genres response ", response);
        if (response.status === 'success') {
          setGenres(response.data); // Save fetched genres
          // Optionally, set the first genre as default in searchParams
          setSearchParams((prevParams) => ({
            ...prevParams,
            q: qParam,
            genre: queryParams.get('genre') || '',
          }));

          console.log("genres >>>", JSON.stringify(genres));
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    loadGenres();

  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((params) => onSearch(params), 500),
    []
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newParams = {
      ...searchParams,
      [name]: type === 'checkbox' ? checked : value,
    };

    setSearchParams(newParams);
    debouncedSearch(newParams);
  };

  return (
    <form className="container mt-3" role='form'>
      <div className="row g-3 align-items-center">
        <div className="col-auto">
          <input
            type="text"
            name="q"
            className="form-control"
            placeholder="Search by Title or Author"
            value={searchParams.q}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genreSelect">Select Genre</label>
          {isLoading ? (
            <p>Loading genres...</p> // Step 2: Display a loader
          ) : (
            <select
              className="form-control"
              id="genreSelect"
              name="genre"
              value={searchParams.genre}
              onChange={handleChange}
              disabled={isLoading}
            >
              <option value="">Select Genre</option>
              {genres.map((genre) => (
                <option key={genre.genre_id} value={genre.genre_id}>
                  {genre.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="col-auto">
          <div className="form-check">
            <input
              type="checkbox"
              name="availability"
              className="form-check-input"
              id="availabilityCheck"
              checked={searchParams.availability}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="availabilityCheck">
              Exclude Out of Stocks
            </label>
          </div>
        </div>

      </div>
    </form>
  );
};

export default SearchForm;