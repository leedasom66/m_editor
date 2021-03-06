#!/usr/bin/env node
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(3000, function() {
    console.log((new Date()) + ' Server is listening on port 3000');
});

var clients = [];
var ip = [];
var connectionIDCounter=0;
var clientID = 0;

wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept(null, request.origin);
    // clients.push(connection);
    connection.id = connectionIDCounter ++;
    clients[connection.id] = connection;

    console.log((new Date()) + ' Connection accepted.' + connection.remoteAddress);
    ip[connection.id] = connection.remoteAddress;


    connection.on('message', function(message) {

        if (isNaN(message) === false) {

            for (var i = 0; i < connection.id; i++) {
                if (message.utf8Data === i)
                    clientID = i;
                console.log(clientID);
            }
        }

       if(message.utf8Data === "detect") {
            clients.forEach(function (client) {
                client.sendUTF(ip);
            });
        }
        else if (message.utf8Data === "color") {
            console.log('Received Message: ' + message.utf8Data);

            // clients[clientID].sendUTF(message.utf8Data);

            clients.forEach(function (client) {
                client.sendUTF(message.utf8Data);
            });
        }
        //
        // else if (message.type === 'utf8') {
        //     console.log('Received Message: ' + message.utf8Data);
        //
        //     clients.forEach(function (client) {
        //         client.sendUTF(message.utf8Data);
        //     });
        //
        // }

        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            clients.forEach(function (client) {
                client.sendBytes(message.binaryData);
            });
        }

    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
        delete clients[connection.id];
        delete ip[connection.id];

    });
});