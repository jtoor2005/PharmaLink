import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tracking = () => {
    const [tracking, setTracking] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTracking = async () => {
            try {
                const response = await axios.get('http://localhost:5000/tracking/123');
                setTracking(response.data);
            } catch (error) {
                console.error('Error fetching tracking info:', error);
                setError('Failed to fetch tracking info.');
            }
        };
        fetchTracking();
    }, []);

    return (
        <div>
            <h2>Order Tracking Page</h2>
            {error && <p>{error}</p>}
            {tracking ? (
                <div>
                    <p>Status: {tracking.status}</p>
                    <p>Estimated Delivery: {tracking.estimatedDelivery}</p>
                </div>
            ) : (
                <p>Loading tracking info...</p>
            )}
        </div>
    );
};

export default Tracking;
