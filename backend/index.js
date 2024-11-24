const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer
const upload = multer({ dest: 'uploads/' });

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload Prescription Route
app.post('/upload-prescription', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = path.join(__dirname, req.file.path);

    // Check if file is a PDF
    if (req.file.mimetype === 'application/pdf') {
        const fileBuffer = fs.readFileSync(filePath);

        try {
            const data = await pdfParse(fileBuffer);
            const extractedText = data.text;

            const validationResults = {
                extractedText: extractedText || 'No text extracted.',
                validDoctor: extractedText.includes('Dr. Emily Carter'),
                validMedication:
                    extractedText.includes('Amoxicillin') &&
                    extractedText.includes('Paracetamol') &&
                    extractedText.includes('Ibuprofen'),
            };

            res.status(200).json({
                message: 'File processed successfully',
                validationResults,
            });
        } catch (err) {
            console.error('Error processing PDF:', err);

            // Delete the file in case of error
            fs.unlinkSync(filePath);
            return res.status(500).json({ message: 'Error processing PDF file', error: err.message });
        }
    } else {
        // Handle unsupported file types
        fs.unlinkSync(filePath);
        res.status(400).json({ message: 'Unsupported file type. Please upload a PDF.' });
    }
});

// Prescriptions Route
app.get('/prescriptions', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');

    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({ message: 'Error fetching prescriptions' });
        }

        const pdfFiles = files.filter((file) => file.endsWith('.pdf')); // Only fetch .pdf files
        res.status(200).json(pdfFiles);
    });
});

// Track Order Route
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
