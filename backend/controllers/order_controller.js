const { Order, Cart } = require('../models/order_route');

const createOrder = async (req, res) => {
  try {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    await order.save();

    return res.status(200).json({
      order,
      error: 'Order created',
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to create order',
    });
  }
};

/*--------------------------------------------------------------------- */

const getOrdersAll = (req, res) => {
  order
    .find()
    .populate('user', '_id name')
    .exec((error, orders) => {
      if (error) {
        return res.status(404).json({
          error: 'No orders found',
        });
      }
      return res.status(200).json({ orders });
    });
};
/*--------------------------------------------------------------------- */

const getOrderStatus = async (req, res) => {
  let status = await Order.schema.path('status').enumValues;
  return res.status(200).json(status);
};
/*--------------------------------------------------------------------- */

const updateStatus = (req, res) => {
  Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (error, order) => {
    if (error) {
      return res.status(400).json({
        error: 'Cannot update order status',
      });
    }
    return res.status(200).json(order);
  });
};

/*--------------------------------------------------------------------- */

module.exports = {
  createOrder,
  getOrdersAll,
  getOrderStatus,
  updateStatus,
};
