const express = require('express');
const router = express.Router();

const User = require('../models/user_model');

const {
  getUserById,
  updateUser,
  userPurchaseList,
  getUser,
} = require('../controllers/user_controller');
const { isLoggedIn, isAuthenticated, isAdmin } = require('../middleware/route_protection_mw');

router.param('userId', getUserById);

router.get('/:userId', isLoggedIn, isAuthenticated, getUser);

router.put('/:userId', isLoggedIn, isAuthenticated, updateUser);

router.get('/orders/:userId', isLoggedIn, isAuthenticated, userPurchaseList);

module.exports = router;
