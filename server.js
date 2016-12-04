//code not original work - takem from socket.IO documentation
var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);
//if numUsers increases - send message that a new user has entered the room
var numUsers = 0

var userConnect = false;
//user name set by user on log in - userName + " has entered the chat"
var userName = '';


io.on('connection', function (socket) {
    console.log('Client connected');
    ++numUsers;
    userConnect = true;
    console.log(numUsers);
    //sends messages to users
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
    socket.on('disconnect', function() {
        --numUsers;
        console.log('user has disconnected');
        console.log(numUsers);
        socket.broadcast.emit('message', message);
    });
});



server.listen(process.env.PORT || 8080);