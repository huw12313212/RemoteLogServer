//var fs = require('fs');

var Logger = {};

module.exports = Logger;

Logger.label = "Log";

Logger.log = function(str)
{
  console.log("["+this.label+"]"+str);
}

//Logger.log("test");