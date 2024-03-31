var express = require('express');
var router = express.Router();
var session = require('express-session');
var mysql = require('mysql');
var connection_details = require("../modules/connection_details");
var upload = require('express-fileupload');
var path = require('path');

//Made by Ruby.
//to get upload Product page.
// Create a MySQL connection pool
var connection = mysql.createPool({
  host: connection_details.host,
  user: connection_details.user,
  password: connection_details.password,
  database: connection_details.database
});

// Handle GET request to '/uploadProduct'
router.get('/', function(req, res, next) {
  // Check if the user is logged in
  if (!req.session.loggedIn) {
    return res.redirect("/login?error=Please login to view page!");
  }

  var userName = req.session.username;
  var message = req.query.message;
  var error = req.query.error;
  var loggedIn = req.session.loggedIn;
  var customerID = req.session.userID;

  // Execute database queries
  connection.query("SELECT * from products WHERE customerID = ?", [customerID], function(err, products) {
    connection.query("SELECT * from productIMG WHERE customerID = ?", [customerID], function(err, productIMG) {
      
      // Render the page with fetched data
      res.render('uploadProduct', {
        title: 'uploadProduct',
        userName: userName,
        error: error,
        message: message,
        loggedIn: loggedIn,
        products: products,
        productIMG: productIMG
      });
    });
  });
});

//https://www.youtube.com/watch?v=hyJiNTFtQic&t=2s
//Above is where I learned how to use express-fileupload
router.post('/upload', async function(req, res, next){
  var customerID = req.session.userID;
  var productName = req.body.productName;
  var price = parseFloat(req.body.price);
  let image;
  let uploadPath;

  if(!req.files || Object.keys(req.files).length === 0){
    var errorMessage = "File not uploaded!";
    var encodedError = encodeURIComponent(errorMessage);
    return res.redirect("/uploadProduct?error=" + encodedError);
  }

  image = req.files.image;

  if(price <= 0){
    var errorMessage = "Price must be a positive value!";
    var encodedError = encodeURIComponent(errorMessage);
    return res.redirect("/uploadProduct?error=" + encodedError);
  }
  else if(productName.includes("<") || productName.includes(">") || productName.includes("!") || productName.includes("$") || productName.includes("{") || productName.includes("}")){
    var errorMessage = "Invalid product name!";
    var encodedError = encodeURIComponent(errorMessage);
    return res.redirect("/uploadProduct?error=" + encodedError);
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
    var message = "Product uploaded!";
    var encodedMessage = encodeURIComponent(message);
    return res.redirect("/uploadProduct?message=" + encodedMessage);
  }
});

module.exports = router;
