require('newrelic');
var express = require('express')
	, app = express()
  	, server = require('http').createServer(app);

var port = process.env.PORT||5566;
var net = require('net');
var Logger = require('./Logger.js');


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
 
}).listen(port);
 
Logger.log("Log Server Running web socket at port " + port);