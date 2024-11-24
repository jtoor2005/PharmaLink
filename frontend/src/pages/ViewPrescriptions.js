import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewPrescriptions = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/prescriptions');
                setPrescriptions(response.data);
            } catch (err) {
                console.error('Error fetching prescriptions:', err);
                setError('Failed to fetch prescriptions. Please try again.');
            }
        };

        fetchPrescriptions();
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Uploaded Prescriptions</h2>
            {error ? (
                <p>{error}</p>
            ) : prescriptions.length > 0 ? (
                <ul>
                    {prescriptions.map((fileName) => (
                        <li key={fileName}>
                            <a
                                href={`http://localhost:5000/uploads/${fileName}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {fileName}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No prescriptions uploaded yet.</p>
            )}
        </div>
    );
};

export default ViewPrescriptions;
