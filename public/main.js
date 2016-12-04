$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');

    //function for adding user message
    var addMessage = function(message) {
        messages.append('<div>' + message + '</div>');
    };

    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        }

        var message = input.val();
        addMessage(message);
        socket.emit('message', message);
        input.val('');
    });
    socket.on('message', addMessage);
});

//log in page?
//chat page?
//function to store user id at login?
//function to notify of added user
//function to notify of left user

