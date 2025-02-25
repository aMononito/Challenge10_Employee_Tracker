import inquirer from 'inquirer';
// import { pool }  from './db/connection';



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
        viewAllEmployees(); }
  })




};

mainMenu();