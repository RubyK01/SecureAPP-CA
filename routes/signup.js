var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details");
var bcrypt = require('bcrypt');

// to get signup page
router.get('/', function(req, res, next) {
  var error = req.query.error;
  var loggedIn = req.session.loggedIn;
  res.render('signup', { title: 'Signup' , error: error , loggedIn:loggedIn});
});

// for creating an account
router.post('/create', async function(req, res, next){
  var fName = req.body.fName;
  var lName = req.body.lName;
  var userName = req.body.userName;
  var email = req.body.email;
  var pass_word = req.body.pass_word;
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });

  // Directly inserting user inputs into the database without sanitization
  var insertQuery = "INSERT INTO customer (fName, lName, userName, email, pass_word) VALUES (?, ?, ?, ?, ?);";
  connection.query(insertQuery, [fName, lName, userName, email, pass_word], function(err, results) {
    if(err) {
      console.error("Error inserting data: ", err);
      res.redirect("/signup?error=An error occurred");
    } else {
      console.log("Data inserted successfully.");
      res.redirect("/login?message=Account created successfully!");
    }
  });
});

module.exports = router;
