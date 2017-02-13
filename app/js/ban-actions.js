
var banActions = (function () {
    var userName;
    var menu = $(".ban-actions-menu");

    function getBanMenu(e) {
        e.stopPropagation();
        menu.css("display", "none");
        userName = $(this).parent().find(".chat__user").find(".chat__user-name").text();
        console.log(userName);
        var position = $(this).offset();
        display_ban_actions(position.left, position.top);
    }

    function closeMenu() {
        menu.css("display", "none");
    }




    function display_ban_actions(x, y) {
        var menu = $(".ban-actions-menu");
        var menuWidth = menu.css("width");
        var left = (x + 20);
        var styles = {
            display: "block",
            opacity: 1,
            top: y + 25,
            left: left
        };

        if (menu.css("display") == "none") {
            menu.css(styles);

        } else {
            menu.css( {display: "none"} );

        }
    }

    function sendData() {
        var banOption = $("input[type='radio']:checked").val();

        if (banOption == undefined) {
            return;
        }
        console.log(banOption + "  -- " + userName);
        $.ajax({
            type: "POST",
            url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
            contentType: "application/json; charset=utf-8",
            data: {banOption: banOption, userName: userName},
            dataType: "json",
            success: function (result) {
                console.log('It worked!');
                //  returning something
                console.log('result... ' + result);

            },
            error: function (result) {
                console.log('Error :(');
            }
        });
    }

    return {
        displayMenu: getBanMenu,
        sendData: sendData,
        closeMenu: closeMenu,
        getMenu: (function () {
            return menu;
        })()
    }


})();





$(document).ready(function(){

    $(".flexnav").flexNav({'hoverIntent': false});

    $( ".chat_ban-actions" ).click(banActions.displayMenu);
    $( ".ban-actions__act" ).click(banActions.sendData);
    $( ".ban-actions-menu__close" ).click(banActions.closeMenu);

    $(document).scroll(function () {
        banActions.getMenu.css("display", "none");
    });

    $(".chat__dialog").scroll(function () {
        banActions.getMenu.css("display", "none");
    });



// Удалить рекламу н веременном сервере
    // $('body > div').filter(function(){
    //         return $(this).css("height") === "65px";
    //     }).remove();
    // $('body > center').remove();
    // $('body > div[style~="opacity:"]').remove();

});

//
//
// $(chatWindow).append('<li class="chat__messenge"><a class="chat_ban-actions" onClick='$( ".chat_ban-actions" ).click(banActions.displayMenu);'><i aria-hidden="true" class="fa fa-ban"></i></a><div class="chat__user">' +
//     '<div class="chat__avatar"><img src="https://support.rockstargames.com/system/photos/0001/4510/9157/profile_image_877736018_61840.png"></div>' +
//     '<em class="chat__user-name">' + name +'</em>' +
//     '<em class="chat__time">' + time + '</em></div>' +
//     '<p class="chat__messenge-content">' + text + ' [' + room + '/' + counterIds + ']' + '</p></li>');

window.onclick = function(event) {
    if (!$(event.target).closest(banActions.getMenu).length) {
        banActions.getMenu.css("display", "none");
    }
}



