// Required packages/libs
const Inquirer = require('inquirer');
const db = require('./db');
const cTable = require('console.table');
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });

// sample query
connection.query(
    'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
    ['Page', 45],
    function(err, results) {
      console.log(results);
    }
  );

  
  // Prompt 
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'viewing option',
      choices: [
        'view all departments', 
        'view all roles',
        'view all employees',
        'add a department',
        'add a role', 
        'add an employee', 
        'update an employee role'
      ],
    }
  ])

  .then((answers) => {
    const htmlPageContent = generateHTML(answers);

    fs.writeFile('index.html', htmlPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
  });
