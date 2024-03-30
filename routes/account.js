var express = require('express');
var router = express.Router();
var session = require('express-session');

//Made by Ruby.
//to get account page.
router.get('/', function(req, res, next) {
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the following error message.
  if(!req.session.loggedIn === true){
    res.redirect("/login"+"?&error=Please login to view page!");
  }
  var userName = req.session.username;
  var error = req.query.error;
  var message = req.query.message;
  var loggedIn = req.session.loggedIn;
  res.render('account',
  { title: 'account',
    userName: userName,
    error: error,
    loggedIn: loggedIn,
    message: message
  });
});

module.exports = router;
