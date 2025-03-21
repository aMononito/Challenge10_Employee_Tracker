import { pool } from './db/connection.js';
import inquirer from 'inquirer';
const viewAllEmployees = async () => {
    try {
        const result = await pool.query(`SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
                                         CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
                                         FROM employee 
                                         LEFT JOIN role ON employee.role_id = role.id 
                                         LEFT JOIN department ON role.department_id = department.id 
                                         LEFT JOIN employee AS manager ON employee.manager_id = manager.id`);
        console.table(result.rows);
        mainMenu();
    }
    catch (error) {
        console.error('Error fetching employees:', error);
        mainMenu();
    }
};
const viewAllDepartments = async () => {
    try {
        const result = await pool.query('SELECT id, name FROM department');
        console.table(result.rows);
        mainMenu();
    }
    catch (error) {
        console.error('Error fetching departments:', error);
        mainMenu();
    }
};
const viewAllRoles = async () => {
    try {
        const result = await pool.query(`SELECT role.id, role.title, department.name AS department, role.salary 
                                         FROM role 
                                         JOIN department ON role.department_id = department.id`);
        console.table(result.rows);
        mainMenu();
    }
    catch (error) {
        console.error('Error fetching roles:', error);
        mainMenu();
    }
};
const addDepartment = async () => {
    const answer = await inquirer.prompt([
        { type: 'input', name: 'name', message: 'Enter department name:' }
    ]);
    try {
        await pool.query('INSERT INTO department (name) VALUES ($1)', [answer.name]);
        console.log('Department added successfully');
        mainMenu();
    }
    catch (error) {
        console.error('Error adding department:', error);
        mainMenu();
    }
};
const addRole = async () => {
    const departments = await pool.query('SELECT * FROM department');
    const choices = departments.rows.map(dept => ({ name: dept.name, value: dept.id }));
    const answer = await inquirer.prompt([
        { type: 'input', name: 'title', message: 'Enter role title:' },
        { type: 'input', name: 'salary', message: 'Enter salary:' },
        { type: 'list', name: 'department_id', message: 'Select department:', choices }
    ]);
    try {
        await pool.query('INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)', [answer.title, answer.salary, answer.department_id]);
        console.log('Role added successfully');
        mainMenu();
    }
    catch (error) {
        console.error('Error adding role:', error);
        mainMenu();
    }
};
const addEmployee = async () => {
    const roles = await pool.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({ name: role.title, value: role.id }));
    const employees = await pool.query('SELECT * FROM employee');
    const managerChoices = employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    managerChoices.push({ name: 'None', value: null });
    const answer = await inquirer.prompt([
        { type: 'input', name: 'first_name', message: 'Enter first name:' },
        { type: 'input', name: 'last_name', message: 'Enter last name:' },
        { type: 'list', name: 'role_id', message: 'Select role:', choices: roleChoices },
        { type: 'list', name: 'manager_id', message: 'Select manager:', choices: managerChoices }
    ]);
    try {
        await pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id]);
        console.log('Employee added successfully');
        mainMenu();
    }
    catch (error) {
        console.error('Error adding employee:', error);
        mainMenu();
    }
};
const updateEmployeeRole = async () => {
    const employees = await pool.query('SELECT * FROM employee');
    const employeeChoices = employees.rows.map(emp => ({ name: `${emp.first_name} ${emp.last_name}`, value: emp.id }));
    const roles = await pool.query('SELECT * FROM role');
    const roleChoices = roles.rows.map(role => ({ name: role.title, value: role.id }));
    const answer = await inquirer.prompt([
        { type: 'list', name: 'employee_id', message: 'Select employee to update:', choices: employeeChoices },
        { type: 'list', name: 'role_id', message: 'Select new role:', choices: roleChoices }
    ]);
    try {
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answer.role_id, answer.employee_id]);
        console.log('Employee role updated successfully');
        mainMenu();
    }
    catch (error) {
        console.error('Error updating employee role:', error);
        mainMenu();
    }
};
const mainMenu = async () => {
    inquirer
        .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Add department', 'Add role', 'Add employee', 'Update employee role', 'Quit'],
        }
    ])
        .then((answers) => {
        switch (answers.mainMenu) {
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'Add department':
                addDepartment();
                break;
            case 'Add role':
                addRole();
                break;
            case 'Add employee':
                addEmployee();
                break;
            case 'Update employee role':
                updateEmployeeRole();
                break;
            case 'Quit':
                console.log('Goodbye!');
                pool.end();
                break;
        }
    });
};
mainMenu();
