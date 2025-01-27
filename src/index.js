import inquirer from 'inquirer';
import { generateWebsite } from './generator.js';

const industries = [
  'Technology',
  'Healthcare',
  'Education',
  'Finance',
  'Manufacturing',
  'Retail',
  'Construction',
  'Consulting'
];

const questions = [
  {
    type: 'input',
    name: 'domain',
    message: 'Enter domain name:',
    validate: input => input.length > 0
  },
  {
    type: 'input',
    name: 'companyName',
    message: 'Enter company name:',
    validate: input => input.length > 0
  },
  {
    type: 'input',
    name: 'phone',
    message: 'Enter phone number:',
    validate: input => input.length > 0
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter email address:',
    validate: input => input.length > 0
  },
  {
    type: 'input',
    name: 'address',
    message: 'Enter company address:',
    validate: input => input.length > 0
  },
  {
    type: 'list',
    name: 'industry',
    message: 'Select industry:',
    choices: industries
  },
  {
    type: 'list',
    name: 'language',
    message: 'Select language:',
    choices: ['English', 'German']
  }
];

async function main() {
  try {
    const answers = await inquirer.prompt(questions);
    await generateWebsite(answers);
  } catch (error) {
    console.error('Error generating website:', error);
    process.exit(1);
  }
}

main();
