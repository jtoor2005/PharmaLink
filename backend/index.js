const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer
const upload = multer({ dest: 'uploads/' });

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload Prescription Route
app.post('/upload-prescription', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, req.file.path);

    // Check if file is a PDF
    if (req.file.mimetype === 'application/pdf') {
        const fileBuffer = fs.readFileSync(filePath);

        pdfParse(fileBuffer)
            .then((data) => {
                const extractedText = data.text;
                const verificationResults = verifyPrescription(extractedText);

                res.status(200).json({
                    message: 'File processed successfully',
                    verificationResults,
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ message: 'Error processing PDF file', error: err.message });
            });
    } else {
        // Handle unsupported file types
        res.status(400).json({ message: 'Unsupported file type. Please upload a PDF.' });
    }
});

// Prescriptions Route
app.get('/prescriptions', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Error reading uploaded files' });
        }

        // Return an empty message if no files are found
        if (files.length === 0) {
            return res.status(200).json({ message: 'No prescriptions uploaded yet.' });
        }

        res.status(200).json(files);
    });
});

// Order Tracking Route
const orders = {
    '123': { status: 'In Transit', estimatedDelivery: '2024-11-24 3:00 PM' },
    '124': { status: 'Delivered', estimatedDelivery: '2024-11-20 1:00 PM' },
};

app.get('/track-order/:id', (req, res) => {
    const order = orders[req.params.id];
    if (order) {
        return res.status(200).json(order);
    }
    res.status(404).json({ message: 'Order not found' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Utility function for verification
const doctorsDatabase = ['Dr. Smith', 'Dr. Johnson', 'Dr. Patel', 'Dr. Emily Carter'];
const medicationsDatabase = ['Paracetamol', 'Ibuprofen', 'Amoxicillin'];

const verifyPrescription = (extractedText) => {
    const cleanedText = extractedText.toLowerCase().replace(/\s+/g, ' '); // Normalize text
    const results = {
        validDoctor: false,
        validMedication: false,
        extractedText: extractedText,
    };

    // Check for doctor credentials
    results.validDoctor = doctorsDatabase.some((doctor) =>
        cleanedText.includes(doctor.toLowerCase())
    );

    // Check for medication names
    results.validMedication = medicationsDatabase.some((med) =>
        cleanedText.includes(med.toLowerCase())
    );

    return results;
};
