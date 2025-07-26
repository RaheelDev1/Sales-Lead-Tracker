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
app.post('/leads', (req, res) => {
    const newLead = req.body;

    if(!newLead.name || !newLead.contact){
        return res.status(400).json({message: 'Name and contact are required'});
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
app.put('/leads/:id', (req,res) => {
    const leadId = parseInt(req.params.id);
    const updatedLead = req.body;

    if (!updatedLead.name || !updatedLead.contact){
        return res.status(400).json({message: 'Name and contact are required'});
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
app.listen(PORT, () => {
    app.listen(PORT, () => {
        console.log('Server running on port ${PORT}');

    });
});