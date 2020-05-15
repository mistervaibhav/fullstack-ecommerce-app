const mongoose = require('mongoose');
const shortid = require('shortid');

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  product: {
    type: ObjectId,
    ref: 'Product',
  },
  name: {
    type: String,
  },
  count: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

const orderSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    products: [cartSchema],
    transaction_id: {},
    amount: {
      type: Number,
    },
    address: {
      type: String,
    },
    updated: {
      type: Date,
    },
    status: {
      type: String,
      default: 'Placed',
      enum: ['Cancelled', 'Delivered', 'Shipped', 'Proccessing', 'Placed'],
    },
    user: {
      type: ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);
const Order = mongoose.model('Order', orderSchema);

module.exports = { Order, Cart };
