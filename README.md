# Contacts Management

## Description
This project is a Node.js-based REST API that enables CRUD operations for managing contacts using Firebase Firestore as the database. The API is built using Express.js, and it provides endpoints to retrieve, add, and delete contacts. It utilizes Firebase Admin SDK for database interactions and has environment-based configuration for secure key management.

A React frontend is used for managing contacts, featuring a Material-UI-based table and form interface to add, delete, and display contacts.

## Features
- Retrieve all contacts
- Add a new contact (with validation to prevent duplicates)
- Delete a contact by ID
- Interactive React frontend with Material UI for managing contacts

---

## Setup Instructions

### Prerequisites
- Node.js (>=14.x)
- npm (>=6.x)
- Firebase project with Firestore database enabled
- Firebase Admin SDK JSON configuration file
- `.env` file containing Firebase credentials and server configurations

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```
PORT=3000
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="your-private-key"
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-client-x509-cert-url
FIREBASE_UNIVERSE_DOMAIN=googleapis.com
```

### Backend Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/contact-manager.git
   cd contact-manager
   ```

2. Install backend dependencies:
   ```bash
   npm install
   ```

3. Add Firebase Admin SDK credentials:
   Place your Firebase Admin SDK JSON configuration in the root directory or use the `.env` file to configure credentials dynamically as shown in the code.

4. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on the port specified in the `.env` file or default to `3000`.

### Frontend Installation

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install frontend dependencies:
   ```bash
   npm install
   ```

3. Start the React app:
   ```bash
   npm start
   ```

   The app will run on `http://localhost:3000` (or the next available port if the backend is running).

---

## Folder Structure
```
contact-manager/
├── backend/
│   ├── routes/
│   │   └── contacts.js          # Express route handlers for API endpoints
│   ├── .env                     # Environment variables for Firebase 
│   ├── server.js                # Main server file
│   └── package.json             # Backend dependencies and scripts
├── frontend/
│   ├── src/
│   │   ├── apis/
│   │   │   └── contact.js       # API functions for fetching and managing 
│   │   ├── components/
│   │   │   └── AddContactForm.js # Form component for adding contacts
│   │   ├── App.js               # Main React component
│   │   ├── App.css              # Styles for the app
│   │   └── index.js             # React entry point
│   ├── package.json             # Frontend dependencies and scripts
├── README.md                    # Documentation
```

---

## API Endpoints

### Base URL
```
http://localhost:3000/api/contacts
```

### 1. Get All Contacts
**Endpoint:** `GET /`

**Response:**
```json
[
  {
    "id": "contactId",
    "name": "John Doe",
    "email": "john@example.com"
  },
]
```

### 2. Add a New Contact
**Endpoint:** `POST /add`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "id": "newContactId",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### 3. Delete a Contact
**Endpoint:** `DELETE /delete/:id`

**Response:**
```json
{
  "message": "Contact deleted successfully"
}
```

---

## Frontend Logic

### Main Components

1. **App.js**
   - Manages state for `contacts` and `newContact`.
   - Fetches contacts using `getContacts` from `contact.js`.
   - Passes state and handlers to child components like `AddContactForm`.

2. **AddContactForm.js**
   - Displays a form to input a new contact.
   - Validates form fields before sending the contact to the backend using `addContact`.
   - Updates the `contacts` state upon successful addition.

3. **MaterialReactTable**
   - Displays contacts in a table with pagination and search.
   - Provides delete functionality using a row action menu.

### Key API Functions

1. **getContacts**
   - Fetches all contacts from the backend.

2. **addContact**
   - Sends a POST request to add a new contact.

3. **deleteContact**
   - Sends a DELETE request to remove a contact by ID.

---

## Design Approach

### Key Design Decisions
1. **Frontend and Backend Separation:**
   - Backend serves as the API, while the frontend manages user interaction.

2. **Reusable Components:**
   - Modularized the form and table components for easier maintenance and scalability.

3. **Material-UI Integration:**
   - Used Material-UI components for a polished and responsive UI.

4. **State Management:**
   - Local state (`useState`) is used for simplicity, avoiding additional complexity from global state management tools.

### Trade-offs
- **Error Handling:** Currently basic; can be expanded to include detailed user feedback.
- **Scalability:** Frontend and backend could use authentication for secure operations.

---

## Future Enhancements
- Implement update functionality for contacts.
- Add pagination for retrieving large datasets in the backend.
- Integrate authentication for secure access to endpoints.

---

## Running Tests
To be implemented in the next iteration.

---

## License
This project is licensed under the MIT License. Feel free to use and modify it as per your needs.
