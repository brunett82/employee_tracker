//Dependencies
const inquirer = require("inquirer");
const { start } = require("repl");


//DB connect
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "tracker_db"
});

connection.connect (function (err){
    if (err) throw err;
    start();
});

function start(){
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
};

function viewDepts(){
    const sqlQuery = "SELECT * FROM dept"
    connection.query(sqlQuery, function (err, res){
        console.table(res);
        start();
    })
};

function viewRoles(){
    const sqlQuery = "SELECT * FROM role"
    connection.query(sqlQuery, function (err, res){
        console.table(res);
        start();
    })
};

function viewEmp(){
    const sqlQuery = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id"
    connection.query(sqlQuery, function (err, res){
        console.table(res);
        start();
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
        const sqlQuery = `INSERT INTO department (department_name) VALUES ("${newDept})`;
        connection.query(sqlQuery, function (err, res){
            if (err) {
                throw err;
            }
            console.table(res);
            start();
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
        const sqlQuery = `INSERT INTO role (title, department_id, salary) VALUES ("${title}", "${deptId}", "${salary}")`;
        connection.query(sqlQuery, function (err, res){
            if (err){
                throw err;
            }
            console.table(res);
            start();
        })
    })
};

