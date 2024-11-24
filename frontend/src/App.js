import './style.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PrescriptionUpload from './pages/PrescriptionUpload';
import PrescriptionList from './pages/PrescriptionList';
import OrderTracking from './pages/OrderTracking';
import Telepharmacy from './pages/Telepharmacy';



const App = () => {
    return (
        <Router>
            <div style={{ textAlign: 'center', margin: '20px' }}>
                <h1>Welcome to PharmaLink</h1>
                <p>Your one-stop solution for remote pharmacy services.</p>
                <nav>
                    <Link to="/upload" style={{ marginRight: '20px' }}>
                        Upload Prescription
                    </Link>
                    <Link to="/prescriptions" style={{ marginRight: '20px' }}>
                        View Prescriptions
                    </Link>
                    <Link to="/track-order" style={{ marginRight: '20px' }}>
                        Track Order
                    </Link>
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
