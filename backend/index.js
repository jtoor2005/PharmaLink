const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

// Mock tracking endpoint
app.get('/tracking/:id', (req, res) => {
    const trackingInfo = {
        id: req.params.id,
        status: 'In Transit',
        estimatedDelivery: '2024-11-24 3:00 PM',
    };
    res.send(trackingInfo);
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
