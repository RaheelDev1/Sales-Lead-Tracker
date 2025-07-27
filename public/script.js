const API_URL = 'http://localhost:3000/leads';
const leadsTableBody = document.querySelector('#leadsTable tbody');
const leadForm = document.getElementById('leadForm');

async function fetchLeads() {
    const response = await fetch(API_URL);
    const leads = await response.json();

    leadsTableBody.innerHTML = '';
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
                <button onclick="editLead(${lead.id})">Edit</button>
                <button onclick="deleteLead(${lead.id})">Delete</button>
            </td>
        `;
        leadsTableBody.appendChild(row);
    });
}

// Fetch leads when page loads
fetchLeads();
