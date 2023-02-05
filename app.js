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
  console.log(chalk.bgMagenta('Connected to database! Initializing prompt...'));
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
const addDepartment = () => {
  Inquirer
    .prompt([
      {
        type: 'input',
        message: 'What department would you like to add?',
        name: 'departmentName'
      }
    ])

    .then(answers => {
      const departmentName = answers.departmentName;
      //query which inserts department  
      db.query(`INSERT INTO department (name) VALUES ('${departmentName}')`, (err, res) => {
      if (err) throw err;
      console.log(`Congrats! You have added a new department called ${departmentName}.`);
      });
      //query which then shows all depts with update
      viewDepartments();
    });
};

// function to add a role
const addRole = () => {
  Inquirer
    .prompt([
      {
        type: 'list',
        message: 'What department is this role in?',
        name: 'roleDepartment', 
        choices: [
          'Sales', 
          'Engineering',
          'Finance',
          'Legal'
        ]
      },
      {
        type: 'input',
        message: 'What role would you like to add?',
        name: 'roleName'
      },
      {
        type: 'input',
        message: 'What is the salary for this role?',
        name: 'roleSalary'
      }
    ])

    .then(answers => {
      const roleName = answers.roleName;
      const roleSalary = answers.roleSalary;
      const roleDepartment = answers.roleDepartment;
    
      //gets department id of the department chosen by user
      db.query(`SELECT id FROM department WHERE name = '${roleDepartment}'`, (err, res) => {
        if (err) throw err;
        const departmentId = res[0].id;
    
        //query which inserts department  
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleName}', '${roleSalary}', '${departmentId}')`, (err, res) => {
          if (err) throw err;
          console.log(`Congrats! You have added a new role called ${roleName} with the salary of $${roleSalary} in the ${roleDepartment} department.`);
    
          //query which then shows all depts with update
          viewRoles();
        });
      });
    });
    };

  

// function to add an employee
// const addEmployee = () => {
//   db.query("SELECT * FROM employee", (err, res) => {
//     if (err) throw err;
//     console.table(res);
//   });
// };

//// update an employee role

