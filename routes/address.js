var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection_details = require("../modules/connection_details");
var bcrypt = require('bcrypt');

//Made by Tomas.
//to get signup page.
router.get('/', function(req, res, next) {
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the following error message.
  if(!req.session.loggedIn === true){
    res.redirect("/login"+"?&error=Please login to view page!");
  }
  var loggedIn = req.session.loggedIn;
  var error = req.query.error;
  var message = req.query.message;
  var addressline1 = req.body.addressline1;
  var addressline2 = req.body.addressline2;
  var townOrCity = req.body.townOrCity;
  var county = req.body.county;
  var zipCode = req.body.zipCode;
  var customerID = req.session.userID;
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  var address = connection.query("SELECT * FROM address WHERE customerID ='"+customerID+"';");
  res.render('address', { title: 'address' , error: error, message: message, address: address, loggedIn:loggedIn});
});

//for adding an address.
// The address function is async as we expect more than one user would be using it.
router.post('/create', async function (req, res, next){
  var addressline1 = req.body.addressline1;
  var addressline2 = req.body.addressline2;
  var townOrCity = req.body.townOrCity;
  var county = req.body.county;
  var zipCode = req.body.zipCode;
  var customerID = req.session.userID;
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  var countys = ["Antrim","Armagh","Carlow","Cavan","Clare","Cork","Derry",
  "Donegal","Down","Dublin","Fermanagh","Galway","Kerry","Kildare","Kilkenny",
  "Laois","Leitrim","Limerick","Longford","Louth","Mayo","Meath", "Monaghan",
  "Offaly","Roscommon","Sligo","Tipperary","Tyrone","Waterford", "Westmeath",
  "Wexford","Wicklow"];

  //To validate the address.
  for(var i = 0; i < townOrCity.length; i++){
    //Checking to see if the town/city input contains a number of.
    //https://thispointer.com/javascript-check-if-a-string-contains-numbers/
    if(!isNaN(townOrCity.charAt(i)) && !(townOrCity.charAt(i) === " ") ){
      //variable to hold result of the check.
      var towncheck = true;
      //check if county is valid.
      if(countys.includes(county.ignoreCase) && towncheck === true){
        //If the county is valid and the town/city does not have a number the address is valid.
        connection.query("INSERT INTO address(addressline1, addressline2, townOrCity, county, zipCode, customerID) VALUES (?, ?, ?, ?, ?, ?);", [addressline1, addressline2, townOrCity, county, zipCode, customerID]);
        res.redirect("/address");
      }
      else{
        res.redirect("/address"+"?&error=Invalid address.");
      }
    }
  }
});

module.exports = router;
