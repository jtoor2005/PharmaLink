import React, { useState } from 'react';
import axios from 'axios';

const PrescriptionUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [verificationResults, setVerificationResults] = useState(null);

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload-prescription', formData);
            setMessage(response.data.message);
            setVerificationResults(response.data.verificationResults);
        } catch (error) {
            setMessage('Error uploading prescription.');
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2 style={{ marginBottom: '20px' }}>Upload Prescription</h2>
            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginBottom: '10px' }}
            />
            <button
                onClick={handleUpload}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Upload
            </button>
            {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
            {verificationResults && (
                <div style={{ marginTop: '30px', textAlign: 'left', width: '50%' }}>
                    <h3>Verification Results:</h3>
                    <p><strong>Extracted Text:</strong></p>
                    <pre style={{ background: '#f9f9f9', padding: '10px' }}>{verificationResults.extractedText}</pre>
                    <p><strong>Doctor Valid:</strong> {verificationResults.validDoctor ? 'Yes' : 'No'}</p>
                    <p><strong>Medication Valid:</strong> {verificationResults.validMedication ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    );
};

export default PrescriptionUpload;
