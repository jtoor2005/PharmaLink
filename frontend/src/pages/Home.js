import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to PharmaLink</h1>
            <ul>
                <li><Link to="/telepharmacy">Telepharmacy</Link></li>
                <li><Link to="/upload">Upload Prescription</Link></li>
                <li><Link to="/tracking">Track Order</Link></li>
            </ul>
        </div>
    );
};

export default Home;
