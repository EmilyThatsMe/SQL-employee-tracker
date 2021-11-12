// dependencies
// ======================================
const mysql = require('mysql2');

// Connect to database
// ======================================
const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: 'Mootoo2!',
      database: 'employeetracker'
    },
    console.log('Connected to the employee database.')
  );

  // Module exports
// =========================================
  module.exports = db;