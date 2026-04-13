# Full Stack Demo - Hello World App

A basic full stack web application with MySQL, Node.js backend, and React frontend.

## Architecture

- **Database**: MySQL - stores greeting messages
- **Backend**: Node.js + Express - provides REST API
- **Frontend**: React - displays messages from the database

## Prerequisites

- Node.js (v14+)
- MySQL Server running
- npm

## Setup Instructions

### 1. Database Setup

1. Open MySQL client or MySQL Workbench
2. Run the SQL commands in `database/schema.sql`:
   ```sql
   CREATE DATABASE IF NOT EXISTS fullstack_db;
   USE fullstack_db;
   CREATE TABLE IF NOT EXISTS greetings (
     id INT AUTO_INCREMENT PRIMARY KEY,
     message VARCHAR(255) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   INSERT INTO greetings (message) VALUES ('Hello, World!');
   INSERT INTO greetings (message) VALUES ('Welcome to Full Stack Development!');
   INSERT INTO greetings (message) VALUES ('MySQL, Node.js, and React are working together!');
   ```

**Default credentials used by the backend:**
- Host: localhost
- User: root
- Password: root
- Database: fullstack_db

If your MySQL uses different credentials, update `backend/server.js`.

### 2. Backend Setup

```bash
cd backend
npm install
npm start
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

React will open in your browser at `http://localhost:3000`

## API Endpoints

- `GET /api/greetings` - Fetch all greetings from the database
- `POST /api/greetings` - Add a new greeting message

## Data Flow

1. React frontend requests `/api/greetings` from the Express backend
2. Express backend queries the MySQL database
3. Database returns the greeting messages
4. Express sends JSON response to React
5. React displays the messages in the browser

## Troubleshooting

### "Cannot connect to MySQL"
- Ensure MySQL Server is running
- Verify username/password in `backend/server.js` (default: root/root)
- Check database name is `fullstack_db`

### "Port 5000 already in use"
- Change the PORT variable in `backend/server.js`

### "React app won't start"
- Delete `frontend/node_modules` and `frontend/package-lock.json`
- Run `npm install` and `npm start` again
