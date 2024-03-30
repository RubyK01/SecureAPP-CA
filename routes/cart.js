var express = require('express');
var router = express.Router();

//to get cart page.
router.get('/', function(req, res, next) {
  //login checker by Tomas.
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the follow error message.
  //if(!req.session.loggedIn === true){
    //res.redirect("/login"+"?&error=Please login to view page!");
 // }
  res.render('cart', { title: 'cart' });
});

module.exports = router;
