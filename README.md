# Contacts  Manager API

## Description
This project is a Node.js-based REST API that enables CRUD operations for managing contacts using Firebase Firestore as the database. The API is built using Express.js, and it provides endpoints to retrieve, add, and delete contacts. It utilizes Firebase Admin SDK for database interactions and has environment-based configuration for secure key management.

## Features
- Retrieve all contacts
- Add a new contact (with validation to prevent duplicates)
- Delete a contact by ID

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

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/contacts-manager.git
   cd contacts-manager
   ```
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
   ```

4. Add Firebase Admin SDK credentials:
   Place your Firebase Admin SDK JSON configuration in the root directory or use the `.env` file to configure credentials dynamically as shown in the code.

5. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on the port specified in the `.env` file or default to `3000`.

6. Start the frontend:
   ```bash
   npm start
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

## Design Approach

### Key Design Decisions
1. **Firebase Integration:**
   - Firebase Admin SDK is used for Firestore operations, ensuring secure and efficient database interactions.
   - Dynamic credential configuration via environment variables for improved security.

2. **Middleware for Database Access:**
   - A custom middleware injects the Firestore `db` instance into each request for easy access in route handlers.

3. **Validation:**
   - API validates input data for required fields (`name` and `email`) before processing requests.
   - Duplicate checks are performed when adding new contacts.

### Trade-offs
- **Realtime Features:** Chose Firestore for simplicity over alternatives like Firebase Realtime Database since Firestore offers structured queries and better scalability.
- **Error Handling:** Basic error responses are implemented; could be extended with more detailed error codes and messages.

---

## Future Enhancements
- Implement update functionality for contacts.
- Add pagination for retrieving large datasets.
- Improve error handling and logging for better debugging.
- Integrate authentication for secure access to endpoints.

---

## Running Tests
To be implemented in the next iteration.

---
