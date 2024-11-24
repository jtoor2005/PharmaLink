import React, { useState } from 'react';
import axios from 'axios';
import { Button, Typography, TextField } from '@mui/material';

const PrescriptionUpload = () => {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleUpload = async () => {
        if (!file) {
            setMessage('Please select a file.');
            return;
        }
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
        <div style={{ textAlign: 'center', margin: '20px' }}>
            <Typography variant="h4">Upload Prescription</Typography>
            <TextField
                type="file"
                inputProps={{ accept: '.jpg,.jpeg,.png,.pdf' }}
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginTop: '20px', marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleUpload}>
                Upload
            </Button>
            {message && <Typography style={{ marginTop: '10px' }}>{message}</Typography>}
        </div>
    );
};

export default PrescriptionUpload;

