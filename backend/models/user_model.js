const mongoose = require('mongoose');

const { nanoid } = require('nanoid');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 60,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      unique: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    userinfo: {
      type: String,
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },
    purchases: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

userSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = nanoid();
    this.hashedPassword = this.hashPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  hashPassword: function (password) {
    if (!password) {
      return '';
    }
    try {
      return crypto.createHmac('sha256', this.salt).update(password).digest('hex');
    } catch (error) {
      return '';
    }
  },
  authenticate: function (password) {
    return this.hashPassword(password) === this.hashedPassword;
  },
};

module.exports = mongoose.model('User', userSchema);
