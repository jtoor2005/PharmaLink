import './style.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrescriptionUpload from './pages/PrescriptionUpload';
import PrescriptionList from './pages/PrescriptionList';
import OrderTracking from './pages/OrderTracking';
import Telepharmacy from './pages/Telepharmacy';

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        document.body.className = darkMode ? 'light-mode' : 'dark-mode';
    };

    return (
        <Router>
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <h1>Welcome to PharmaLink</h1>
                <p>Your one-stop solution for remote pharmacy services.</p>
                <button onClick={toggleDarkMode} style={{ marginBottom: '20px' }}>
                    Toggle {darkMode ? 'Light' : 'Dark'} Mode
                </button>
                <nav>
                    <Link to="/upload">Upload Prescription</Link>
                    <Link to="/prescriptions">View Prescriptions</Link>
                    <Link to="/track-order">Track Order</Link>
                    <Link to="/telepharmacy">Telepharmacy</Link>
                </nav>
            </div>

            <Routes>
                <Route path="/upload" element={<PrescriptionUpload />} />
                <Route path="/prescriptions" element={<PrescriptionList />} />
                <Route path="/track-order" element={<OrderTracking />} />
                <Route path="/telepharmacy" element={<Telepharmacy />} />
            </Routes>
        </Router>
    );
};

export default App;
