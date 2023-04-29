USE corporation_db;

INSERT INTO departments (name) 
VALUES ("Engineering"),("Finance"),("Legal"),("Sales");

INSERT INTO role (title, salary, department_id) 
VALUES 
("SalesLead", 100000, 1),
("SalesPerson", 80000, 1),
("Lead Engineer", 150000, 2),
("Software Engineer", 120000, 2),
("Accountant Manager", 160000, 3),
("Accountant", 125000, 3),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) VALUES
("John", "Doe", 7, NULL, 1),
("Mike", "Chan", 8, 1, 1),
("Ashley", "Rodriguez", 5, NULL, 2),
("Kevin", "Tupik", 1, NULL, 2),
("Kunal", "Singh", 3, NULL, 3),
("Malia", "Brown", 6, 2, 3),
("Sarah", "Lourd", 2, 4, 4),
("Tom", "Allen", 4, 5, 4);

