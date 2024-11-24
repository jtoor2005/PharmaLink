import React, { useState } from 'react';
import axios from 'axios';

const PrescriptionUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload-prescription', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error uploading prescription.');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
            <h2>Upload Prescription</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
        </div>
    );
};

export default PrescriptionUpload;
