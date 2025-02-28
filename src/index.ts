import inquirer from 'inquirer';
// import { pool }  from './db/connection';


const viewAllEmployees = async () => {
  console.log('View all employees');
  
}






const mainMenu = async () => {
    inquirer
  .prompt([
    {
        type: 'list',
        name: 'mainMenu',
        message: 'What would you like to do?',
        choices: ['View all employees', 'View all departments', 'View all roles', 'Add employee', 'Add department', 'Add role', 'Update employee role', 'Quit'],
    }
  ])
  .then((answers) => {
    console.log(answers);
  if (answers.mainMenu === 'View all employees') {
    viewAllEmployees(); 
  } else if (answers.mainMenu === 'View all departments') {
    viewAllDepartments(); 
  } else if (answers.mainMenu === 'View all roles') {
    viewAllRoles(); 
  } else if (answers.mainMenu === 'Add employee') {
    addEmployee(); 
  } else if (answers.mainMenu === 'Add department') {
    addDepartment(); 
  } else if (answers.mainMenu === 'Add role') {
    addRole(); 
  } else if (answers.mainMenu === 'Update employee role') {
    updateEmployeeRole(); 
  } else if (answers.mainMenu === 'Quit') {
    quit(); 
  } else {
    console.log('Invalid selection');
    mainMenu();
  }
  });


};

mainMenu();