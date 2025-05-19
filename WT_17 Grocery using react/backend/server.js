const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'siddhi@9',
  database: 'grocerydb'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Example route
app.get('/', (req, res) => {
  res.send('Grocery Shop Backend Running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// Registration endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password, address } = req.body;
  if (!username || !email || !password || !address) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO Consumer (username, email, password, address) VALUES (?, ?, ?, ?)';
  db.query(sql, [username, email, password, address], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ message: 'Username or email already exists' });
      }
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
});


// Login endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password required' });
  }

  const sql = 'SELECT * FROM Consumer WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.status(200).json({ message: 'Login successful', user: results[0] });
  });
});


// Get all items endpoint
app.get('/api/items', (req, res) => {
  const sql = 'SELECT * FROM Items';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ message: 'Database error', error: err });
    res.status(200).json(results);
  });
});


