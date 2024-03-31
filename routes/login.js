var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details")
var session = require('express-session');
var bcrypt = require('bcrypt');

//Made by Ruby.
//to get login page.
router.get('/', function(req, res, next) {
  var email = req.body.email;
	var pass_word = req.body.pass_word;
  var error = req.query.error;
  var message = req.query.message;
  var loggedIn = req.session.loggedIn;
  res.render('login', { title: 'Login', error: error, message: message, loggedIn:loggedIn });
});

//for logining into an account
// The login function is async as we expect more than one user would be using it.
router.post('/auth', async function(req, res) { //https://codeshack.io/basic-login-system-nodejs-express-mysql/
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  // To take the users inputs from the text fields.
	var userName = req.body.userName;
	var pass_word = req.body.pass_word;
  var error = req.query.error; // Didnt want to use express flash so I made a variable to pass an error message out if needed.
  //https://coderszine.com/user-login-and-registration-with-node-js-express-mysql/
  //Above is the source where I learned how to let a user login.
  //https://www.npmjs.com/package/express-session
  //Above is the source where I learned where to use sessions.
  var getHashPass = "SELECT * FROM customer WHERE userName = ?";
  connection.query(getHashPass, [userName], async function login(err, results){
    if(results.length){
      // Where I learned how to use bcrypt https://www.npmjs.com/package/bcrypt
      var pass = results[0].pass_word // takes the encrypted password from mysql
      var dbUserName = results[0].userName
      var check = await bcrypt.compare(pass_word,pass); //sees if the input and encrypted password are a match
      console.log("check: "+check)
      if(check){
        //I saved the user details in the session for later use.
        req.session.user = results[0]; //saved the whole query as an object just incase.
        req.session.userID = results[0].customerID;
        req.session.firstName = results[0].fName;
        req.session.lastName = results[0].lName;
        req.session.password = results[0].pass_word;
        req.session.email = results[0].email;
        req.session.username = results[0].userName;
        req.session.loggedIn = true;
         //logs for testing purposes.
         // console.log("ID: "+results[0].customerID);
         // console.log("Username: "+results[0].userName);
         console.log(req.session); //Check the termincal for session details i.e cookie and user details.
         res.redirect('/account');
      }
      else{
      //If the inputed details are incorrect or the account doesnt exist,
      //the user is taken back to the login page and is greeted with the error below.
      //https://www.w3schools.com/jsref/jsref_encodeuricomponent.asp
      //In the above link I learned how to encode the uri to prevent XSS.
      var errorMessage = "Invalid email/password!";
      var encodedError = encodeURIComponent(errorMessage);
      res.redirect("/login?&error=" + errorMessage);
     }
    }
  })
  console.log(pass_word)
})

module.exports = router;