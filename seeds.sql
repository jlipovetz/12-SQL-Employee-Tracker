INSERT INTO department (department_name)
VALUES ("Accounting"),
       ("Sales"),
       ("Management"),
       ("Marketing"),
       ("Human Resources");

INSERT INTO role (title, salary, department_id) 
VALUES ("Accountant", 79000.00, 1),
       ("Sales Representative", 100000.00, 2),
       ("Manager", 150000.00, 3),
       ("Marketing Agent", 69000.00, 4),
       ("HR Assistant", 59000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ("Joe", "Lipovetz", 3, NULL),
       ("Rudy", "Lipovetz", 2, 1),
       ("John", "Doe", 5, 1),
       ("Cole", "Random", 4, 1),
       ("Isaiah", "Person", 5, 1);
 