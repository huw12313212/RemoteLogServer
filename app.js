var express = require('express')
	, app = express()
  	, server = require('http').createServer(app)
    , io = require('socket.io').listen(server,{ log: false });

var port = process.env.PORT||5566;
var monitorPort = 5567;
//var net = require('net');
var Logger = require('./Logger.js');
var ws = require("nodejs-websocket");


server.listen(monitorPort);

app.use(express.static(__dirname+"/client/"));

app.use(express.favicon());
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/client/index.html');
});

// LoggerServer
var server = ws.createServer(function (conn) {
    Logger.log("New connection")
    conn.on("text", function (str) {

        var array = str.split(/[ ,\":]/);

        var data = {};
        data.hour = parseFloat(array[1]);
        data.min = parseFloat(array[2]);
        data.sec = parseFloat(array[3].split('.')[0]);
        data.millisecond =  (parseFloat(array[3])*1000)%1000;

        jsonStr = str.split("]")[1];
        json = JSON.parse(jsonStr);
        // Logger.log(JSON.stringify(json));
        data.P = parseFloat(json["R-PID-P"]);
        data.I = parseFloat(json["R-PID-I"]);
        data.D = parseFloat(json["R-PID-D"]);
        data.yaw = parseFloat(json["y"]);
        data.pitch = parseFloat(json["p"]);
        data.roll = parseFloat(json["r"]);
        data.motor = [];
        data.motor.push(parseInt(json["front"]));
        data.motor.push(parseInt(json["left"]));
        data.motor.push(parseInt(json["back"]));
        data.motor.push(parseInt(json["right"]));

        io.emit('data', data);
        Logger.log(JSON.stringify(data));



        //conn.sendText(str.toUpperCase()+"!!!")
    })
    conn.on("close", function (code, reason) {
        Logger.log("Connection closed")
    })
}).listen(port);
 
Logger.log("Log Server Running web socket at port " + port); 
Logger.log("Log Monitor Running web socket at port " + monitorPort);


io.sockets.on('connection', function (socket) {
    //show all clients
    console.log(socket.id + "connected");

    //disconnect
    socket.on('disconnect',function(){
        console.log(socket.id+' disconnect!');
    });

});