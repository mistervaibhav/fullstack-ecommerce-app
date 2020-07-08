const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProduct,
  getProductAll,
  getUniqueCategoriesAll,
  getProductsByCategory,
  updateProduct,
  deleteProduct,
} = require('../controllers/product_controller');

const { getUserById, getProductById } = require('../middleware/params_mw');
const { loadImage } = require('../middleware/asset_downloading_mw');
const { isAdmin, isAuthenticated, isLoggedIn } = require('../middleware/route_protection_mw');

router.param('userId', getUserById);
router.param('productId', getProductById);

router.get('/all', getProductAll);
router.get('/categories', getUniqueCategoriesAll);
router.get('/assets/:productId', loadImage);
router.get('/:category', getProductsByCategory);
router.get('/:productId', getProduct);

router.post('/create/:userId', isLoggedIn, isAuthenticated, isAdmin, createProduct);

router.delete('/:productId/:userId', isLoggedIn, isAuthenticated, isAdmin, deleteProduct);

router.put('/:productId/:userId', isLoggedIn, isAuthenticated, isAdmin, updateProduct);

module.exports = router;
