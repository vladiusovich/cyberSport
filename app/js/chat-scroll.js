
//scroll chat-dialog to bottom
$('.chat__tabs > li').click(function(){
    var i = 0;
    var chatDialog = $('.chat__dialog');
    for (; i < chatDialog.length; i++) {
        if (chatDialog[i].scrollTop !== chatDialog[i].scrollHeight) {
            chatDialog.animate({
                scrollTop: chatDialog[i].scrollHeight}, 200);
        }
    }
});


