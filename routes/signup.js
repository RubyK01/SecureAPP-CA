var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details");
var bcrypt = require('bcrypt');

//Made by Ruby.
//to get signup page.
router.get('/', function(req, res, next) {
  var error = req.query.error;
  var fName = req.body.fName;
  var lName = req.body.lName;
  var userName = req.body.userName;
  var email = req.body.email;
  var pass_word = req.body.pass_word;
  var loggedIn = req.session.loggedIn;
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  res.render('signup', { title: 'Signup' , error: error , loggedIn:loggedIn});
});

//for creating an account
// The Signup function is async as we expect more than one user would be using it.
router.post('/create', async function create(req, res, next){
  var error = req.query.error;
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
  var testResult;
  //sql query to get details from database so I can check later if the username or email already exists in the database.
  var getEmailUsername = "SELECT * FROM customer;";
  connection.query(getEmailUsername, async function(err, results){
    if(results.length){
      var checkEmail = results[0].email;
      var checkUsername = results[0].userName;
      //logic to check if inputted details are valid or not.
      if(email != checkEmail && userName != checkUsername){
        if(pass_word.includes("0") || pass_word.includes("1") || pass_word.includes("2") || pass_word.includes("3") || pass_word.includes("4") || pass_word.includes("5") || pass_word.includes("6") || pass_word.includes("7") || pass_word.includes("8") || pass_word.includes("9") && email.includes("@")){
          // Where I learned how to use bcrypt https://www.npmjs.com/package/bcrypt
          //Using salting it prevents Sensitive Data Exposure Vulnerability as the passwsord wont be plain text in db.
          var salt = await bcrypt.genSaltSync(5); //the amount of times I want to salt a password
          pass_word = await bcrypt.hashSync(pass_word,salt); // salting the password and storing it in a variable.
          connection.query("INSERT INTO customer(fName, lName, userName, email, pass_word) VALUES ((?), (?), (?), (?), (?));", [fName, lName, userName, email, pass_word]);
          console.log(req.body.fName , req.body.lName, req.body.userName, req.body.email, req.body.pass_word);
          console.log("hashed password: "+pass_word);
          res.redirect("/login"+"?message=Account created successfully!");
        }
        else if(!email.includes("@") || !email.includes(".")){
          res.redirect("/signup"+"?&error=Invalid email!");
        }
        else if(fName.includes("0") || fName.includes("1") || fName.includes("2") || fName.includes("3") || fName.includes("4") || fName.includes("5") || fName.includes("6") || fName.includes("7") || fName.includes("8") || fName.includes("9")){
          res.redirect("/signup"+"?&error=Invalid first name!");
        }
        else if(lName.includes("0") || lName.includes("1") || lName.includes("2") || lName.includes("3") || lName.includes("4") || lName.includes("5") || lName.includes("6") || lName.includes("7") || lName.includes("8") || lName.includes("9")){
          res.redirect("/signup"+"?&error=Invalid last name!");
        }
        else{
          res.redirect("/signup"+"?&error=Invalid password!");
        }
      }
      else if(userName === checkUsername){
        res.redirect("/signup"+"?&error=Username in use!");
      }
      else if(email === checkEmail){
        res.redirect("/signup"+"?&error=Email in use!");
      }
      else{
        res.redirect("/signup"+"?&error=Email and username in use!");
      }
    }
  });
});

module.exports = router;