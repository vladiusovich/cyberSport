var toggleChat =   document.getElementsByClassName("chat__toggle")[0];

var isToggle = false;

function toggle() {
    var chat = document.getElementsByClassName("chat--aside")[0];
    var wrapper = document.getElementsByClassName("page-container")[0];
    var w = document.documentElement.clientWidth;

    if (!isToggle) {
        console.log(chat);
        chat.style.transform = "translateX(0px)";
        if (w > 900) {
            wrapper.style.marginLeft = "300px";
        }
        isToggle = true
    }
    else {
        chat.style.transform = "translateX(-310px)";
        wrapper.style.marginLeft = "0";
        isToggle = false;
    }
}


//set bottom of message dialog
$(document).ready(function(){
    $('.chat__dialog').animate({
        scrollTop: $('.chat__dialog')[0].scrollHeight}, 500);
}); 