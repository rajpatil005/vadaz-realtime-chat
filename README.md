# Vedaz Real-Time Chat Application

A real-time chat application built with React, Node.js, Express, Socket.io, and MongoDB. Users can join with a username or continue as a guest, send and receive messages instantly, and view previous messages after refreshing the application.

## Live Demo

**Frontend:** https://vadaz-realtime-chat.vercel.app/

**Backend API:** https://vadaz-realtime-chat.onrender.com/

## Features

* Real-time messaging using Socket.io
* Send and receive messages instantly
* Persistent chat history using MongoDB
* Message timestamps
* Username-based joining
* Guest login with automatically generated username
* Online user count
* Typing indicator
* Logout functionality
* Responsive chat interface
* REST API for sending and fetching messages
* Error handling for API and Socket.io operations

## Tech Stack

### Frontend

* React
* Vite
* Axios
* Socket.io Client
* CSS

### Backend

* Node.js
* Express.js
* Socket.io
* Mongoose

### Database

* MongoDB Atlas

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: MongoDB Atlas

## Project Structure

```text
vedaz-realtime-chat/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── socket/
│   │   └── ...
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── .env.example
│   └── server.js
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB Atlas account

## 1. Clone the Repository

```bash
git clone https://github.com/rajpatil005/vadaz-realtime-chat.git
cd vadaz-realtime-chat
```

## 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

The backend will run at:

```text
http://localhost:5000
```

## 3. Frontend Setup

Open another terminal:

```bash
cd client
npm install
```

Create a `.env` file inside the `client` directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Environment Variables

### Backend

| Variable      | Description                     |
| ------------- | ------------------------------- |
| `PORT`        | Port used by the Node.js server |
| `MONGODB_URI` | MongoDB Atlas connection string |

### Frontend

| Variable          | Description                  |
| ----------------- | ---------------------------- |
| `VITE_API_URL`    | Backend REST API URL         |
| `VITE_SOCKET_URL` | Backend Socket.io server URL |

Example frontend configuration:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

For production, these variables are configured in Vercel with the deployed Render backend URL.

## REST API

### Get Chat History

```http
GET /api/messages
```

Returns previously stored chat messages.

### Send Message

```http
POST /api/messages
```

Example request:

```json
{
  "username": "Raj",
  "text": "Hello!"
}
```

## Socket.io Events

The application uses Socket.io for real-time communication.

### Client → Server

```text
join_chat
send_message
typing
stop_typing
```

### Server → Client

```text
receive_message
online_users
user_typing
user_stop_typing
```

New messages are broadcast to connected users without requiring a page refresh.

## Design Decisions

### React + Vite

React was used to build a responsive and component-based chat interface. Vite provides a lightweight development and production build setup.

### REST API + Socket.io

REST APIs are used for persistent operations such as fetching chat history, while Socket.io handles real-time communication between connected clients.

This separates persistent data operations from real-time events.

### MongoDB

MongoDB was selected to persist messages so that chat history remains available after refreshing or reconnecting to the application.

### Username and Guest Access

A username can be provided when joining the chat. If the user does not provide one, the application generates a unique guest username automatically.

No real authentication system is required for this assignment.

## Assumptions

* The application uses a single shared chat room.
* All connected users participate in the same conversation.
* Username authentication is only for identification within the chat and is not intended as secure authentication.
* Messages are stored persistently in MongoDB.
* The application is designed as a demonstration/project assignment rather than a production-scale messaging platform.
* The free deployment services may temporarily sleep after periods of inactivity, which can cause a short delay when the application is accessed again.

## Error Handling

The application handles common API and Socket.io errors gracefully.

* Failed chat-history requests are logged on the client.
* Empty messages are prevented from being sent.
* Socket connections are cleaned up when users leave the chat.
* Typing events are stopped when the user stops typing or sends a message.

## Deployment

### Frontend

The React frontend is deployed using Vercel.

```text
https://vadaz-realtime-chat.vercel.app/
```

### Backend

The Node.js + Express + Socket.io backend is deployed using Render.

```text
https://vadaz-realtime-chat.onrender.com/
```

### Database

MongoDB Atlas is used for persistent message storage.

## Submission

**GitHub Repository:**
https://github.com/rajpatil005/vadaz-realtime-chat

**Live Application:**
https://vadaz-realtime-chat.vercel.app/

**Backend API:**
https://vadaz-realtime-chat.onrender.com/api/messages
