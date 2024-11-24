import React, { useState } from 'react';
import axios from 'axios';

const PrescriptionUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleUpload = async () => {
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
        try {
            const response = await axios.post('http://localhost:5000/upload', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Upload failed');
        }
    };

    return (
        <div>
            <h2>Upload Prescription</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default PrescriptionUpload;
