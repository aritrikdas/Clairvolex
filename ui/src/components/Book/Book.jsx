import React, { useState } from 'react';
// import { Accordion } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';

// Define MyAccordion component

function Book({ book }) {
  // const accordionId = `accordion-${book.isbn}`;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mb-4 px-3" > {/* Adjusted for responsive layout */}
      <div className="card h-100"> {/* Use h-100 for equal height cards */}
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h5 className="card-title">{book.title}</h5>
           
              <i  variant="primary" onClick={handleShow} className="bi bi-info-circle" style={{ fontSize: '1.5rem' }}></i>
       
          </div>
          <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
          {/* <Button variant="primary" onClick={handleShow}>
            More Details
          </Button> */}

          {/* <p className="card-text">{book.description}</p> */}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Genre: {book.genre}</li>
          <li className="list-group-item">Published: {book.published_date !== "0000-00-00" ? new Date(book.published_date).toLocaleDateString('en-GB', {
            day: '2-digit', month: 'short', year: 'numeric'
          }) : "Not Yet Published"}</li>
          <li className="list-group-item">ISBN: {book.isbn}</li>
        </ul>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Book Description</Modal.Title>
          </Modal.Header>
          <Modal.Body>{book.description}</Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer> */}
        </Modal>
      </div>
    </div>
  );
}

export default Book;