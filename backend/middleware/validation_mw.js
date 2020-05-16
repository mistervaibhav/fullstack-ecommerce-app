// const Joi = require('@hapi/joi');

// // * REGISTER VALIDATION

// const registerValidation = (data) => {
//   const schema = Joi.object({
//     name: Joi.string().required(),
//     email: Joi.string().required().email(),
//     password: Joi.string().min(6).required(),
//     gender: Joi.string().required(),
//     dob: Joi.date().required(),
//     mobile: Joi.number().required(),
//     city: Joi.string().required(),
//     state: Joi.string().required(),
//     country: Joi.string().required(),
//   });

//   return schema.validate(data);
// };

// // * LOGIN VALIDATION

// const loginValidation = (data) => {
//   const schema = Joi.object({
//     email: Joi.string().required().email(),
//     password: Joi.string().min(6).required(),
//   });

//   return schema.validate(data);
// };

// module.exports.registerValidation = registerValidation;

// module.exports.loginValidation = loginValidation;

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
