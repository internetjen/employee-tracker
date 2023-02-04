// Required packages/libs
const Inquirer = require('inquirer');
const cTable = require('console.table');
const chalk = require('chalk');
const db = require('./config/connection')

// Prompts user
const promptUser = () => {
  Inquirer
    .prompt([
    {
       type: 'list',
       message: 'What would you like to do?',
       name: 'choice',
       choices: [
        'view all departments', 
        'view all roles',
        'view all employees',
        'add a department',
        'add a role', 
        'add an employee', 
        'update an employee role'
      ]
    }
  ])

  .then(answers => {
    //switch statements for each choise


  })

}  
