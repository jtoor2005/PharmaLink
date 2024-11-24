import React, { useState } from 'react';
import axios from 'axios';

const OrderTracking = () => {
    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);

    const trackOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/track-order/${orderId}`);
            setOrderDetails(response.data);
        } catch (error) {
            setOrderDetails({ message: 'Order not found' });
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
                style={{ marginBottom: '10px' }}
            />
            <button onClick={trackOrder}>Track Order</button>
            {orderDetails && (
                <div style={{ marginTop: '20px' }}>
                    <p>Status: {orderDetails.status || orderDetails.message}</p>
                    <p>Estimated Delivery: {orderDetails.estimatedDelivery || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default OrderTracking;
