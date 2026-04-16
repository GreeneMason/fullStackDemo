const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fullstack_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test database connection
pool.getConnection()
  .then(conn => {
    console.log('✓ Connected to MySQL database');
    conn.release();
  })
  .catch(err => {
    console.error('✗ Database connection failed:', err.message);
    console.log('Make sure MySQL is running and the database is created.');
  });

// Routes
app.get('/api/greetings', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM greetings');
    connection.release();
    res.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/greetings', async (req, res) => {
  const { message } = req.body;
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query('INSERT INTO greetings (message) VALUES (?)', [message]);
    connection.release();
    res.json({ id: result.insertId, message });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
