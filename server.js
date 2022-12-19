// Required packages/libs
const Inquirer = require('inquirer');
const db = require('./db');
const cTable = require('console.table');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Create connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    database: 'employee_db'
  });

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    database: 'classlist_db'
  },
  console.log(`Connected to the employee_db database.`)
);

// Connect
connection.connect((err) => {
  if (err){
    throw err;
  } console.log('MySql Connected!');
});

// Query database
connection.query('SELECT * FROM employee_db', function (err, results) {
  console.log(results);
});

  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  
  // Prompts user
  inquirer
  .prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'chooseOption',
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

  .then(answers => {
    console.info('Answer:', answers.chooseOption);
  });