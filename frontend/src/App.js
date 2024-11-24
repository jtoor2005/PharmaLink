import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrescriptionUpload from './pages/PrescriptionUpload';
import PrescriptionList from './pages/PrescriptionList';
import OrderTracking from './pages/OrderTracking';
import Telepharmacy from './pages/Telepharmacy';
import FAQ from './pages/FAQ';
import Home from './pages/Home';

const App = () => {
    const toggleDarkMode = () => {
        document.body.classList.toggle('dark-mode');
    };

    return (
        <Router>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                {/* Header Section */}
                <h1>Welcome to PharmaLink</h1>
                <p>Your one-stop solution for remote pharmacy services.</p>

                {/* Navigation Section */}
                <nav style={{ marginBottom: '20px' }}>
                    <Link to="/">Home</Link>
                    <Link to="/upload-prescription" style={{ marginLeft: '15px' }}>Upload Prescription</Link>
                    <Link to="/prescriptions" style={{ marginLeft: '15px' }}>View Prescriptions</Link>
                    <Link to="/track-order" style={{ marginLeft: '15px' }}>Track Order</Link>
                    <Link to="/telepharmacy" style={{ marginLeft: '15px' }}>Telepharmacy</Link>
                    <Link to="/faq" style={{ marginLeft: '15px' }}>FAQ</Link>
                </nav>

                {/* Dark Mode Toggle */}
                <button onClick={toggleDarkMode} style={{ marginBottom: '20px' }}>Toggle Dark Mode</button>
            </div>

            {/* Routes */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload-prescription" element={<PrescriptionUpload />} />
                <Route path="/prescriptions" element={<PrescriptionList />} />
                <Route path="/track-order" element={<OrderTracking />} />
                <Route path="/telepharmacy" element={<Telepharmacy />} />
                <Route path="/faq" element={<FAQ />} />
            </Routes>
        </Router>
    );
};

export default App;
