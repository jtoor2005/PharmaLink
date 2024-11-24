import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Welcome to PharmaLink</h1>
        <p>Your one-stop solution for remote pharmacy services.</p>
        <div style={{ marginTop: '30px' }}>
            <Link
                to="/upload-prescription"
                style={{
                    display: 'inline-block',
                    margin: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px',
                }}
            >
                Upload Prescription
            </Link>
            <Link
                to="/prescriptions"
                style={{
                    display: 'inline-block',
                    margin: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px',
                }}
            >
                View Prescriptions
            </Link>
            <Link
                to="/track-order"
                style={{
                    display: 'inline-block',
                    margin: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#17a2b8',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '5px',
                }}
            >
                Track Order
            </Link>
            <Link
                to="/telepharmacy"
                style={{
                    display: 'inline-block',
                    margin: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#ffc107',
                    color: '#000',
                    textDecoration: 'none',
                    borderRadius: '5px',
                }}
            >
                Telepharmacy
            </Link>
        </div>
    </div>
);

export default Home;
