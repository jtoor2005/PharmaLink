import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Telepharmacy from './pages/Telepharmacy';
import PrescriptionUpload from './pages/PrescriptionUpload';
import Tracking from './pages/Tracking';
import NotFound from './pages/NotFound';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/telepharmacy" element={<Telepharmacy />} />
                <Route path="/upload" element={<PrescriptionUpload />} />
                <Route path="/tracking" element={<Tracking />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default App;

