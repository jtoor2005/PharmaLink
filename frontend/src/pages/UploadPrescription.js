import React, { useState } from 'react';
import axios from 'axios';

const UploadPrescription = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadResponse, setUploadResponse] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await axios.post('http://localhost:5000/upload-prescription', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setUploadResponse(response.data);
        } catch (err) {
            console.error('Error uploading file:', err);
            alert('Error uploading prescription. Please try again.');
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2>Upload Prescription</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload} style={{ margin: '10px' }}>
                Upload
            </button>
            {uploadResponse && (
                <div>
                    <h3>Validation Results</h3>
                    <p>Extracted Text:</p>
                    <pre
                        style={{
                            background: '#f4f4f4',
                            padding: '10px',
                            borderRadius: '5px',
                            overflowX: 'auto',
                            textAlign: 'left',
                        }}
                    >
                        {uploadResponse.validationResults.extractedText || 'No text extracted.'}
                    </pre>
                    <p>Doctor Valid: {uploadResponse.validationResults.validDoctor ? 'Yes' : 'No'}</p>
                    <p>Medication Valid: {uploadResponse.validationResults.validMedication ? 'Yes' : 'No'}</p>
                </div>
            )}
        </div>
    );
};

export default UploadPrescription;
