var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.post(
  '/register',
  userController.register,
  authController.login,
  (req, res) => {
    res.json(req.user);
  }
);

router.post('/logout', authController.logout, (req, res) => {
  res.send(200);
});

router.post(
  '/login',
  (req, res, next) => {
    console.log('loginasdasd!@#!@#!@#!@');
    next();
  },
  authController.login,
  (req, res) => {
    console.log('user:', req.user);
    res.json(req.user._id);
  }
);

module.exports = router;
