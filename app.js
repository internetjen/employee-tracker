// Required packages/libs
const Inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const db = require('./config/connection')

// connect to db and prompt user once connected to database
db.connect(error => {
  if (error) {
  console.error(error);
  return;
  }
  console.log('Connected to company_db database! Initializing prompt...');
  promptUser();
  });


// Prompts user
const promptUser = () => {
  Inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        name: 'choice', 
        choices: [
          'View All Departments', 
          'View All Roles',
          'View All Employees',
          'Add A Department',
          'Add A Role', 
          'Add An Employee', 
          'Update An Employee Role'
        ]
      }
    ])

    .then(answers => {
      //switch statements for each choice
      switch (answers.choice) {
        case 'View All Departments':
          viewDepartments();
          break;
        
        case 'View All Roles':
          viewRoles();
          break;
        
        case 'View All Employees':
          viewEmployees();
          break;

        case 'Add A Department':
          addDepartment();
          break;

        case 'Add A Role':
          addRole();
          break;

        case 'Add An Employee':
          addEmployee();
          break;

        case 'Update An Employee Role':
          addEmployeeRole();
          break;
      }
    });
};

// function to view all departments
const viewDepartments = () => {
  db.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

// function to view all roles
const viewRoles = () => {
  db.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

// function to view all employees
const viewEmployees = () => {
  db.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
  });
};

// function to add a department
// function to add a role
// function to add an employee

//// update an employee role

