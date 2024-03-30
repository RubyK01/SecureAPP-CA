var signup = require("../routes/signup");
var assert = require("chai").assert;

describe('signup', function(){
  it("Valid account creation.", function create(){
    var fName = "John";
    var lName = "Cena";
    var userName = "Jcena"
    var email = "jcena@email.com"
    var pass_word = "testPassword1"
    var testResult = false;

    if(pass_word.includes("0") || pass_word.includes("1") || pass_word.includes("2") || pass_word.includes("3") || pass_word.includes("4") || pass_word.includes("5") || pass_word.includes("6") || pass_word.includes("7") || pass_word.includes("8") || pass_word.includes("9") && email.includes("@")){
      testResult = true;
    }
    else if(!email.includes("@") || !email.includes(".")){
      testResult = false;
    }
    else if(fName.includes("0") || fName.includes("1") || fName.includes("2") || fName.includes("3") || fName.includes("4") || fName.includes("5") || fName.includes("6") || fName.includes("7") || fName.includes("8") || fName.includes("9")){
      testResult = false;
    }
    else if(lName.includes("0") || lName.includes("1") || lName.includes("2") || lName.includes("3") || lName.includes("4") || lName.includes("5") || lName.includes("6") || lName.includes("7") || lName.includes("8") || lName.includes("9")){
      testResult = false;
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,true);
  });
});

describe('signup', function(){
  it("Invalid account creation.", function create(){
    var fName = "Joh4n";
    var lName = "Ce2na";
    var userName = "Jcena"
    var email = "jcenaemailcom"
    var pass_word = "testPasswor1"
    var testResult = false;

    if(pass_word.includes("0") || pass_word.includes("1") || pass_word.includes("2") || pass_word.includes("3") || pass_word.includes("4") || pass_word.includes("5") || pass_word.includes("6") || pass_word.includes("7") || pass_word.includes("8") || pass_word.includes("9") && email.includes("@")){
      testResult = true;
    }
    else if(!email.includes("@") || !email.includes(".")){
      testResult = false;
    }
    else if(fName.includes("0") || fName.includes("1") || fName.includes("2") || fName.includes("3") || fName.includes("4") || fName.includes("5") || fName.includes("6") || fName.includes("7") || fName.includes("8") || fName.includes("9")){
      testResult = false;
    }
    else if(lName.includes("0") || lName.includes("1") || lName.includes("2") || lName.includes("3") || lName.includes("4") || lName.includes("5") || lName.includes("6") || lName.includes("7") || lName.includes("8") || lName.includes("9")){
      testResult = false;
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,true);
  });
});

describe('signup', function(){
  it("Invalid password", function create (){
    var fName = "John";
    var lName = "Cena";
    var userName = "Jcena"
    var email = "jcena@email.com"
    var pass_word = "testPassword"
    var testResult = false;

    if(pass_word.includes("0") || pass_word.includes("1") || pass_word.includes("2") || pass_word.includes("3") || pass_word.includes("4") || pass_word.includes("5") || pass_word.includes("6") || pass_word.includes("7") || pass_word.includes("8") || pass_word.includes("9") && email.includes("@")){
      testResult = true;
    }
    else if(!email.includes("@") || !email.includes(".")){
      testResult = false;
    }
    else if(fName.includes("0") || fName.includes("1") || fName.includes("2") || fName.includes("3") || fName.includes("4") || fName.includes("5") || fName.includes("6") || fName.includes("7") || fName.includes("8") || fName.includes("9")){
      testResult = false;
    }
    else if(lName.includes("0") || lName.includes("1") || lName.includes("2") || lName.includes("3") || lName.includes("4") || lName.includes("5") || lName.includes("6") || lName.includes("7") || lName.includes("8") || lName.includes("9")){
      testResult = false;
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,false);
  })
});

describe('signup', function(){
  it("Invalid email", function create (){
    var fName = "John";
    var lName = "Cena";
    var userName = "Jcena"
    var email = "jcenaemail.com"
    var pass_word = "testPassword"
    var testResult = false;

    if(pass_word.includes("0") || pass_word.includes("1") || pass_word.includes("2") || pass_word.includes("3") || pass_word.includes("4") || pass_word.includes("5") || pass_word.includes("6") || pass_word.includes("7") || pass_word.includes("8") || pass_word.includes("9") && email.includes("@")){
      testResult = true;
    }
    else if(!email.includes("@") || !email.includes(".")){
      testResult = false;
    }
    else if(fName.includes("0") || fName.includes("1") || fName.includes("2") || fName.includes("3") || fName.includes("4") || fName.includes("5") || fName.includes("6") || fName.includes("7") || fName.includes("8") || fName.includes("9")){
      testResult = false;
    }
    else if(lName.includes("0") || lName.includes("1") || lName.includes("2") || lName.includes("3") || lName.includes("4") || lName.includes("5") || lName.includes("6") || lName.includes("7") || lName.includes("8") || lName.includes("9")){
      testResult = false;
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,false);
  })
});

describe('signup', function(){
  it("Username not in use.", function create (){
    var userName = "Jcena1"
    var checkUsername = "Jcena"
    var testResult = false;

    if(userName != checkUsername){
      testResult = true;
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,true);
  })
});

describe('signup', function(){
  it("Email not in use.", function create (){
    var email = "jcena1@email.com"
    var checkEmail = "jcena@email.com"
    var testResult = false;

    if(email != checkEmail){
      testResult = true;
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,true);
  })
});
