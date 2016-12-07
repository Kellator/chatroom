//code not original work - takem from socket.IO documentation
var socket_io = require('socket.io');
var http = require('http');
var express = require('express');

var app = express();
app.use(express.static('public'));

var server = http.Server(app);
var io = socket_io(server);

var users = {};
var userCount = 0;


io.on('connection', function (socket) {
    console.log('Client connected');
    var addedUser = false;
    socket.on('message', function(message) {
        console.log('Received message:', message);
        socket.broadcast.emit('message', message);
    });
    socket.on('addUser', function(user) {
        socket.userName = user;
        users[user] = user;
        console.log(user);
        ++userCount;
        addedUser = true;
        socket.broadcast.emit('login', {
            user: user,
            userCount: userCount
        });
    });
    //shows user typing
    socket.on('typing', function() {
        socket.broadcast.emit('typing', {
            user: socket.userName
        });
    });
    //upon user disconnect, user deleted from list and user disconnect message logged
    socket.on('disconnect', function() {
        if (addedUser) {
            delete users[socket.userName];
            --userCount;
        }
        socket.broadcast.emit('userDisconnect', {
            user: socket.userName,
            userCount: userCount
        });
        console.log('disconnect: ', socket.userName);
    });

});

server.listen(process.env.PORT || 8080);