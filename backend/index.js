const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Configure Multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Default route
app.get('/', (req, res) => {
    res.send('Backend is running...');
});

// File upload route
app.post('/upload-prescription', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.status(200).json({ message: `Prescription uploaded successfully: ${req.file.originalname}` });
});

// List uploaded files route
app.get('/prescriptions', (req, res) => {
    const uploadDir = path.join(__dirname, 'uploads');
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading files' });
        }
        res.status(200).json(files);
    });
});

// Download file route
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('Error downloading file');
        }
    });
});

// Mock order tracking
app.get('/track-order/:id', (req, res) => {
    const orders = {
        '123': { status: 'In Transit', estimatedDelivery: '2024-11-24 3:00 PM' },
        '124': { status: 'Delivered', estimatedDelivery: '2024-11-20 1:00 PM' },
    };
    const order = orders[req.params.id];
    if (order) return res.status(200).json(order);
    res.status(404).json({ message: 'Order not found' });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
