const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'assignment_user',          // your mysql user
  password: 'password123',  // your mysql password
  database: 'testdb'     // your database
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected');
});

module.exports = db;
