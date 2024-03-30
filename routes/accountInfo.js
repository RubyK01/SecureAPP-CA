var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details");
var session = require('express-session');

//Made by Ruby.
//to get accountInfo page.
router.get('/', function(req, res, next) {
  var loggedIn = req.session.loggedIn;
  var message = req.query.message;
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the follow error message.
  if(!req.session.loggedIn === true){
    res.redirect("/login"+"?&error=Please login to view page!");
  }
  //To grab session details to display.
  var customer = req.session;
  var email = req.session.email;
  var fName = req.session.firstName;
  var lName = req.session.lastName;
  var userName = req.session.username;
  console.log(customer);
  res.render('accountInfo', {
    //Variables to display.
    title: 'Info',
    customer: customer,
    email: email,
    fName: fName,
    lName: lName,
    userName: userName,
    message: message,
    loggedIn: loggedIn
   });
});

//method to delete the users account.
router.post('/delete', async function deleteAccount(req, res, next){
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  var customerID = req.session.userID
  connection.query("DELETE FROM customer WHERE customerID = '"+customerID+"';");
  req.session.destroy();
  res.redirect("/login"+"?message=Account deleted successfully!");
});

module.exports = router;
