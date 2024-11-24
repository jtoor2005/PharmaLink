import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrescriptionUpload from './pages/PrescriptionUpload';
import PrescriptionList from './pages/PrescriptionList';
import OrderTracking from './pages/OrderTracking';
import Telepharmacy from './pages/Telepharmacy';
import Home from './pages/Home';
import FAQ from './pages/FAQ'; // Import the FAQ page

const App = () => {
    return (
        <Router>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Welcome to PharmaLink</h1>
                <p>Your one-stop solution for remote pharmacy services.</p>
                <nav style={{ marginTop: '20px' }}>
                    <Link to="/" style={{ marginRight: '15px' }}>
                        Home
                    </Link>
                    <Link to="/upload-prescription" style={{ marginRight: '15px' }}>
                        Upload Prescription
                    </Link>
                    <Link to="/prescriptions" style={{ marginRight: '15px' }}>
                        View Prescriptions
                    </Link>
                    <Link to="/track-order" style={{ marginRight: '15px' }}>
                        Track Order
                    </Link>
                    <Link to="/telepharmacy" style={{ marginRight: '15px' }}>
                        Telepharmacy
                    </Link>
                    <Link to="/faq">FAQ</Link>
                </nav>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload-prescription" element={<PrescriptionUpload />} />
                <Route path="/prescriptions" element={<PrescriptionList />} />
                <Route path="/track-order" element={<OrderTracking />} />
                <Route path="/telepharmacy" element={<Telepharmacy />} />
                <Route path="/faq" element={<FAQ />} /> {/* Add FAQ route */}
            </Routes>
        </Router>
    );
};

export default App;

