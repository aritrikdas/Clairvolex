import React, { useState, useCallback, useEffect  } from 'react';

const SearchForm = ({ onSearch }) => {
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

    // Update searchParams state with q from URL if available
    setSearchParams((prevParams) => ({
      ...prevParams,
      q: qParam,
    }));
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
    <form  className="container mt-3">
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
        <div className="col-auto">
          <input
            type="text"
            name="genre"
            className="form-control"
            placeholder="Genre"
            value={searchParams.genre}
            onChange={handleChange}
          />
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