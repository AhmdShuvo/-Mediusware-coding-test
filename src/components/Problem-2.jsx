import React from 'react';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios'; 

const Problem2 = () => {
    const [showModal, setShowModal] = useState(false);
    const [contactData, setContactData] = useState(null);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-2</h4>
                
                <div className="d-flex justify-content-center gap-3">
                <button className="btn btn-lg btn-outline-primary" type="button" >All Contacts</button>
                <button className="btn btn-lg btn-outline-warning" type="button" >US Contacts</button>
                </div>
                
            </div>
        </div>
    );
};

export default Problem2;