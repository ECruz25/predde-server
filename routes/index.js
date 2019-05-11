var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.isAuthenticated()) {
    console.log('autenticado');
  } else {
    console.log('sin autenticar!@!#!@#!@#!@#');
  }
  res.send('hello from the predde api');
});
router.get('/success', function(req, res, next) {
  console.log(req.session, req.user);
  res.sendStatus(200);
});
router.get('/failure', function(req, res, next) {
  res.sendStatus(500);
});

router.get('/isLoggedIn', function(req, res, next) {
  if (req.isAuthenticated()) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});
module.exports = router;
