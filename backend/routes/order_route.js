const express = require('express');
const router = express.Router();

const { isLoggedIn, isAuthenticated, isAdmin } = require('../middleware/route_protection_mw');
const { getUserById, getOrderById } = require('../middleware/params_mw');
const { pushOrderInPurchaseList } = require('../middleware/order_pushing_mw');

const {
  createOrder,
  getOrdersAll,
  getOrderStatus,
  updateStatus,
} = require('../controllers/order_controller');
const { updateInventory } = require('../controllers/product_controller');

router.param('userId', getUserById);
router.param('orderId', getOrderById);

router.get('/all/:userId', isLoggedIn, isAuthenticated, isAdmin, getOrdersAll);

router.get('/status/:userId', isLoggedIn, isAuthenticated, isAdmin, getOrderStatus);

router.post(
  '/create/:userId',
  isLoggedIn,
  isAuthenticated,
  pushOrderInPurchaseList,
  updateInventory,
  createOrder
);

router.put('/:orderId/status/:userId', isLoggedIn, isAuthenticated, isAdmin, updateStatus);

module.exports = router;
