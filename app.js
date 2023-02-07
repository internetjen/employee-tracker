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
  console.log(chalk.bgCyan.bold('- - - - - - - - - - - - - - - - - - - - - - - - -'));
  console.log(chalk.bgCyan.bold('- - - - - - - - - - - - - - - - - - - - - - - - -'));
  console.log(chalk.bgCyan.bold('- - - - - - -   EMPLOYEE MANAGER  - - - - - - - -'));
  console.log(chalk.bgCyan.bold('- - - - - - - - - - - - - - - - - - - - - - - - -'));
  console.log(chalk.bgCyan.bold('- - - - - - - - - - - - - - - - - - - - - - - - -'));
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


// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// function to view all departments
const viewDepartments = () => {
  db.query(`SELECT * FROM department`, (err, res) => {
    if (err) throw err;
    console.log(chalk.bgWhite('                           '));
    console.log(chalk.cyan.bgWhite.bold.italic('      All Departments      '));
    console.log(chalk.bgWhite('                           '));
    console.table(res);
    //once done, prompts user again 
    promptUser();
  });
};

//WHEN I choose to view all roles
//THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// function to view all roles
const viewRoles = () => {
  db.query(`SELECT role.id, role.title, role.salary, department.department_name FROM role JOIN department ON role.department_id = department.id`, (err, res) => {
    if (err) throw err;
    console.log(chalk.bgWhite('                           '));
    console.log(chalk.cyan.bgWhite.bold.italic('         All Roles         '));
    console.log(chalk.bgWhite('                           '));
    console.table(res);
    //once done, prompts user again 
    promptUser();
  });
};

//WHEN I choose to view all employees
//THEN I am presented with the employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// function to view all employees
const viewEmployees = () => {
  db.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.department_name, role.salary, manager.first_name || ' ' || manager.last_name AS 'Manager' FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee AS manager ON employee.manager_id = manager.id`, (err, res) => {
    if (err) throw err; 
    console.log(chalk.bgWhite('                         '));
    console.log(chalk.cyan.bgWhite.bold.italic('      All Employees      '));
    console.log(chalk.bgWhite('                         '));
    console.table(res);
    //once done, prompts user again 
    promptUser();
  });
};

//WHEN I choose to add a department
//THEN I am prompted to enter the name of the department and that department is added to the database
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
      db.query(`INSERT INTO department (department_name) VALUES ('${departmentName}')`, (err, res) => {
      if (err) throw err;
      console.log(chalk.bgCyan(`Congrats! You have added a new department called ${departmentName}.`));
      });
      //query which then shows all depts with update
      viewDepartments();
    });
};

//WHEN I choose to add a role
//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// function to add a role
const addRole = () => {
  //Gets all current departments available
  db.query(`SELECT department_name FROM department`, (err, res) => {
    if (err) throw err;

    const departmentChoices = res.map(department => department.department_name);
    
    Inquirer
    .prompt([
      {
        type: 'list',
        message: 'What department is this role in?',
        name: 'roleDepartment', 
        choices: departmentChoices
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
      db.query(`SELECT id FROM department WHERE department_name = '${roleDepartment}'`, (err, res) => {
        if (err) throw err;
        const departmentId = res[0].id;
    
        //query which inserts department  
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleName}', '${roleSalary}', '${departmentId}')`, (err, res) => {
          if (err) throw err;
          console.log(chalk.bgCyan(`Congrats! You have added a new role called ${roleName} with the salary of $${roleSalary} in the ${roleDepartment} department.`));
          //query which then shows all depts with update
          viewRoles();
        });
      });
    });
  });
};


//WHEN I choose to add an employee
//THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// function to add an employee
const addEmployee = () => {

  db.query(`SELECT title FROM role`, (err, res) => {
    if (err) throw err;

    const roleChoices = res.map(role => role.title);

  Inquirer
  .prompt([
    {
      type: 'input',
      message: 'What is their first name?',
      name: 'employeeName'
    },
    {
      type: 'input',
      message: 'What is their last name?',
      name: 'employeeLastName'
    },
    {
      type: 'list',
      message: 'What is their role?',
      name: 'employeeRole', 
      choices: roleChoices
    },
    {
      type: 'input',
      message: 'Who is their manager (type manager ID or NULL if no manager)?',
      name: 'employeeManager'
    },
  ])

  .then(answers => {
    const employeeName = answers.employeeName;
    const employeeLastName = answers.employeeLastName;
    const employeeRole = answers.employeeRole;
  
    //gets role id of the role chosen by user
    db.query(`SELECT id FROM role WHERE title = '${employeeRole}'`, (err, res) => {
      if (err) throw err;
      const roleId = res[0].id;
  
      //query which inserts employee  
      db.query(`INSERT INTO employee (first_name, last_name, role_id) VALUES ('${employeeName}', '${employeeLastName}', '${roleId}')`, (err, res) => {
        if (err) throw err;
        console.log(chalk.bgCyan(`Congrats! You have added a new employee called ${employeeName} ${employeeLastName} in the ${employeeRole} role.`));
  
        //query which then shows all depts with update
        viewEmployees();
      });
    });
  });
});
};

//WHEN I choose to update an employee role
//THEN I am prompted to select an employee to update and their new role and this information is updated in the database
// function to update an employee
const addEmployeeRole = () => {
  //Getting all employees
  db.query(`SELECT id, first_name, last_name FROM employee`, (err, employees) => {
    if (err) throw err;
  
  //Promts user to choose from current employees
  Inquirer
  .prompt([
    {
      type: 'list',
      message: 'Which employee would you like to update?',
      name: 'employee', 
      choices: employees.map(employee => {
        return { name: `${employee.first_name} ${employee.last_name}`, value: employee.id };
      })
    }
  ])

  .then(employeeAnswer => {
    const employeeId = employeeAnswer.employee;

    //Get all roles
    db.query(`SELECT id, title FROM role`,(err, roles) => {
      if (err) throw err;

      //Promts user to choose from current roles
      Inquirer
      .prompt([
        {
          type: 'list',
          message: 'What is the new role for the selected employee?',
          name: 'role',
          choices: roles.map(role => {
            return { name: role.title, value: role.id }
          })
        }
      ])

      .then(roleAnswer => {
        const roleId = roleAnswer.role;

        //Updates emloyee role
        db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [roleId, employeeId], (err, res) => {
          if (err) throw err;
          console.log(chalk.bgCyan(`Congrats! You have updated the employee role!`));
          //once done, prompts user again
          viewEmployees();
        });
      });
    });
  });
});
};