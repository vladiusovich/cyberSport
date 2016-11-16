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
            chat.style.backgroundColor = "rgb(85, 85, 85)";
        }
        isToggle = true
    }
    else {
        chat.style.transform = "translateX(-310px)";
        wrapper.style.marginLeft = "0";
        isToggle = false;
    }
}



/*
function PushSideNav() {
    var slideNav;
    var wrapperPage;
    var toggleButton;
    var isToggle = false;

    function toggle() {
        // var slideNav = document.getElementsByClassName("chat--aside")[0];
        // var wrapperPage = document.getElementsByClassName("wrap-page")[0];

        if (!isToggle) {
            console.log(chat);
            slideNav.style.transform = "translateX(0)";
            wrapperPage.style.marginLeft = "300px";
            isToggle = true
        }
        else {
            slideNav.style.transform = "translateX(-300px)";
            wrapperPage.style.marginLeft = "0";
            isToggle = false;
        }
    }
    that = this;

    return {
        init: function (toggleButton, slideNav, wrapper) {
            that.toggleButton  = $(toggleButton);
            that.slideNav = $(slideNav);
            that.wrapper = $(wrapper);
        },

        get: function () {
            console.log(that.toggleButton);
            console.log(that.slideNav);
            console.log(that.wrapper);
        }
    }
};


$( document ).ready(function() {
    var m = PushSideNav();
    m.init("chat__toggle", "chat--aside", "wrap-page");
    m.get();

});
    */