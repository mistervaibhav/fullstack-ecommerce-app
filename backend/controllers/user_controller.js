const User = require('../models/user_model');
const Order = require('../models/order_route');

/*-------------------------------------------------------------*/

const getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.hashedPassword = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;

  return res.json(req.profile);
};

/*-------------------------------------------------------------*/

const updateUser = async (req, res) => {
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
      res.status(404).json({
        error,
        message: 'user doesnt exist',
      });
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
};

/*-------------------------------------------------------------*/

const userPurchaseList = async (req, res) => {
  try {
    const order = await Order.find({ user: req.profile._id }).populate('user', '_id name');

    return res.status(200).json({
      order,
    });
  } catch (error) {
    return res.status(400).json({
      error: 'No orders yet .',
    });
  }
};

/*-------------------------------------------------------------*/

module.exports = {
  getUser,
  updateUser,
  userPurchaseList,
};
