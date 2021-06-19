INSERT INTO department (department_name)
VALUES ("Sales"), ("Engineering"), ("Accounting"), ("Product"), ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 175000, 1), ("Principal Engineer", 150000, 2), ("Controller", 200000, 3), ("Product Manager", 180000, 4), ("CEO", 250000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Johnson", 1, 10), ("Jeff", "Biggs", 2, 9), ("Sarah", "Mueller", 3, 8), ("Jen", "Jennings", 4, 7), ("Edmundo", "Valentino", 5, 6); 