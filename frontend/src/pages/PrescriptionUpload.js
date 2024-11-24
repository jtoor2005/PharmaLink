import React, { useState } from 'react';

const PrescriptionUpload = () => {
    const [file, setFile] = useState(null);
    const [extractedText, setExtractedText] = useState('');
    const [validationResults, setValidationResults] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError('Please select a file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://localhost:5000/upload-prescription', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage(result.message);
                setValidationResults(result.validationResults);
                setExtractedText(result.validationResults.extractedText);
                setError('');
            } else {
                setError(result.message || 'Error uploading prescription');
                setValidationResults(null);
                setExtractedText('');
            }
        } catch (err) {
            console.error('Error uploading prescription:', err);
            setError('Failed to upload prescription. Please try again.');
            setValidationResults(null);
            setExtractedText('');
        }
    };

    return (
        <div>
            <h2>Upload Prescription</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {validationResults && (
                <div>
                    <h3>Validation Results</h3>
                    <p>
                        <strong>Extracted Text:</strong>
                    </p>
                    <pre style={{ background: '#f9f9f9', padding: '10px', border: '1px solid #ccc' }}>
                        {extractedText}
                    </pre>
                    <p>
                        <strong>Doctor Valid:</strong> {validationResults.validDoctor ? 'Yes' : 'No'}
                    </p>
                    <p>
                        <strong>Medication Valid:</strong> {validationResults.validMedication ? 'Yes' : 'No'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default PrescriptionUpload;
