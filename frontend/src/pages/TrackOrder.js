import React, { useState } from 'react';

const TrackOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState(null);

    const handleTrackOrder = async () => {
        if (!orderId) {
            alert('Please enter an order ID!');
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/track-order/${orderId}`);
            if (response.status === 404) {
                setError('Order not found.');
                setOrderDetails(null);
            } else {
                const data = await response.json();
                setOrderDetails(data);
                setError(null);
            }
        } catch (err) {
            console.error('Error fetching order details:', err);
            setError('Failed to fetch order details. Please try again.');
        }
    };

    return (
        <div>
            <h2>Track Your Order</h2>
            <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID"
            />
            <button onClick={handleTrackOrder}>Track Order</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {orderDetails && (
                <div>
                    <h3>Order Details</h3>
                    <p><strong>Status:</strong> {orderDetails.status}</p>
                    <p><strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}</p>
                </div>
            )}
        </div>
    );
};

export default TrackOrder;
