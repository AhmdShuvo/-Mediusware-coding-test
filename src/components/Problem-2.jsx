import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Problem2 = () => {
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [showOnlyEven, setShowOnlyEven] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [selectedContact, setSelectedContact] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    // Fetch initial contact data
    fetchData();
  }, []);

  const fetchData = (reset = false) => {
    // Set the API URL and query parameters
    const apiUrl = 'https://contact.mediusware.com/api/contacts/?format=json';
    const params = {
      format: 'json',
      country: showModalB ? 'US' : undefined,
      page: reset ? 1 : page,
      search: searchInput,
    };

    // Fetch data from the API
    axios.get(apiUrl, { params })
      .then(response => {
        const newContactData = reset ? response.data.results : [...contactData, ...response.data.results];
        setContactData(newContactData);
      })
      .catch(error => {
        console.error('Error fetching data from the API', error);
      });
  };

  const handleShowModalA = () => {
    setShowModalA(true);
    setShowModalB(false);
    setShowModalC(false);
    fetchData(true); // Fetch initial data
  };

  const handleShowModalB = () => {
    setShowModalA(false);
    setShowModalB(true);
    setShowModalC(false);
    fetchData(true); // Fetch initial data
  };

  const handleShowModalC = (contact) => {
    setSelectedContact(contact);
    setShowModalC(true);
  };

  const handleCloseModalA = () => {
    setShowModalA(false);
  };

  const handleCloseModalB = () => {
    setShowModalB(false);
  };

  const handleCloseModalC = () => {
    setShowModalC(false);
  };

  const handleSearchInputChange = (event) => {
    const newSearchInput = event.target.value;
    setSearchInput(newSearchInput);

    // Use a small delay to prevent immediate API calls while typing
    setTimeout(() => {
      fetchData(true); // Fetch data with the updated search input
    }, 300);
  };

  const handleScroll = (event) => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // When scrolling to the bottom, load the next page
      setPage(page + 1);
      fetchData();
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            style={{ color: '#46139f' }}
            type="button"
            onClick={handleShowModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            style={{ color: '#ff7f50' }}
            type="button"
            onClick={handleShowModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A */}
      <Modal show={showModalA} onHide={handleCloseModalA} onShow={() => fetchData(true)}>
        <Modal.Header closeButton>
          <Modal.Title>All Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            <input
              type="checkbox"
              checked={showOnlyEven}
              onChange={() => setShowOnlyEven(!showOnlyEven)}
            /> Only even
          </label>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search..."
          />
          <div onScroll={handleScroll} style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {contactData.map(contact => (
              <div
                key={contact.id}
                onClick={() => handleShowModalC(contact)}
                style={{ cursor: 'pointer' }}
              >
                {contact.country.name} - {contact.phone}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalA}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal B */}
      <Modal show={showModalB} onHide={handleCloseModalB} onShow={() => fetchData(true)}>
        <Modal.Header closeButton>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Search..."
          />
          <div onScroll={handleScroll} style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {contactData.map(contact => (
              <div
                key={contact.id}
                onClick={() => handleShowModalC(contact)}
                style={{ cursor: 'pointer' }}
              >
                {contact.country.name} - {contact.email}
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalB}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal C */}
      <Modal show={showModalC} onHide={handleCloseModalC}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContact && (
            <div>
              <p>Contact ID: {selectedContact.id}</p>
              <p>Contact Name: {selectedContact.country.name}</p>
              {/* Display additional contact details as needed */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModalC}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;