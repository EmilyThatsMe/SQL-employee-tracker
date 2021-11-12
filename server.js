// Dependencies
// =========================================
const inquirer = require('inquirer');
const fs = require('fs');
const express = require('express');
const db = require('./db/connection');
const { start } = require('repl');
//const utils = require('./utils/index');
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
  init();

  function init() {
    startApp();
  }

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
        }).then(res => {
          let choice = res.action;
          // Run functions based on choice
          switch(choice) {
            case "View all departments":
              viewDepartments();
              break;
            case "View all roles":
              viewRoles();
              break;
            case "View all employees":
              viewEmployees();
              break;
            case "Add a department":
              inquirer
              .prompt([
                {
                  name: "department",
                  type: "input",
                  message: "What is the department's name?"
                }
              ]).then(res => {
              addDepartment(res.department);
            });
              break;
            case "Add a role":
              addRole();
              break;
            case "Add an amployee":
              addEmployee();
              break;
            case "Add an employee role":
              addEmpRole();
              break;
            default:
              quit();
          }
        });
  };

  // Functions
  // =============================

// Shows departments only, without employees
function viewDepartments() {
  var depTable = db.query("SELECT * FROM departments;",


      function (error, depTable) {
          if (error) throw error
          console.table(depTable)
      })
}

// "Add Department"
function addDepartment(department) {

  var department = db.query(
      "INSERT INTO departments SET department_name = ?",
      [department],
      function (error, department) {
          if (error) throw error
      })

  viewDepartments();
}
