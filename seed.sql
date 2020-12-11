DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name varchar(30),
  last_name varchar(30),
  role_id INT,
  manger_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title varchar(30),
  salary decimal,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name varchar(30),
  PRIMARY KEY (id)
);

