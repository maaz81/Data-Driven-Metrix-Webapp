const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getDBConnection = require('../config/db'); // import the function
const router = express.Router();

// Ensure connection is ready
let connection;
getDBConnection().then((conn) => {
  connection = conn;
}).catch((err) => {
  console.error('❌ Failed to initialize DB in auth route:', err);
});

router.post('/signup', async (req, res) => {
  if (!connection) return res.status(500).json({ error: 'Database not connected yet' });

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  connection.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err) => {
    if (err) return res.status(500).json({ error: 'User already exists or DB error' });
    res.json({ message: 'User created' });
  });
});

router.post('/login', (req, res) => {
  if (!connection) return res.status(500).json({ error: 'Database not connected yet' });

  const { email, password } = req.body;
  connection.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, results[0].password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});


router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Lax', 
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Logged out successfully' });
});


module.exports = router;
