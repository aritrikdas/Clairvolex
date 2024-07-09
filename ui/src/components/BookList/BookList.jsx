import React from 'react';
import Book from '../Book/Book';

import PaginationComponent from '../PaginationComponent';
import './BooksList.css';
const BooksList = ({ bookList, onPageChange }) => {
  console.log("bookList >>>>", bookList);
  // Check if books exist and default to an empty array if not
  const books = bookList && bookList.books ? bookList.books : [];
  const pagination = bookList.pagination;
  const totalBooks = pagination.totalItems;

  return (
    <div className='books-list-container'>
      <div className='d-flex flex-wrap justify-content-between align-items-center mb-3'>
        <h5 className='mb-0'>Books List</h5>
        <span className='badge rounded-pill bg-primary'>
          Total Books: {totalBooks}
        </span>
      </div>
      <div className='d-flex flex-wrap'>
        {books.map(book => <Book key={book.book_id} book={book} />)}
      </div>
      <div className="d-flex justify-content-center">
        <PaginationComponent
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default BooksList;