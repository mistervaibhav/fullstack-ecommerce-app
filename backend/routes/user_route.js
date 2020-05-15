const express = require('express');
const router = express.Router();

const User = require('../models/user_model');

const { updateUser, userPurchaseList, getUser } = require('../controllers/user_controller');
const { getUserById } = require('../middleware/params_mw');

const { isLoggedIn, isAuthenticated, isAdmin } = require('../middleware/route_protection_mw');

router.param('userId', getUserById);

router.get('/:userId', isLoggedIn, isAuthenticated, getUser);

router.get('/orders/:userId', isLoggedIn, isAuthenticated, userPurchaseList);

router.put('/:userId', isLoggedIn, isAuthenticated, updateUser);

module.exports = router;
