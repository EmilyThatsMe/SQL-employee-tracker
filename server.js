// Dependencies
// =========================================
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const db = require('./db/connection');
//const apiRoutes = require('./routes/apiRoutes')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
// =========================================
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.use('/api', apiRoutes);
// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });

  // Start server afer DB commection
  // =======================================
  db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });

  // Start app
  // ========================================
  function startApp() {
      inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View all departments",
                "View all roles",
                "Add a department",
                "Add a role",
                "Add an employee",
                "Update an employee role"
            ]
            // promise
        })
  };

  startApp();