const express = require('express');
const router = express.Router();

const { register } = require('../controllers/auth_controller');
const { login } = require('../controllers/auth_controller');
const { logout } = require('../controllers/auth_controller');

const { registerValidation } = require('../middleware/validation_mw');
const { loginValidation } = require('../middleware/validation_mw');
const { isLoggedIn } = require('../middleware/route_protection_mw');

router.post('/register', registerValidation, register);

router.post('/login', loginValidation, login);

router.get('/logout', logout);

module.exports = router;
