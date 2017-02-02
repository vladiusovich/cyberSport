
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
    $( ".chat_ban-actions" ).click(banActions.displayMenu);
    $( ".ban-actions__act" ).click(banActions.sendData);
    $( ".ban-actions-menu__close" ).click(banActions.closeMenu);

    $(document).scroll(function () {
        banActions.getMenu.css("display", "none");
    });

    $(".chat__dialog").scroll(function () {
        banActions.getMenu.css("display", "none");
    });


});


window.onclick = function(event) {
    if (!$(event.target).closest(banActions.getMenu).length) {
        banActions.getMenu.css("display", "none");
    }
}



/*

// Hide the modal dialog when someone clicks outside of it.
$(".ban-actions-menu").bind( "clickoutside", function(event){
    if ( banActions.getMenu.css("display") == "block") {
        console.log(banActions.getMenu.css("display"));
        // $(this).hide();
    }
});

$(document.body).click(function(e){
    var $box = banActions.getMenu;
    var isBlock = false;
    console.log(e.target);

    if(e.target.class !== '.ban-actions-menu' && !$.contains($box[0], e.target) && isBlock) {
        $box.remove();
        isBlock = true;
    }

});

 $(document).click(function(e) {
 var target = e.target;

 if (!$(target).is('.ban-actions-menu') && !$(target).parents().is('.ban-actions-menu')) {
 $('.ban-actions-menu').hide();
 }
 });



*/

