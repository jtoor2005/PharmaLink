import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrescriptionUpload from './pages/PrescriptionUpload';
import Tracking from './pages/Tracking';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/upload" element={<PrescriptionUpload />} />
                <Route path="/tracking" element={<Tracking />} />
            </Routes>
        </Router>
    );
};

export default App;
