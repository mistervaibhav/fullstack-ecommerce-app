const User = require('../models/user_model');
const Category = require('../models/category_model');
const Product = require('../models/product_model');
const Order = require('../models/order_route');

/*-------------------------------------------------------------*/

const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        error: 'No user found.',
      });
    } else {
      req.profile = user;
    }

    next();
  } catch (error) {
    res.status(404).json({
      error: 'No user found.',
    });
  }
};

/*-------------------------------------------------------------*/

const getCategoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({
        error: 'No Category found.',
      });
    } else {
      req.category = category;
    }

    next();
  } catch (error) {
    res.status(404).json({
      error: 'No Category found.',
    });
  }
};

/*-------------------------------------------------------------*/

const getProductById = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      res.status(404).json({
        error: 'Product not found',
      });
    } else {
      product.populate('category');
      req.product = product;
    }

    next();
  } catch (error) {
    res.status(404).json({
      error: 'Product not found',
    });
  }
};

/*-------------------------------------------------------------*/

const getOrderById = async (req, res, next, id) => {
  try {
    const order = await Order.findById(id);

    if (!order) {
      res.status(404).json({
        error: 'Order not found',
      });
    } else {
      order.populate('products.product', 'name price');
      req.order = order;
    }

    next();
  } catch (error) {
    res.status(404).json({
      error: 'Order not found',
    });
  }
};

/*-------------------------------------------------------------*/

module.exports = {
  getUserById,
  getCategoryById,
  getProductById,
  getOrderById,
};
