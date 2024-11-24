import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrescriptionUpload from './pages/PrescriptionUpload';
import PrescriptionList from './pages/PrescriptionList';
import OrderTracking from './pages/OrderTracking';
import Telepharmacy from './pages/Telepharmacy';
import Home from './pages/Home';
import FAQ from './pages/FAQ';

const App = () => {
    return (
        <Router>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Welcome to PharmaLink</h1>
                <p>Your one-stop solution for remote pharmacy services.</p>
                <nav>
                    <a href="/">Home</a>
                    <a href="/upload-prescription">Upload Prescription</a>
                    <a href="/prescriptions">View Prescriptions</a>
                    <a href="/track-order">Track Order</a>
                    <a href="/telepharmacy">Telepharmacy</a>
                    <a href="/faq">FAQ</a>
                </nav>
            </div>
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
