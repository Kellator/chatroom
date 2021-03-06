$(document).ready(function() {
    var socket = io();
    var input = $('input');
    var messages = $('#messages');
    var $userNameInput = $('.userName');
    var userName;
    

    $(function() {
        $('#chatroom').hide();
    });
    //function for adding user message
    var addMessage = function(data) {
        console.log(data);
        messages.append('<div>' + data.user + ': '+ data.message+'</div>');
    };
    //logs keystrokes for user message input
    input.on('keydown', function(event) {
        if (event.keyCode != 13) {
            return;
        };
        if (userName) {
            var message = input.val();
            addMessage({message: message, user: userName});
            socket.emit('message', message);
            input.val('');
        } else {
            setUsername();
        };
    });
    //shows login page, sets username to be used in chat space then moves user to chatroom
    function setUsername() {
        userName = $userNameInput.val().trim();
        if (userName) {
            $('#loginPage').hide();
            $('#chatroom').show();
            $('loginPage').off('click');
            socket.emit('addUser', userName);
            console.log(userName);
        }
    };
    //displays connected username and how many users are in chat
    socket.on('login', function(data){
      var msg ='<br/><small>' + data.user + ' has connected</small><br /> There are ' + data.userCount + ' users connected';
      console.log('In login: ',data);
      messages.append(msg);
    });
    //displays message when a user has disconnected - showing who has left and how many users remain.
    socket.on('userDisconnect', function(data){
      var msg ='<small>' + data.user + ' has disconnected<br /> There are ' + data.userCount + ' users connected</small><br/>';
      if (data.userCount > 0) {
        messages.append(msg);
      }
    });
    socket.on('message', addMessage);
});


