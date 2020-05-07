const mongoose = require('mongoose');
const shortid = require('shortid');

const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    stock: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
