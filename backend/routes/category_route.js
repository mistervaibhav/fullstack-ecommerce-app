const express = require('express');
const router = express.Router();

const {
  createCategory,
  getCategory,
  getCategoryAll,
  updateCategory,
  deleteCategory,
} = require('../controllers/category_controller');

const { getUserById, getCategoryById } = require('../middleware/params_mw');

const { isAdmin, isAuthenticated, isLoggedIn } = require('../middleware/route_protection_mw');

router.param('userId', getUserById);

router.param('categoryId', getCategoryById);

router.get('/all', getCategoryAll);

router.get('/:categoryId', getCategory);

router.post('/create/:userId', isLoggedIn, isAuthenticated, isAdmin, createCategory);

router.put('/:categoryId/:userId', isLoggedIn, isAuthenticated, isAdmin, updateCategory);

router.delete('/:categoryId/:userId', isLoggedIn, isAuthenticated, isAdmin, deleteCategory);

module.exports = router;
