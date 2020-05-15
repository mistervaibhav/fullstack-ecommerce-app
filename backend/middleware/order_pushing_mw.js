const User = require('../models/user_model');

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
  pushOrderInPurchaseList,
};
