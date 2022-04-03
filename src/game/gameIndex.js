// #!/usr/bin/env node

// /*"figlet": "^1.5.2",
// "gradient-string": "^2.0.0",
// "inquirer": "^8.2.2",
// "nanospinner": "^1.0.0",
// */
//    "chalk": "^5.0.1",
//"chalk-animation": "^1.6.0",
// import chalk from 'chalk';
// import inquirer from 'inquirer';
// import gradient from 'gradient-string';
// import chalkAnimation from 'chalk-animation';
// import figlet from 'figlet';
// import { createSpinner } from 'nanospinner';

// let playerName;

// const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// async function welcome() {
//   const rainbowTitle = chalkAnimation.rainbow('== Inquiring Minds == \n'
//   );
//   //Allows rainbow to animate for 2 seconds
//   await sleep();
//   rainbowTitle.stop();

//   console.log(`
//   ${chalk.bgGreen('HOW TO PLAY')}
//   `);
// }

// //we are able to await outside of the async function because Node.JS supports top level await
// // await welcome();

// async function askName() {
//   const answers = await inquirer.prompt({
//     name: 'player_name',
//     type: 'input',
//     message: 'What is your name?',
//     default() {
//       return 'Player One';
//     },
//   });

//   playerName = answers.player_name;
// }

// // await askName();

// async function question1() {
//   const answers = await inquirer.prompt({
//     name: 'question_1',
//     type: 'list',
//     message: 'If you type the following code in the console window, what result will you get? 3 > 2 > 1 === false;',
//     choices: [
//       'True',
//       'False',
//     ],
//   })
//   return handleAnswer(answers.question_1 == 'True')
// }

//   async function question2() {
//     const answers = await inquirer.prompt({
//       name: 'question_2',
//       type: 'list',
//       message: 'JavaScript is a ___ -side programming language.',
//       choices: [
//         'Client',
//         'Server',
//         'Both',
//         'None',
//       ],
//     })

//   return handleAnswer(answers.question_2 == 'Both');
// }

//   async function question3() {
//     const answers = await inquirer.prompt({
//       name: 'question_3',
//       type: 'list',
//       message: 'Which of the following will write the message “Hello Friend!” in an alert box?',
//       choices: [
//         'alertBox(“Hello Friend!”);',
//         'alert(Hello Friend!);',
//         'msgAlert(“Hello Friend!”);',
//         'alert(“Hello Friend!”);',
//       ],
//     })

//   return handleAnswer(answers.question_3 == 'alert(“Hello DataFlair!”);');
//   }

//   async function question4() {
//     const answers = await inquirer.prompt({
//       name: 'question_4',
//       type: 'list',
//       message: 'How do you find the minimum of x and y using JavaScript?',
//       choices: [
//         'min(x,y);',
//         'Math.min(x,y)',
//         'Math.min(xy)',
//         'min(xy);',
//       ],
//     })

//   return handleAnswer(answers.question_4 == 'Math.min(x,y)');
//   }

//   async function question5() {
//     const answers = await inquirer.prompt({
//       name: 'question_5',
//       type: 'list',
//       message: 'Which of the following is a valid type of function javascript supports?',
//       choices: [
//         'Named Function',
//         'Anonymous Function',
//         'Both of the Above',
//         'None of the Above',
//       ],
//     })

//   return handleAnswer(answers.question_5 == 'Both of the Above');
//   }

// async function handleAnswer(isCorrect) {
//   //Spinner will run for 2 seconds before revealing answer
//   const spinner = createSpinner('Calculating....').start();
//   await sleep();

//   if  (isCorrect) {
//     spinner.success({text: `CONGRATS! ${playerName}. You managed to guess correctly`});
//   } else {
//     spinner.error({text: `☠☠☠ Game Over , you failed 👻${playerName}! ☠☠☠`});
//     //This will kill the script
//     process.exit(1);
//   }
// }

// function winner() {
//   console.clear();
//   const msg = `Congrats , ${playerName} ! You win ?`;

//   figlet(msg, (err, data) => {
//     console.log(gradient.rainbow.multiline(data));
//   })
// }
// await welcome();
// await askName();
// await question1();
// await question2();
// await question3();
// await question4();
// await question5();
// await winner();
