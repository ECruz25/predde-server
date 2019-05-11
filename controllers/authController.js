const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

exports.login = passport.authenticate('local', {
  successRedirect: '/api/success',
  failureRedirect: '/api/failure'
});

exports.logout = req => {
  req.logout();
};

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return 500;
  }
  console.log('You are not logged in');
};
