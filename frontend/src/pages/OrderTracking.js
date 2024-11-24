import React, { useState } from 'react';
import axios from 'axios';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');

    const trackOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/track-order/${orderId}`);
            setOrderDetails(response.data);
            setError('');
        } catch (error) {
            console.error('Error tracking order:', error);
            setOrderDetails(null);
            setError('Order not found.');
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Track Your Order</h2>
            <input
                type="text"
                placeholder="Enter Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
            />
            <button
                onClick={trackOrder}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Track Order
            </button>
            {orderDetails && (
                <div style={{ marginTop: '20px' }}>
                    <p>Status: {orderDetails.status}</p>
                    <p>Estimated Delivery: {orderDetails.estimatedDelivery}</p>
                </div>
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default OrderTracking;
