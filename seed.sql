DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employee (
  position INT NOT NULL,
  first_name varchar(30),
  last_name varchar(30),
  role_id INT,
  manger_id INT,
  PRIMARY KEY (position)
);

CREATE TABLE role (
  position INT NOT NULL,
  title varchar(30),
  salary decimal
  department_id INT,
  PRIMARY KEY (position)
);

CREATE TABLE department (
  position INT NOT NULL,
  name varchar(30),
  PRIMARY KEY (position)
);

