import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrescriptionUpload from './pages/PrescriptionUpload';
import PrescriptionList from './pages/PrescriptionList';
import OrderTracking from './pages/OrderTracking';
import Telepharmacy from './pages/Telepharmacy';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <h1>Welcome to PharmaLink</h1>
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload-prescription" element={<PrescriptionUpload />} />
                <Route path="/prescriptions" element={<PrescriptionList />} />
                <Route path="/track-order" element={<OrderTracking />} />
                <Route path="/telepharmacy" element={<Telepharmacy />} />
            </Routes>
        </Router>
    );
};

export default App;

