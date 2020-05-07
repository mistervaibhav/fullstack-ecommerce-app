const jwt = require('jsonwebtoken');

const { validationResult } = require('express-validator');
const User = require('../models/user_model');

/*-------------------------------REGISTER-------------------------------*/

const register = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  try {
    const user = new User(req.body);
    await user.save();
    return res.status(200).json({
      message: 'Registration successfull',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Registration failed',
    });
  }
};

/*-----------------------------LOGIN----------------------------*/

const login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  try {
    const { email, password } = await req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw error;
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({
        message: `Incorrect password`,
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.SECRET);

    await res.cookie('token', token);

    const { _id, name, role } = user;

    return res.status(200).json({
      token,
      user: {
        _id,
        name,
        email,
        role,
      },
      message: 'Login successfull',
    });
  } catch (error) {
    return res.status(400).json({
      message: 'Email not registered with us .',
    });
  }
};

/*----------------------------LOGOUT-----------------------------*/

const logout = (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({
    message: 'Logged out succesfully.',
  });
};

/*---------------------------------------------------------*/

module.exports = {
  register,
  login,
  logout,
};
