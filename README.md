# Skill Swap Application

Skill Swap is a platform where users can exchange skills by offering what they know and requesting what they want to learn. It features user authentication, real-time notifications, swap requests, and chat functionality.

---

## Features

- User registration and login with JWT-based authentication  
- Profile creation with skills offered and skills wanted  
- Find matches based on complementary skills  
- Send and receive swap requests  
- Real-time notifications for new swap requests using Socket.IO  
- Accept, reject, and mark swaps as completed  
- Message exchange between matched users with real-time updates  
- Swap history page to track past swaps  
- Protected routes to secure user data  

---

## Technologies Used

- **Backend:** Node.js, Express.js, MongoDB, Mongoose  
- **Real-time:** Socket.IO  
- **Authentication:** JWT  
- **Frontend:** React.js, React Router, Axios, Tailwind CSS  
- **Environment variables management:** dotenv  

---

## Installation

### Clone the repository

```bash

git clone https://github.com/Snigdha-Sadhu/Skill-Swap.git
cd skill-swap

```
### Backend setup

```bash
cd server
npm install

```

### Create a .env file in the server folder and add your environment variables
```env
PORT=7000
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
CLIENT_URL=http://localhost:5173

```

### Start the backend server:
```bash
npm run dev
```
### Frontend setup
```bash
cd client
npm install
npm run dev

```

Open your browser and go to http://localhost:5173
to use the app.

---

## Usage

- Register a new account or log in with existing credentials
- Update your profile with skills you can offer and skills you want to learn
- Browse potential matches and send swap requests
- Receive real-time notifications when someone sends you a swap request
- Accept or reject swap requests
- Chat and exchange contact details with matched users
- View your swap history

----

## Folder Structure

/server - Backend Express API and Socket.IO server
/client - React frontend application

---


## API Endpoints

### Auth & Profile

| **Method** |  **Endpoint**         |  **Description**                                      |
| ---------- | -------------------   | ------------------------------------------------------|
|   POST     |   `/api/auth/signup`  |    Register a new user                                |
|   POST     |   `/api/auth/login`   |    Login and receive JWT token                        |
|   POST     |   `/api/auth/profile` |    Update user profile (protected)                    |
|   GET      |   `/api/auth/me`      |    Get current authenticated user profile (protected) |

---

### Match & Swap Requests

| **Method** | **Endpoint**                | **Description**                          |
| ---------- | --------------------------- | ---------------------------------------- |
|   GET      |   `/api/match/`             |   Get potential matches (protected)      |
|   POST     |   `/api/match/request`      |   Send a swap request (protected)        |
|   GET      |   `/api/match/received`     |   Get received swap requests (protected) |
|   GET      |   `/api/match/accepted`     |   Get accepted swaps (protected)         |
|   PATCH    |   `/api/match/request/:id`  |   Update swap request status (protected) |
|   PUT      |   `/api/match/accepted/:id` |   Mark swap as completed (protected)     |

---

### Messages

| **Method** | **Endpoint**            | **Description**                              |
| ---------- | ----------------------  | -------------------------------------------- |
|   POST     |   `/api/match/message`  |   Send a message to matched user (protected) |
|   GET      |   `/api/match/history`  |   Get chat history for a swap (protected)    |


## Real-time Communication

Socket.IO is used for:
   
- Registering online users and maintaining a list
- Emitting new swap request notifications
- Real-time chat message delivery
---

## Notes

- Authentication uses JWT stored in local storage and sent in Authorization headers
- Keep your JWT secret safe
- Update .env file with your own MongoDB connection and secrets
- Tailwind CSS is used for styling frontend components

   ---