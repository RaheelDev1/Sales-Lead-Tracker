// Import required modules

const express = require('express');
const cors = require('cors');
const app = express();

// Initialize Express app and define port

const PORT = 3000; 
const fs = require('fs');
const DATA_FILE = './leads.json';

// Enable CORS and allow JSON request body parsing

app.use(cors());
app.use(express.json());

// Default route for checking if API is running

app.get('/', (req, res) => {
    res.send('Sales Lead Tracker API is running...');
});

// Fetch all leads from leads.json

app.get('/leads', (req, res) => {
    if (err) {
        return res.status(500).json({message: 'Error reading leads data'});
    }
    const leads = JSON.parse(data || '[]');
    res.json(leads);
    
});

// Add a new lead to leads.json

app.post('/leads', (req, res) => {
    const newLead = req.body;

    if (!newLead.name || !newLead.contact) {
    return res.status(400).json({ message: 'Name and contact are required' });
}

if (newLead.status && !['New', 'Contacted', 'Interested', 'Converted', 'Rejected'].includes(newLead.status)) {
    return res.status(400).json({ message: 'Invalid status value' });
}

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err){
            return res.status(500).json({message: 'Error reading leads data'});
    }
    
    const leads = JSON.parse(data || '[]');

    newLead.id = leads.length>0 ? leads[leads.length - 1].id+1:1;
    newLeads.status = newLead.status || 'New';

    leads.push(newLead);

    fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), (err) => {
        if(err){
            return res.status(500).json({message: 'Error saving lead'});

        }
        res.status(201).json(newLead);
        });

    });

});

// Update a lead by ID

app.put('/leads/:id', (req,res) => {
    const leadId = parseInt(req.params.id);
    const updatedLead = req.body;

    if (!updatedLead.name || !updatedLead.contact){
        return res.status(400).json({message: 'Name and contact are required'});
        
    if(updatedLead.status && !['New', 'Contacted', 'Interested', 'Converted','Rejected'].includes(updatedLead.status)) {
    return res.status(400).json({message: 'Invalid status value'});
    }     
    }

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({message: 'Error reading leads data'});
    }
    let leads = JSON.parse(data || '[]');
    const index = leads.findIndex(lead => lead.id === leadId);

    if(index === -1){
        return res.status(404).json({message: 'Lead not found'});
    }
    updatedLead.id = leadId;
    updatedLead.status = updatedLead.status || leads[index].status || 'New';

    leads[index] = updatedLead;

    fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), (err) => {
        if (err){
            return res.status(500).json({message: 'Error saving updated lead'});
        }
        res.json(updatedLead);
        });
    });
});

// Delete a lead by ID

app.delete('/leads/:id', (req, res) => {
    const leadId = parseInt(req.params.id);

    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err){
            return res.status(500).json({message: 'Eroor reading leads data'});

        }
        let leads = JSON.parse(data || '[]');
        const index = leads.findIndex(lead => lead.id === leadId);

        if (index === -1){
            return res.status(404).json({message: 'Lead not found'});
        }

        const deletedLead = leads.splice(index, 1)[0];

        fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), (err) => {
            if (err) {
                return res.status(500).json({message: 'Error deleting lead'});
            }
            res.json({message: 'Lead deleted successfully', deletedLead});

        });
    });
});
app.use((err,req,res,next) => {
    console.error(err.stack);
    res.status(500).json({message: 'Something went wrong on the server!'});

});

// Start the server

app.listen(PORT, () => {
    app.listen(PORT, () => {
        console.log('Server running on port ${PORT}');

    });
});