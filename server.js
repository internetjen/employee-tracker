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

  