/* It looks like we are connecting to 2 different sockets...
   Instead they are just 2 channels of the same socket connection!
*/
var chatInfra = io.connect('/chat_infra'),
    chatCom = io.connect('/chat_com');

chatInfra.on('name_set', function (data) {

    // For each channel we can register multiple event-handlers...
    chatInfra.on("user_entered", function (user) {
        $('#messages').append('<div class="systemMessage">' + user.name
            + ' has joined the room.' + '</div>');
    });

    // ...another event-handler...
    chatInfra.on('message', function (message) {
        var message = JSON.parse(message);
        $('#messages').append('<div class="' + message.type + '">'
            + message.message + '</div>');
    });

    // ...and another event-handler on a different channel
    chatCom.on('message', function (message) {
        var message = JSON.parse(message);
        $('#messages').append('<div class="' + message.type + '"><span class="name">'
            + message.username + ":</span> "
            + message.message + '</div>');
    });

    $('#nameform').hide();
    $('#messages').append('<div class="systemMessage">Hello ' + data.name + '</div>');
    $('#send').click(function () {
        var data = {
            message:$('#message').val(),
            type:'userMessage'
        };
        chatCom.send(JSON.stringify(data));
        $('#message').val('');
    });

});

$(function () {
    $('#setname').click(function () {
        chatInfra.emit("set_name", {name:$('#nickname').val()});
    });

    // When you press enter on the textfield,
    // it automatically clicks on the button "send"
    $('#message').keypress(function(e){
        if (e.which == 13){ // on enter!
            $( "#send" ).trigger( "click" );
        }
    });

});