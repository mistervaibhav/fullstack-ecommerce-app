const { check } = require('express-validator');

const registerValidation = [
  check('name', 'Name should be atleast 3 characters long .').isLength({ min: 3 }),
  check('email', 'Email is invalid.').isEmail(),
  check('password', 'Password should be atleast 8 characters long.').isLength({ min: 8 }),
];

const loginValidation = [
  check('email', 'Email is invalid.').isEmail(),
  check('password', 'Password should be atleast 8 characters long.').isLength({ min: 8 }),
];

module.exports = {
  registerValidation,
  loginValidation,
};
