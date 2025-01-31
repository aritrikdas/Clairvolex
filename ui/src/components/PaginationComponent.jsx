import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <Pagination size="lg">{items}</Pagination>
  );
};

export default PaginationComponent;