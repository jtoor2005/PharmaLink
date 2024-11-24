import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/prescriptions');
                if (response.data.message) {
                    setMessage(response.data.message); // No prescriptions uploaded yet
                } else {
                    setPrescriptions(response.data); // List of uploaded prescriptions
                }
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
                setMessage('Error fetching prescriptions. Please try again.');
            }
        };

        fetchPrescriptions();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h2>Uploaded Prescriptions</h2>
            {message ? (
                <p>{message}</p>
            ) : (
                <ul>
                    {prescriptions.map((file, index) => (
                        <li key={index}>
                            <a href={`http://localhost:5000/uploads/${file}`} download>
                                {file} (Download)
                            </a>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PrescriptionList;
