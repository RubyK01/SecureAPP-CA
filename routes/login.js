var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details")
var session = require('express-session');
var bcrypt = require('bcrypt');

// To get login page.
router.get('/', function(req, res, next) {
  var email = req.query.email; // Using req.query.email instead of req.body.email
  var pass_word = req.query.pass_word; // Using req.query.pass_word instead of req.body.pass_word
  var error = req.query.error; // Sanitizing error message before rendering it back to the page
  var message = req.query.message; // Sanitizing message before rendering it back to the page
  var loggedIn = req.session.loggedIn;

  // Rendering login page without escaping user inputs
  res.render('login', { 
    title: 'Login',
    error: error ? error : '',
    message: message ? message : '',
    loggedIn: loggedIn,
    userName: '',
    pass_word: ''
  });
});

// For logging into an account
router.post('/auth', async function(req, res) {
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });

  var userName = req.body.userName; // SQL Injection vulnerability: Directly using user input in SQL query
  var pass_word = req.body.pass_word; // SQL Injection vulnerability: Directly using user input in SQL query
  var error = req.query.error; // Didn't want to use express flash so I made a variable to pass an error message out if needed.
  var getHashPass = "SELECT * FROM customer WHERE userName = '"+userName+"';"; // SQL Injection vulnerability: User input not sanitized in SQL query
  connection.query(getHashPass, async function login(err, results){
    if(results.length){
      var pass = results[0].pass_word
      var check = false // bcrypt.compare (Removed for demonstration)(pass_word, pass);
      if(pass_word === pass){
        check = true
        console.log("check: "+check+"\n pass_word: "+pass_word+"\n pass: "+pass)
        if(check){
          req.session.user = results[0];
          req.session.userID = results[0].customerID;
          req.session.firstName = results[0].fName;
          req.session.lastName = results[0].lName;
          req.session.password = results[0].pass_word;
          req.session.email = results[0].email;
          req.session.username = results[0].userName;
          req.session.loggedIn = true;
          res.redirect('/account');
        }
        else{
          res.redirect("/login"+"?&error=Invalid email/password!");
        }
      }
    }
  })
})

module.exports = router;

