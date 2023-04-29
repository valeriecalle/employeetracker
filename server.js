const connection = require("./conector/connection");

// const mysql = require('mysql2');
const inquirer = require('inquirer');
require("console.table");

console.log("abierta")

console.log('\n')

//Process Main Menu
function startApp() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?\n",
      choices: [
        "View All Employee",
        "View All roles",
        "View All Departments",
        "Add Employee",
        "Add role",
        "Add department",
        "Update Employee Role",
        "Quit"
      ]
    })

    //Process Select options
    .then(function (answer) {
      switch (answer.action) {

        case "View All Employee":
          viewEmployees();
          break;

        case "View All roles":
          viewAllRoles();
          break;

        case "View All Departments":
          viewAllDept();
          break;


        case "Add Employee":
          addEmployees();
          break;

        case "Add role":
          addRole();
          break;

        case "Add department":
          addDept();
          break;

        case "Update Employee Role":
          updateEmployeesRole();
          break;

        case "Quit":
          console.log("Logout Corporation Valerie!")
          process.exit();
      }
    });
}
startApp();


// Process view employees
const viewEmployees = () => {
  console.log("hello")
  let sql = `SELECT e.id, 
                e.first_name, 
                e.last_name,
                r.title, d.department_name,
                r.salary, m.first_name as manager
                FROM employees as e  inner join role as r on (e.role_id=r.id) 
                inner join departments as d on (e.department_id=d.id)
                left join employees as m on (m.manager_id=e.id)
                ORDER BY e.id ASC`;

  connection.query(sql, function (err, query) {
    console.log(err)
    console.table(query);
    startApp();
  });
}


// Process View All Roles

const viewAllRoles = () => {
  console.log("hello")
  let sql = `SELECT role.id, 
                  role.title
                  FROM role
                  ORDER BY role.id ASC`;

  connection.query(sql, function (err, query) {
    console.log(err)
    console.table(query);
    startApp();
  });
}


// Process View All Departments

const viewAllDept = () => {
  console.log("hello")
  let sql = `SELECT departments.id, 
                department_name
                FROM departments
                ORDER BY departments.id ASC`;

  connection.query(sql, function (err, query) {
    console.log(err)
    console.table(query);
    startApp();
  });
}

// Process Add Employee

const addEmployees = () => {
  console.log("hello")
 
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "firstname"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "lastname"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "rolid"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerid"
      },
      {
        type: "input",
        message: "What is the department id?",
        name: "dptoid"
      }


    ])
    .then(function(answer) {

      
      connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) VALUES (?, ?, ?, ?, ?)",
       [answer.firstname, answer.lastname, answer.rolid, answer.managerid, answer.dptoid], function(err, res) {
        console.log(err)
        console.table(res);
        startApp();
      });
    });
}

// Process Add Role

const addRole = () => {
  console.log("Proceso para adicionar Rol")

  inquirer
  .prompt([
    {
      type: "input",
      message: "What's the name of the role?",
      name: "rolename"
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "salaryT"
    },
    {
      type: "input",
      message: "What is the department id number?",
      name: "deptid"
    }
  ])
  .then(function(answer) {


    connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.rolename, answer.salaryT, answer.deptid], function(err, res) {
      console.log(err)
      console.table(res);
      startApp();
    });
  });



 
}


//Process Add Departments 

const addDept = () => {
  console.log("Proceso addionar departamento")

    inquirer.prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "dptoname"

    })

  .then(function (answer) {
    connection.query("INSERT INTO departments (department_name) VALUES (?)", [answer.dptoname], function (err, res) {
    console.log(err)
    console.table(res);
    startApp();
      });
    });
}

//Process update employee role

const updateEmployeesRole = () => {
  console.log("hello")
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "updateemp"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updaterole"
      }
    ])
    .then(function(answer) {
       `INSERT INTO department (name) VALUES ("${answer.deptName}")`
       `'UPDATE employees SET role_id=${answer.updateRole} WHERE first_name= ${answer.eeUpdate}`;
      

      connection.query('UPDATE employees SET role_id=? WHERE first_name= ?',[answer.updaterole, answer.updateemp],function(err, res) {
         console.log(err)
        console.table(res);
        startApp();
      });
    });
}