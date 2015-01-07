var fs = require('fs');

var Logger = {};

module.exports = Logger;

Logger.label = "Log";

Logger.log = function(str)
{
  console.log("["+this.label+"]"+str);


  fs.appendFile('log.log', str+"\n", function (err) {
    if (err) 
      {
        throw err;
      }
  });

}

//Logger.log("test");