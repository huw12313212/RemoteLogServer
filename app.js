var express = require('express')
	, app = express()
  	, server = require('http').createServer(app);

var port = process.env.PORT||5566;
var proxyPort = 5567;
var net = require('net');
var Logger = require('./Logger.js');
require('newrelic');

//server
server.listen(port);

//send game index.html
app.use(express.favicon());
app.get('/', function (req, res) {

  Logger.log("Server Checked");

  res.sendfile(__dirname + '/client/hello.html');
});
Logger.log("Server Alive-Checker Running at port" + port);
 
// Keep track of the chat clients
var servers = {};
// Start a TCP Server
net.createServer(function (socket) {
 
  // Identify this client
  socket.name = socket.remoteAddress + ":" + socket.remotePort;

  Logger.log("Connected : "+socket.name);
 
  socket.on('data', function (data) {

    Logger.log(data);
  });
 
  socket.on('end', function () {
     Logger.log("Disconnected : "+socket.name);
  });
 
}).listen(proxyPort);
 
Logger.log("Log Server Running web socket at port " + proxyPort);