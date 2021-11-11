const db = require('./db/connection');
const express = require('express');
  
  // Shows departments only, without employees
  function viewDepartments() {
    var deparmentsTable = connection.query("SELECT * FROM departments;",
  
  
        function (error, departmentsTable) {
            if (error) throw error
            console.table(deparmentsTable);
        })
  }

  // "Add Department"
  function addDepartment(department) {
  
    var department = connection.query(
        "INSERT INTO departments SET department_name = ?",
        [department],
        function (error, department) {
            if (error) throw error
        })
  }