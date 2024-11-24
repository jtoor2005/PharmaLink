import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/prescriptions');
                setPrescriptions(response.data);
            } catch (error) {
                console.error('Error fetching prescriptions:', error);
            }
        };

        fetchPrescriptions();
    }, []);

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h2>Uploaded Prescriptions</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {prescriptions.map((file, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        {file}
                        <a
                            href={`http://localhost:5000/download/${file}`}
                            style={{
                                marginLeft: '10px',
                                color: 'blue',
                                textDecoration: 'underline',
                            }}
                        >
                            Download
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrescriptionList;
