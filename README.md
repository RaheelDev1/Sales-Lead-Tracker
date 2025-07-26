# Sales Lead Management & Tracking System
For Dowling Property, Kilcullen

This is a simple CRUD application to manage and track sales leads.

## Tech Stack
- Node.js
- Express.js
- JSON File as Database
- HTML, CSS, JavaScript (Frontend)

## API Endpoints

```
1. Get All Leads
GET /leads  
Response:  
[
  {
    "id": 1,
    "name": "John Doe",
    "contact": "john@example.com",
    "status": "Interested",
    "notes": "Wants to view property next week",
    "source": "Phone Call"
  }
]

2. Create New Lead
POST /leads  
Request Body:  
{
  "name": "Jane Smith",
  "contact": "jane@example.com",
  "status": "New",
  "notes": "First-time buyer",
  "source": "Website"
}

3. Update Lead
PUT /leads/:id  
Request Body:  
{
  "name": "Jane Smith",
  "contact": "jane@newmail.com",
  "status": "Contacted",
  "notes": "Call scheduled for Monday"
}

4. Delete Lead
DELETE /leads/:id
```
## Statuses
Allowed values for status:
- New
- Contacted
- Interested
- Converted
- Rejected

## Future Features
- Search and filter leads
- Frontend interface for managing leads
- Dashboard showing status counts

## Author
Raheel Abbas
