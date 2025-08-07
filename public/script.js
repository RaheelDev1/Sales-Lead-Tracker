// Fetch and display all leads from backend API

const API_URL = 'http://localhost:3000/leads';
const leadsTableBody = document.querySelector('#leadsTable tbody');
const leadForm = document.getElementById('leadForm');

// fetch all leads from the backend and display them in the table 

    async function fetchLeads() {

    console.log('Fetching leads from API...');

    const response = await fetch(API_URL);
    const leads = await response.json();

    leadsTableBody.innerHTML = '';

    // Loop through all leads and create table rows

    leads.forEach(lead => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${lead.id}</td>
            <td>${lead.name}</td>
            <td>${lead.contact}</td>
            <td>${lead.status}</td>
            <td>${lead.notes || ''}</td>
            <td>${lead.source || ''}</td>
            <td>
            <button onclick="editLead(${lead.id})">Edit Lead</button>
            <button onclick="deleteLead(${lead.id})">Remove</button>
            </td>
        `;
        leadsTableBody.appendChild(row);
    });
}

// Fetch leads when page loads

fetchLeads();

//Hanle form submission: stop page refresh, send new lead data to backend, and refresh the table

leadForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // stop page refresh

    const newLead = {
        name: document.getElementById('name').value,
        contact: document.getElementById('contact').value,
        status: document.getElementById('status').value || 'New',
        notes: document.getElementById('notes').value,
        source: document.getElementById('source').value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newLead)
    });

    leadForm.reset();
    fetchLeads(); // refresh table
});

async function editLead(id) {
    const newName = prompt('Enter new name:');
    const newContact = prompt('Enter new contact:');
    const newStatus = prompt('Enter status (New, Contacted, Interested, Converted, Rejected):');

    const updatedLead = { 
        name: newName, 
        contact: newContact, 
        status: newStatus 
    };

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedLead)
    });

    fetchLeads(); // reload updated data
}

//Delete a lead by ID after confirming from user

async function deleteLead(id){
    if(confirm('Are you sure you want to delete this lead?')) {
       await fetch(`${API_URL}/${id}`, {method: 'DELETE'});
       
       fetchLeads(); //refresh table after deletion
    }
function clearForm() {
    document.getElementById("leadForm").reset();
}

}