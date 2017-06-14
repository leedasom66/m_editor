var upnp = require("peer-upnp");
var http = require("http");
var webSocketServer = require('websocket').server;
var express = require("express");
var app = express();
var path = require("path");
var httpServer = http.createServer();
var upnpServer = http.createServer();
var httpPORT = 8080;
var upnpPORT = 8000;
var users = [];
var addUser = false;
var index = 0;
var host = "";
var sendText;
var connection;

httpServer.listen(httpPORT, function() {
	console.log('Express server listening on port ' + httpPORT);
});

var wsServer = new webSocketServer({
	// WebSocket server is tied to a HTTP server.
	httpServer : httpServer
});

wsServer.on('request', function(request) {
	connection = request.accept(null, request.origin);
	console.log("OK");

	connection.on('message', function(message) {
		console.log(message.utf8Data);
		//connection.sendUTF(JSON.stringify({data : 'data'}));
		//connection.send
	});

	sendText = function (ip, bgcolor) {
		console.log(ip + "333" + bgcolor);
		connection.sendUTF(JSON.stringify({
			ip : ip,
			color : bgcolor
		}));
		console.log("sendIt");
	}

	// disconnected
	connection.on('close', function(connection) {
	});
});

// start server on port 8000. please do this step before you create a peer
upnpServer.listen(upnpPORT);

// Create a UPnP Peer.
var peer = upnp.createPeer({
	prefix : "/upnp",
	server : upnpServer
}).on("ready", function(peer) {
	console.log("The Display Device is ready");
	host = peer.hostname.toString();
	console.log(host);
	// advertise device after peer is ready
	sampleTV.advertise();
}).on("close", function(peer) {
	console.log("closed");
}).start();

// console.log(peerHost + ":" + peerPort);

var sampleTV = peer.createDevice({
	autoAdvertise : false,
	uuid : "6bd5eabd-b7c8-4f7b-ae6c-a30ccdeb5900",
	productName : "sampleTV3",
	productVersion : "0.0.1",
	domain : "schemas-upnp-org",
	type : "sampleTV",
	version : "1",
	friendlyName : "sampleTV",
	manufacturer : "Sookmyung Univ",
	manufacturerURL : "http://www.sookmyung.ac.kr",
	modelName : "sampleTV",
	modelDescription : "sampleTV",
	modelNumber : "0.0.1",
	modelURL : "http://www.sookmyung.ac.kr",
	serialNumber : "1111-2222-3333-9999",
	UPC : "123456789101109"
});

var service = sampleTV.createService({
	domain : "schemas-upnp-org",
	type : "sampleService",
	version : "1",

	// Service Implementation
	implementation : {
		GetUserInfo : function(inputs) {
		},
		SetNewUserInfo : function(inputs) {
			this.set("UserInfo", inputs.NewUserInfoValue);

			var name = this.get("UserInfo");
			addUser = true;

			//console.log(name);

			for (var j = 0; j < index; j++) {
				if (name === users[j]) {
					return;
				}
			}
			users[index] = name;
			//console.log("user " + index + " info :" + users[index]);
			//console.log(addUser);
			index++;

			// notify state change of the state variable to all subscribers
			this.notify("UserInfo");
		},
		SetBackground : function(inputs) {
			this.set("ServerIP", inputs.NewServerIP);
			this.set("BGColor", inputs.NewColor);

			var ip = this.get("ServerIP");
			var bgcolor = this.get("BGColor");

			console.log("before sendText");
			sendText(ip, bgcolor);

			console.log(ip + " /// " + bgcolor);
		}
	},
	// Service Description. this will be converted to XML
	description : {
		actions : {
			GetUserInfo : {
			},
			SetNewUserInfo : {
				inputs : {
					NewUserInfoValue : "UserInfo"
				}
			},
			setBackground : {
				inputs : {
					NewServerIP : "ServerIP",
					NewColor : "BGColor"
				}
			}
		},
		variables : {
			UserInfo : "string",
			ServerIP : "string",
			BGColor : "string"
		}
	}
});

service.set("UserInfo", "test");
