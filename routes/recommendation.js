var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details");

//By Tomas & Glen.
//To get recommendation page.
router.get('/', function(req, res, next) {
  //login checker by Tomas.
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the follow error message.
  var loggedIn = req.session.loggedIn;
  if(!req.session.loggedIn === true){
    res.redirect("/login"+"?&error=Please login to view page!");
  }
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  var error = req.query.error;
 // var recProducts = connection.query("SELECT * FROM recProducts");
  res.render('recommendation', { title: 'Recommendation', error: error, loggedIn:loggedIn});
});

//Tomas attempted to help Glen in getting products to recommend from the database.
router.post('/rec', async function(req,res,next){
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  var recProducts;
  var rec1 = req.body.deviceType;
  var rec2 = req.body.price1;
  var rec2Compare = req.body.price2;
  var rec3 = req.body.use;

  var types = ["Laptop","Desktop"];
  var uses = ["Work","Games","Casual"];

  if(!types.includes(rec1.ignoreCase) && !uses.includes(rec3.ignoreCase)){
    recProducts = connection.query("SELECT * FROM recProducts WHERE price > '"+rec2+"' AND price < '"+rec2Compare+"' AND productType = '"+rec1+"' AND productUse = '"+rec3+"' ;");
    res.redirect("/recommendation");
  }
  else{
    res.redirect("/recommendation"+"?&error=Cannot find product(s)!");
  }
});
module.exports = router;
