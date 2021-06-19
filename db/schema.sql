CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE employee (
    id INT auto_increment NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

CREATE TABLE department (
    id INT auto_increment NOT NULL,
    department_name VARCHAR(50),
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT auto_increment NOT NULL,
    title VARCHAR(50),
    salary DECIMAL (10,2),
    department_id INT,
    PRIMARY KEY (id)
);