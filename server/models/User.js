const db = require('../config/db');

const User = {
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  },

  create: (name, email, hashedPassword, callback) => {
    db.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
      [name, email, hashedPassword], callback);
  }
};

module.exports = User;
