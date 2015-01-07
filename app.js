var express = require('express')
	, app = express()
  	, server = require('http').createServer(app);

var port = process.env.PORT||5566;
//var net = require('net');
var Logger = require('./Logger.js');
var ws = require("nodejs-websocket");

// Start a TCP Server
var server = ws.createServer(function (conn) {
    Logger.log("New connection")
    conn.on("text", function (str) {

        //console.log(conn);
        Logger.log(str)
        //conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        Logger.log("Connection closed")
    })
}).listen(port);
 
Logger.log("Log Server Running web socket at port " + port);