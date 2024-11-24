import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import PrescriptionUpload from './pages/PrescriptionUpload';
import Dashboard from './pages/Dashboard';

const App = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/upload-prescription" element={<PrescriptionUpload />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Router>
);

export default App;
