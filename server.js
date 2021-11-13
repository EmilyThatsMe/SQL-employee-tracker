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
              inquirer
              .prompt([
                {
                  name: "job_title",
                  type: "input",
                  message: "What is the job title of the role?"
                },
                {
                  name: "department",
                  type: "input",
                  message: "What job department is the role for?"
                },
                {
                  name: "salary",
                  type: "input",
                  message: "What is the salary for the role?"
                }
              ]).then(res => {
              addRole(res.job_title, res.department, res.salary);
            });
              break;
            case "Add an employee":
              inquirer
              .prompt([
                {
                  name: "first_name",
                  type: "input",
                  message: "What is the employee's first name?"
                },
                {
                  name: "last_name",
                  type: "input",
                  message: "What is the employee's last name?"
                },
                {
                  name: "department",
                  type: "input",
                  message: "What department does the employee work for?"
                },
                {
                  name: "salary",
                  type: "input",
                  message: "What is the salary of the employee?"
                },
                {
                  name: "managers",
                  type: "input",
                  message: "Who is the manager for this employee?"
                }
              ]).then(res => {
              addEmployee(res.first_name, res.last_name, res.department, res.salary, res.managers);
            });
              break;
            case "Add an employee role":
              addEmpRole();
              break;
          }
        });
  };

  // Functions
  // =============================

  // "View Employees"
function viewEmployees() {
  var empTable = db.query("SELECT * FROM employees;",

  function (error, empTable) {
    if (error) throw error
    console.table(empTable)
});
};


// "View Departments"
function viewDepartments() {
  var depTable = db.query("SELECT * FROM departments;",


      function (error, depTable) {
          if (error) throw error
          console.table(depTable)
      });
};

// "View Roles"
function viewRoles() {
  var roleTable = db.query("SELECT * FROM roles;",


      function (error, roleTable) {
          if (error) throw error
          console.table(roleTable)
      });
};

// "Add Department"
function addDepartment(department) {

  var department = db.query(
      "INSERT INTO departments SET department_name = ?",
      [department],
      function (error, department) {
          if (error) throw error
      });

  viewDepartments();
};

// "Add Roles"
function addRole(job_title, department, salary) {

  var role = db.query(
      "INSERT INTO roles SET job_title = ?, department = ?, salary = ?",
      [job_title, department, salary],
      function (error, role) {
          if (error) throw error
      })

  viewRoles();
};

// "Add Employees"
function addEmployee(first_name, last_name, department, salary, managers) {

  var employee = db.query(
      "INSERT INTO employees SET first_name = ?, last_name = ?, department = ?, salary = ?, managers = ?",
      [first_name, last_name, department, salary, managers],
      function (error, employee) {
          if (error) throw error
      })

  viewEmployees();
};
