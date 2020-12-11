var mysql = require("mysql2");
var inquirer = require("inquirer");
const consoleTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    // Your port; if not 3306
    port: 3306,
    // Username
    user: "root",
    // Your password
    password: "password",
    database: "employee_DB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    trackerStart();
});

function trackerStart() {
  inquirer
  .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
          "Work with Departments",
          "Work with Roles",
          "Work with Employees"
      ]
  }).then(function (res) {
      switch (res.action) {
          case "Work with Departments": {
              inquirer
                  .prompt({
                      name: "action",
                      type: "list",
                      message: "What would you like to do with departments?",
                      choices: [
                          "View All Departments",
                          "Add a Department",
                          "Delete a Department"
                      ]
                  }).then(function (res2) {
                      switch (res2.action) {
                          case "View All Departments":
                              viewDepartments();
                              break;
                          case "Add a Department":
                              addDepartments();
                              break;
                          case "Delete a Department":
                              deleteDepartments();
                              break;
                      }
                  })
          }
              break;
          case "Work with Roles": {
              inquirer
                  .prompt({
                      name: "action",
                      type: "list",
                      message: "What would you like to do with roles?",
                      choices: [
                          "View All Roles",
                          "Add a Role",
                          "Delete a Role"
                      ]
                  }).then(function (res3) {
                      switch (res3.action) {
                          case "View All Roles":
                              viewRoles();
                              break;
                          case "Add a Role":
                              addRole();
                              break;
                          case "Delete a Role":
                              deleteRole()
                              break;
                      }
                  })
          }
              break;
          case "Work with Employees": {
              inquirer
                  .prompt({
                      name: "action",
                      type: "list",
                      message: "What would you like to do with Employees?",
                      choices: [
                          "View All Employees",
                          "View Employees by Department",
                          "Add an Employee",
                          "Update Employee Role",
                          "Delete an Employee"
                      ]
                  }).then(function (res4) {
                      switch (res4.action) {
                          case "View All Employees":
                              viewEmployees()
                              break;
                              case "View Employees by Department":
                              employeeByDept()
                              break;
                          case "Add an Employee":
                              addEmployee()
                              break;
                          case "Update Employee Role":
                              updateEmpRole();
                              break;
                          case "Delete an Employee":
                              deleteEmployee()
                              break;
                      }
                  })
          }
              break;
      }
  })
}