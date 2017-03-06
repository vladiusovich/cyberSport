(function () {
    var buttonSend = $("#chat__button");

     var sendChatMessege = function() {
        var data = $("#chat__input-text").val();
        console.log(data);
    };

    window.sendChatMessege = sendChatMessege;
});