-- INSERT INTO favorite_books (book_name, section, in_stock, quantity)
-- VALUES 

INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales'),
       ('Marketing'),
       ('Human Resources');

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 100000, 1),
       ('Accountant', 80000, 2),
       ('Lawyer', 120000, 3),
       ('Legal Assistant', 60000, 3),
       ('Salesperson', 60000, 4),
       ('Sales Manager', 90000, 4),
       ('Marketing Specialist', 70000, 5),
       ('Marketing Manager', 90000, 5),
       ('HR Specialist', 70000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Alice', 'Johnson', 1, NULL),
       ('Bob', 'Smith', 2, NULL),
       ('Charlie', 'Brown', 3, NULL),
       ('David', 'White', 4, 1),
       ('Eve', 'Black', 4, NULL),
       ('Frank', 'Green', 6, 4),
       ('Grace', 'Blue', 7, 4),
       ('Hannah', 'Purple', 8, 4),
       ('Isaac', 'Orange', 9, 1);