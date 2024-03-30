var express = require('express');
var router = express.Router();
var session = require('express-session');
var mysql = require('mysql');
var connection_details = require("../modules/connection_details");
var upload = require('express-fileupload');
var path = require('path');

//Made by Tomas.
//to get upload Product page.
router.get('/', function(req, res, next) {
  //If the user is not logged into an account while trying to go to this page,
  //they will be taken back to the login page with the following error message.
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
  var userName = req.session.username;
  var message = req.query.message
  var error = req.query.error;
  var loggedIn = req.session.loggedIn
  var customerID = req.session.userID;
  var products = connection.query("SELECT * from products WHERE customerID = '"+customerID+"';");
  var productIMG = connection.query("SELECT * from productIMG WHERE customerID = '"+customerID+"';");
  res.render('uploadProduct',
  { title: 'uploadProduct',
    userName: userName,
    error: error,
    message: message,
    loggedIn: loggedIn,
    products: products,
    productIMG: productIMG,
    loggedIn: loggedIn
  });
});

//https://www.youtube.com/watch?v=hyJiNTFtQic&t=2s
//Above is where I learned how to use express-fileupload
router.post('/upload', async function(req, res, next){
  var connection = mysql.createConnection({
    host: connection_details.host,
    user: connection_details.user,
    password: connection_details.password,
    database: connection_details.database
  });
  var customerID = req.session.userID;
  var productName = req.body.productName;
  var price = parseFloat(req.body.price);
  let image;
  let uploadPath;

  if(!req.files || Object.keys(req.files).length === 0){
    res.redirect("/uploadProduct"+"?&error=File not uploaded!");
  }
  image = req.files.image;

  if(price <= 0){
    res.redirect("/uploadProduct"+"?&error=Price must be a positive value!");
  }
  else if(productName.includes("<") || productName.includes(">") || productName.includes("!") || productName.includes("$") || productName.includes("{") || productName.includes("}")){
    res.redirect("/uploadProduct"+"?&error=Invalid product name!");
  }
  else{
    //Had an issue with  __dirname as it would start from the routes folder so I had
    //figure out how to make it go back 1 level.
    //https://dev.to/ayenyeinsan/how-to-go-back-directory-in-nodejs-gg3
    let goBack = path.join(__dirname,'../');
    uploadPath = goBack + "/public/userSubmittedProducts/" + image.name;
    console.log(image);
    image.mv(uploadPath);
    var imageName = image.name
    connection.query("INSERT INTO products(productName, price, customerID) VALUES ((?),(?),(?));", [productName, price, customerID]);
    connection.query("INSERT INTO productIMG(image, customerID) VALUES ((?),(?));", [imageName, customerID]);
    res.redirect("/uploadProduct"+"?&message=Product uploaded!");
  }
});

module.exports = router;
