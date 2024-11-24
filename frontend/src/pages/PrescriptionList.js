import React, { useEffect, useState } from 'react';

const PrescriptionList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await fetch('http://localhost:5000/prescriptions');
                const data = await response.json();

                if (response.ok) {
                    setPrescriptions(data);
                    setError('');
                } else {
                    setError(data.message || 'Failed to fetch prescriptions');
                }
            } catch (err) {
                console.error('Error fetching prescriptions:', err);
                setError('Failed to fetch prescriptions. Please try again.');
            }
        };

        fetchPrescriptions();
    }, []);

    return (
        <div>
            <h2>Uploaded Prescriptions</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!error && prescriptions.length === 0 && <p>No prescriptions uploaded yet.</p>}
            <ul>
                {prescriptions.map((file, index) => (
                    <li key={index}>
                        <a href={`http://localhost:5000/uploads/${file}`} download>
                            {file}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PrescriptionList;
