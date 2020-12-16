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
    startTracker();
});

function startTracker() {
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
                              employeesByDept();
                              break;
                          case "Add an Employee":
                              addEmployee();
                              break;
                          case "Update Employee Role":
                              updateEmpRole();
                              break;
                          case "Delete an Employee":
                              deleteEmployees()
                              break;
                      }
                  })
          }
              break;
      }
  })
}


//Add, View and Delete Departments
function addDepartments() {
    inquirer
        .prompt({
            name: "aName",
            type: "input",
            message: "What is the name of the department?"
        }).then(function (response){
            var sqlQuery = "INSERT INTO departments SET ?"
            connection.query(sqlQuery, {name: response.aName }, function (err, res){
                if (err) throw err;
                console.log(res.rowsAffected + " Department Added!\n");
                viewDepartments();
            })
        })

};

function deleteDepartments() {
    var viewDept;
    connection.query("SELECT name FROM departments", function (err, res){
        if (err) throw err;
        var array = res.map(function (obj){
            return obj.name;
        });
        viewDept = array;
        console.log(viewDept)
        inquirer
            .prompt({
                name: "dName",
                type: "list",
                message: "What is the name of the department you would like to delete?",
                choices: viewDept
            }).then(function (response){
                console.log(response.dname)
                var sqlQuery = "DELETE FROM departments WHERE ?"
                connection.query(sqlQuery, { name: response.dname }, function (err, res){
                    if (err) throw err;
                    console.log(res.rowsAffected + " Department deleted!\n");
                    viewDepartments();
                });
            });
    })
};

function viewDepartments() {
    connection.query("SELECT * FROM departments", function (err, res) {
        if (err) throw err;
        console.table(res);
        startOver();
    })

};



//Add, Delete and View Roles
function addRole() {
    var currentRole;
    connection.query("SELECT name, id FROM departments", function (err, res) {
        if (err) throw err;
        var array = res.map(function (obj) {
            return { name: obj.name, value: obj.id };
        });
        currentRole = array;
        inquirer
            .prompt([{
                name:  "rName",
                type: "input",
                message: "What is the name of the role?"
            },
            {
                name: "rDept",
                type: "list",
                message: "Which department does this role belong to?",
                choices: currentRole

            },
            {
                name: "rSalary",
                type: "input",
                message: "What is the salary on this role?"
            }
        ]).then(function (response){
            var sqlQuery = "INSERT INTO roles SET ?"
            connection.query(sqlQuery, { title: response.rName, salary: response.rSalary, department_id: response.rDept }, function (err, res){
                if (err) throw err;
                console.log(res.rowsAffected + " Role Added!\n");
                viewRoles();
            })
        })
    })
};

function deleteRole(){
    var viewRole;
    connection.query("SELECT title FROM roles", function (err, res){
        if (err) throw err;
        var array = res.map(function (obj){
            return obj.title;
        });
        viewRole = array;
        console.log(viewRole)
        inquirer
            .prompt({
                name: "dRole",
                type: "list",
                message: "What is the name of the role you would like to delete?",
                choices: viewRole
            }).then(function (response){
                console.log(response.dRole)
                var sqlQuery = "DELETE FROM roles WHERE ?"
                connection.query(sqlQuery, { title: response.dRole }, function (err, res){
                    if (err) throw err;
                    console.log(res.rowsAffected + " Role deleted!\n");
                    viewRoles();
                });
            });
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        startOver();
    })
};

//Add, Delete and View Employees
function addEmployee(employee) {
    connection.query("INSERT INTO employees SET ?", employee, function (err, res) {
        if (err) throw err;
        console.table(res);
    })   
};
function viewEmployees() {
    connection.query("SELECT * FROM employees", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
};

//Delete Employee
function deleteEmployees() {

};
// view employees by department
function employeesByDept() {

};
//update Employees
function updateEmpRole() {
    viewEmployees();
    connection.query("UPDATE ?  SET WHERE", function (err, res) {
        if (err) throw err;
        console.table(res);
    })
};

//Loop to Start Over
function startOver(){
    inquirer
        .prompt({
            name:  "over",
            type: "confirm",
            message: "Would you like to perform another action?"
        }).then(function(response){
            switch (response.over){
                case true:
                    startTracker();
                    break;
                case false:
                    console.log("Enjoy the rest of the day!")
                    connection.end();
            }
        })
}