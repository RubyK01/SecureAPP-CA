var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var loggedIn = req.session.loggedIn;
  res.render('generalProducts', { title: 'General Products' ,loggedIn:loggedIn});
});

module.exports = router;
