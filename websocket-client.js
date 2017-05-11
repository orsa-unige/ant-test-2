#!/usr/bin/env node

var config = require('./config.json')  /// Configuration file with useful parameters

var wsclient = require('websocket').client; /// Create a websocket client
 
var client = new wsclient();
 
client.on('connectFailed', function(error) {
    console.log('Connect Error: ' + error.toString());
});
 
client.on('connect', function(connection) {
    console.log('WebSocket Client Connected');
    connection.on('error', function(error) {
        console.log("Connection Error: " + error.toString());
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log("Received: '" + message.utf8Data + "'");
        }
    });
    
    function sendNumber() {
        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 2000);
        }
    }
    sendNumber();
});
 
client.connect('ws://'+config.ws.ip+":"+config.ws.port, 'echo-protocol');
