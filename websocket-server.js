#!/usr/bin/env node

var config = require('./config.json')  /// Configuration file with useful parameters

const http = require('http');                         /// http module
const wsserver = require('websocket').server;         /// websocket module (npm install websocket)

/// 1) Create http server and listening.
/// This is not a web server, it is just because we use *WEB*Sockets. 
var httpserver = http.createServer(function(request, response) {});
var port = config.ws.port            /// Listening on this port from the configuration file.
httpserver.listen(port, function(){                 /// SET SAME PORT ON CLIENT SIDE!
    console.log(utc() + ' --- Server is listening on port '+port);
});

/// 2) Create websocket server
ws = new wsserver({ httpServer: httpserver });

/// 3) Create listener for  connections
var count = 0;                                  /// Reset clients counter
var clients = {};                               /// Store connected client
ws.on('request', function(r){                   /// Listen connections
    var connection = r.accept('echo-protocol', r.origin); /// Accept the connection
    var id = count++;                           /// Specific id for this client & increment count
    clients[id] = connection;                   /// Store the connection method so we can loop through & contact all clients
    console.log(utc() + ' → Peer ' + connection.remoteAddress + ' connected. Connection id: '+id);    
    console.log(utc() + ' → Peer ' + connection.remoteAddress + ' connected. Connection id: '+id);    
    
    /// 3a) Listen for incoming messages and broadcast
    connection.on('message', function(message){ /// Create event listener
	var msgString = message.utf8Data;       /// The string message that was sent to us		
	console.log(' Peer ' + id + " sent me this: " + msgString);
	for(var i in clients)
	    /// Send a message to the client with the message
            clients[i].sendUTF('I am the server. Client n°' + id +' said: ' + msgString);     
    });
    
    /// 3b) Listen for client disconnection
    connection.on('close', function(reasonCode, description){ /// Create event listener
	delete clients[id];
	console.log((utc()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
    
}); /// ws.on

function utc(){
    var a=new Date()
	.toISOString()
	.slice(0,-5);
    return a
    //    replace(/\..+/, '') /// delete the dot and everything after
}
