DROP DATABASE IF EXISTS company_db;
-- Creates the "company_db" database --
CREATE DATABASE company_db;

-- Use the company_db --
USE company_db;

-- Creates the table "departments" within employee_db --
CREATE TABLE department (
    -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows --
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- Makes a string column called "name" which cannot contain null --
  name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id),
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT REFERENCES employee(id),
  FOREIGN KEY (role_id),
);

