const expressJwt = require('express-jwt');

/*-----------------------------------------------------*/

const isLoggedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: 'auth',
});

/*-----------------------------------------------------*/

const isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!checker) {
    return res.status(403).json({
      error: 'ACCESS DENIED',
    });
  }

  next();
};

/*-----------------------------------------------------*/

const isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: 'You dont have ADMIN privilages ,ACCESS DENIED',
    });
  }
  next();
};

module.exports = {
  isLoggedIn,
  isAuthenticated,
  isAdmin,
};
