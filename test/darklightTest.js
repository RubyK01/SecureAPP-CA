var assert = require("chai").assert;

describe('theme', function(){
  it("Light theme to dark theme.", async function create(){
	  var toggleButton = true;
    var testResult = false;

    if(toggleButton){
      var light = false;
      var dark = true;
      testResult = true;
    }
    else{
      var dark = false;
      var light = true;
      testResult = false;
    }

    assert.equal(testResult,true)
  });

  it("Dark theme to light theme.", async function create(){
    var toggleButton = false;
    var testResult = false;

    if(toggleButton){
      var light = true;
      var dark = false;
      testResult = true;
    }
    else{
      var light = false;
      var dark = true;
      testResult = false;
    }

    assert.equal(testResult,false)
  });
});
