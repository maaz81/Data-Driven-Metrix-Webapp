const express = require('express');
const getDBConnection = require('../config/db');
const router = express.Router();
const authenticateToken = require('../middlewares/auth');

let db;
getDBConnection().then((conn) => {
  db = conn;
}).catch((err) => {
  console.error('❌ DB not ready:', err);
});

// Middleware + Routes
router.use(authenticateToken);

router.get('/', (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not connected yet' });

  db.query('SELECT * FROM campaigns', (err, results) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not connected yet' });

  const { name, date, impressions, clicks, conversions } = req.body;
  db.query(
    'INSERT INTO campaigns (name, date, impressions, clicks, conversions) VALUES (?, ?, ?, ?, ?)',
    [name, date, impressions, clicks, conversions],
    (err) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      res.json({ message: 'Campaign created' });
    }
  );
});

router.put('/:id', (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not connected yet' });

  const { name, date, impressions, clicks, conversions } = req.body;

  db.query(
    'UPDATE campaigns SET name=?, date=?, impressions=?, clicks=?, conversions=? WHERE id=?',
    [name, date, impressions, clicks, conversions, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Update failed' });
      res.json({ message: 'Campaign updated' });
    }
  );
});

// Delete campaign
router.delete('/:id', (req, res) => {
  if (!db) return res.status(500).json({ error: 'DB not connected yet' });

  db.query('DELETE FROM campaigns WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: 'Delete failed' });
    res.json({ message: 'Campaign deleted' });
  });
});

module.exports = router;
