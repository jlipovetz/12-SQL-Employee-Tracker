const express = require('express');
const inquirer = require('inquirer')
const mysql = require('mysql2');
const { last } = require('rxjs');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'kimba',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

const employee = []

const listOfOptions = ["View All Employees", "View Employees by Manager", "View All Departments", "View All Roles", "Add A Department", "Add A Role", "Add An Employee", "Update Employee Role"]

function getAllEmployees() {
  db.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, employee.manager_id FROM employee JOIN role WHERE employee.role_id = role.id', function (err, results) {
    console.table(results)
    return Start();
  });
}

function getEmployeesByManger() {
  db.query('SELECT * FROM employee WHERE employee.manager_id = 6', function (err, results) {
    console.table(results)
    return Start();
  });
}

function getAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    console.table(results)
    return Start();
  });
}

function getAllRoles() {
  db.query('SELECT role.id, role.title, role.salary, role.department_id, department.department_name FROM role JOIN department ON role.department_id = department.id', function (err, results) {
    console.table(results)
    return Start();
  });
}

function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department?",
      name: "department"
    }
  ]).then(response => {
    let name = response.department
    db.query(`INSERT INTO department (department_name) VALUES ("${name}")`, function (err, results) {
      getAllDepartments()
      return Start();
    });
  });
}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the title of the role?",
      name: "title"
    },
    {
      type: "input",
      message: "What is the salary of the role?",
      name: "salary"
    },
    {
      type: "input",
      message: "What is the department id of the role's department?",
      name: "department"
    },
  ]).then(response => {
    let title = response.title
    let salary = response.salary
    let department = response.department
    db.query(`INSERT INTO role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department} )`, function (err, results) {
      getAllRoles()
      return Start();
    });
  });
}

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the first name of the employee?",
      name: "firstName"
    },
    {
      type: "input",
      message: "What is the last name of the employee?",
      name: "lastName"
    },
    {
      type: "input",
      message: "What is the id of the employees role?",
      name: "role"
    },
    {
      type: "input",
      message: "What is the id of the employee's manager?",
      name: "manager"
    },
  ]).then(response => {
    let first = response.firstName
    let last = response.lastName
    let role = response.role
    let manager = response.manager
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", ${role}, ${manager})`, function (err, results) {
      getAllEmployees()
      return Start();
    });
  });
}

function updateEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the first name of the employee you would like to update?",
      name: "firstName"
    },
    {
      type: "input",
      message: "What is the last name of the employee you would like to update?",
      name: "lastName"
    },
    {
      type: "input",
      message: "What is the role id you would like to give them?",
      name: "role"
    },
  ]).then(response => {
    let first = response.firstName
    let last = response.lastName
    let role = response.role
    db.query(`UPDATE employee SET role_id = ${role} WHERE first_name = "${first}" AND last_name = "${last}"`, function (err, results) {
      getAllEmployees()
      return Start();
    });
  });
}


function Start() {
  inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "start",
      choices: listOfOptions
    }
  ]).then(response => {
    if (response.start === "View All Employees")
      return getAllEmployees()
    else if (response.start === "View Employees by Manager")
      return getEmployeesByManger()
    else if (response.start === "View All Departments")
      return getAllDepartments()
    else if (response.start === "View All Roles")
      return getAllRoles()
    else if (response.start === "Add A Department")
      return addDepartment()
    else if (response.start === "Add A Role")
      return addRole()
    else if (response.start === "Add An Employee")
      return addEmployee()
    else if (response.start === "Update Employee Role")
      return updateEmployee()
  })
}

Start()