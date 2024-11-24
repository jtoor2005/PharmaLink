import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/upload-prescription'); // Navigate to the prescription upload page
    };

    return (
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <h1>Welcome to PharmaLink</h1>
            <Button variant="contained" color="primary" onClick={handleGetStarted}>
                Get Started
            </Button>
        </div>
    );
};

export default Home;
