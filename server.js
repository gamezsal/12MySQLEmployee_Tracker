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
  }).then(function (answer) {
      switch (answer.action) {
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
                  }).then(function (answer1) {
                      switch (answer1.action) {
                          case "View All Departments":
                              viewDepartment();
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
                  }).then(function (answer2) {
                      switch (answer2.action) {
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
                  }).then(function (answer3) {
                      switch (answer3.action) {
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


//Add and View Departments
function addDepartments() {

};

function viewDepartment() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
    })

};

//Add and View Roles
function addRole() {

};

function viewRoles() {

};

//Add and View Employees
function addEmployee() {

};
function viewEmployees() {

}


//update Employees