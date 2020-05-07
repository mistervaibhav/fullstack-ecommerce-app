const mongoose = require('mongoose');
const shortid = require('shortid');

const categorySchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: shortid.generate,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
