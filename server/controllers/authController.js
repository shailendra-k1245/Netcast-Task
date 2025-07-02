const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const SECRET_KEY = 'jwt_secret';

const register = (req, res) => {
  const { name, email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ msg: 'DB Error',err });
    if (results.length > 0) return res.status(400).json({ msg: 'Email already exists' });

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ msg: 'Insert Failed' });
        res.status(201).json({ msg: 'User Registered' });
      }
    );
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0)
      return res.status(401).json({ msg: 'Invalid email or password' });

    const user = results[0];
    const match = bcrypt.compareSync(password, user.password);
    if (!match) return res.status(401).json({ msg: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  });
};

const getProfile = (req, res) => {
  db.query('SELECT id, name, email FROM users WHERE id = ?', [req.user.id], (err, results) => {
    if (err || results.length === 0)
      return res.status(404).json({ msg: 'User not found' });
    res.json(results[0]);
  });
};


module.exports = {
  register,
  login,
  getProfile,
};
