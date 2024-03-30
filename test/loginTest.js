var login = require("../routes/login");
var assert = require("chai").assert;
var bcrypt = require('bcrypt');

describe('login', function(){
  it("Valid password.", async function create(){
    var pass_word = "password1"
    var pass = "$2a$05$yvHo6wr5kC4FqQKvGEXqF.RUIw0sO3NtuZHNzNDz1TSAjypDhvzuS";
    var check = await bcrypt.compare(pass_word,pass);
    var testResult = false;

    if(check){
      testResult = true;
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,true)
  });

  it("Invalid password.", async function create(){
    var pass_word = "testPassword1"
    var pass = "$2a$05$yvHo6wr5kC4FqQKvGEXqF.RUIw0sO3NtuZHNzNDz1TSAjypDhvzuS";
    var check = await bcrypt.compare(pass_word,pass);
    var testResult = false;

    if(check){
      assert.equal(testResult,true)
    }
    else{
      testResult = false;
    }

    assert.equal(testResult,false)
  });
});
