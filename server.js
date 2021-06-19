//Dependencies
const inquirer = require("inquirer");
const table = require("console.table");
const mysql = require("mysql");


//DB connect
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_trackerDB"
});

connection.connect (function (err){
    if (err) throw err;
    appStart();
});

function appStart(){
    inquirer.prompt({
        type: 'list',
        name: 'startMenu',
        message: "What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee Role",
            "Exit Program"
        ]
    })
    .then(function (answer) {
        switch (answer.startMenu) {
            case "View All Departments":
            viewDepts();
            break;

            case "View All Roles":
            viewRoles();
            break;

            case "View All Employees":
            viewEmp();
            break;

            case "Add Department":
            addDept();
            break;

            case "Add Role":
            addRole();
            break;

            case "Add Employee":
            addEmp();
            break;

            case "Update Employee Role":
            updateEmpRole();
            break;

            case "Exit Program":
            connection.end();
            break;
        }
    });
};

function viewDepts(){
    const query = "SELECT * FROM dept"
    connection.query(query, function (err, res){
        console.table(res);
        appStart();
    })
};

function viewRoles(){
    const query = "SELECT * FROM role"
    connection.query(query, function (err, res){
        console.table(res);
        appStart();
    })
};

function viewEmp(){
    const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
    connection.query(query, function (err, res){
        console.table(res);
        appStart();
    })
};

function addDept(){
    inquirer.prompt({
        type: "input",
        message: "Enter the new department name.",
        name: "newDept"
    })
    .then(function (res){
        const newDept = res.newDept;
        const query = `INSERT INTO department (department_name) VALUES ("${newDept}")`;
        connection.query(query, function (err, res){
            if (err) {
                throw err;
            }
            console.table(res);
            appStart();
        })
    })
};

function addRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter Employee Title",
            name: "empTitle"
        },
        {
            type: "input",
            message: "Enter Employee Department ID",
            name: "empDept"
        },
        {
            type: "input",
            message: "Enter Employee Salary",
            name: "empSalary"
        }
    ])
    .then(function (res){
        const title = res.empTitle;
        const deptId = res.empDept;
        const salary = res.empSalary;
        const query = `INSERT INTO role (title, department_id, salary) VALUES ("${title}", "${deptId}", "${salary}")`;
        connection.query(query, function (err, res){
            if (err){
                throw err;
            }
            console.table(res);
            appStart();
        })
    })
};

function addEmp(){
    inquirer.prompt([
        {
            type: "input",
            message: "Enter First Name",
            name: "firstName"
        },
        {
            type: "input",
            message: "Enter Last Name",
            name: "lastName"
        },
        {
            type: "input",
            message: "Enter Employee ID",
            name: "empID"
        },
        {
            type: "input",
            message: "Enter Manager ID",
            name: "manID"
        }
    ])
    .then(function(res){
        const firstName = res.firstName;
        const lastName = res.lastName;
        const empID = res.empID;
        const manID = res.manID;
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstName}", "${lastName}", "${empID}", "${manID}")`;
        connection.query(query, function (err, res){
            if (err){
                throw err;
            }
            console.table(res);
            appStart();
        })
    })
}

function updateEmpRole(){
    inquirer.prompt([
        {
            type: "input",
            message: "Which employee ID do you want to update?",
            name: "updateID"
        },
        {
            type: "input",
            message: "Enter new ID",
            name: "newID"
        }
    ])
    .then(function(res){
        const updateID = res.updateID;
        const newID = res.newID;
        const query = `UPDATE employee SET role_id = "${newID}" WHERE id = "${updateID}"`;
        connection.query(query, function (err, res){
            if (err) {
                throw err;
            }
            console.table(res);
            appStart();
        })
    })
}