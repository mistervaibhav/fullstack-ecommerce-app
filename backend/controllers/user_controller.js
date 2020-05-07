const User = require('../models/user_model');
const Order = require('../models/order_route');

/*-------------------------------------------------------------*/

const getUserById = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      throw error;
    } else {
      req.profile = user;
    }

    next();
  } catch (error) {
    res.status(404).json({
      error: error,
      message: 'No user found.',
    });
  }
};

/*-------------------------------------------------------------*/

const getUser = (req, res, next) => {
  req.profile.salt = undefined;
  req.profile.hashedPassword = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
  next();
};

/*-------------------------------------------------------------*/

const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      {
        _id: req.profile._id,
      },
      {
        $set: req.body,
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );

    if (!user) {
      throw error;
    }

    user.salt = undefined;
    user.hashedPassword = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;

    return res.status(200).json({
      message: 'Credentials updated succesfully',
      user,
    });
  } catch (error) {
    return res.status(400).json({
      error,
      message: 'Attemp to update failed',
    });
  }

  next();
};

/*-------------------------------------------------------------*/

const userPurchaseList = async (req, res, next) => {
  try {
    const order = await Order.find({ user: req.profile._id }).populate('user', '_id name');

    res.status(200).json({
      order,
    });
    next();
  } catch (error) {
    return res.status(400).json({
      error: 'No orders yet .',
    });
  }
};

/*-------------------------------------------------------------*/

const pushOrderInPurchaseList = async (req, res, next) => {
  try {
    let purchases = [];

    req.body.order.products.forEach((item) => {
      purchases.push({
        _id: item._id,
        name: item.name,
        description: item.description,
        category: item.category,
        quantity: item.quantity,
        amount: req.body.order,
        transaction_id: req.body.order.transaction_id,
      });
    });

    await User.findOneAndUpdate(
      {
        _id: req.profile._id,
      },
      {
        $push: { purchases: purchases },
      },
      {
        new: true,
      }
    );

    next();
  } catch (error) {
    return res.status(400).json({
      error: 'Unable to save purchase list',
    });
  }
};

/*-------------------------------------------------------------*/

module.exports = {
  getUserById,
  getUser,
  updateUser,
  userPurchaseList,
  pushOrderInPurchaseList,
};
