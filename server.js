const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;
const fs = require('fs');
const DATA_FILE = './leads.json';

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Sales Lead Tracker API is running...');
});
app.get('/leads', (req, res) => {
    if (err) {
        return res.status(500).json({message: 'Error reading leads data'});
    }
    const leads = JSON.parse(data || '[]');
    res.json(leads);
    
});
app.listen(PORT, () => {
    app.listen(PORT, () => {
        console.log('Server running on port ${PORT}');

    });
});