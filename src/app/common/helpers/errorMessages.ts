import { regexExpression } from './regexExpression';
// tslint:disable-next-line:prefer-const
let message: any;
this.message = regexExpression;

export const errorMessages: Object = {
  REQUIRED: 'This field is required!',
  NAME_EXISTS: 'Such name already exists! Please try another.',
  ONLY_NUMBERS: 'Only numbers from 0 to 1000 are allowed!',
  INCORRECT_INPUT: 'Only numbers, letters and -_.:#+/&() are allowed!',
  ERROR: 'Error occurred. Please try again.',
  MUST_BE_CORRECT_ANSWER: 'Please choose the correct answer!',
  ACCESS_DENIED: 'Access denied! You need to SignIn.',
  USER_EXISTS: 'Error, user with such login already exists!',
  INCORRECT_LOGIN_INPUT: 'Incorrect input, please try again!',
  SUCCESSFULLY_REGISTERED: 'Congratulation, you\'ve been successfully registered! ' +
   'Please, try to login.',
  LOGIN_REQUIRED: 'Login is required',
  LOGIN_LENGTH: 'Login must be less than ' + this.message.MAX_LENGTH_INPUT,
  EMAIL_REQUIRED: 'Email is required',
  EMAIL_VALID: 'Please enter a valid email address',
  PASSWORD_REQUIRED: 'Password is required',
  PASSWORD_LENGTH: 'Password must be at least ' + this.message.MIN_LENGTH_PASSWORD,
  CONFIRM_REQUIRED: 'Confirmation is required',
  PASSWORD_MATCHING: 'Confirmed password doesn\'t match'
};
