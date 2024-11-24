const express = require('express');
const cors = require('cors');
const multer = require('multer');

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend
    methods: ['GET', 'POST'],        // Specify allowed HTTP methods
    credentials: true               // Enable cookies if needed
}));
app.use(express.json()); // Parse JSON requests

// File upload configuration using multer
const upload = multer({ dest: 'uploads/' });

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to PharmaLink Backend!');
});

// Tracking Route
app.get('/tracking/:id', (req, res) => {
    const trackingInfo = {
        id: req.params.id,
        status: 'In Transit',
        estimatedDelivery: '2024-11-24 3:00 PM',
    };
    res.json(trackingInfo);
});

// File Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ message: 'File uploaded successfully', fileName: req.file.originalname });
});

// Catch-All Route for Undefined Endpoints
app.use((req, res) => {
    res.status(404).send('Route not found. Please check the endpoint!');
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
