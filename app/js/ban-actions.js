
var banActions = (function () {
    var user, userName;
    var menu = $(".ban-actions-menu");

    function getBanMenu(e) {
        e.stopPropagation();
        menu.css("display", "none");
        user = $(this).next();
        userName = user.find(".chat__user-name").text();
        var position = $(this).offset();
        display_ban_actions(position.left, position.top);
    }

    function closeMenu() {
        menu.css("display", "none");
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

    $(".flexnav").flexNav();


// Удалить рекламу н веременном сервере
    // $('body > div').filter(function(){
    //         return $(this).css("height") === "65px";
    //     }).remove();
    // $('body > center').remove();
    // $('body > div[style~="opacity:"]').remove();

});

window.onclick = function(event) {
    if (!$(event.target).closest(banActions.getMenu).length) {
        banActions.getMenu.css("display", "none");
    }
}



