
$( ".chat_ban-actions" ).click(function() {
    // var peer = $(this).attr("data-peer");

    var menu = $(".ban-actions-menu");
    menu.css("display", "none");

    var user = $(this).next();
    var user_name = user.find(".chat__user-name");
    console.log(user_name.text());

    var position = $(this).offset();
    display_ban_actions(position.top, position.left);

});


function display_ban_actions(x, y) {
    var menu = $(".ban-actions-menu");
    var styles = {
        display: "block",
        opacity: 1,
        top: x - 30,
        left: y + 30
    };

    if (menu.css("display") == "none") {
        menu.css(styles);

    } else {
        menu.css( {display: "none"} );

    }
}


$(document).ready(function(){
    var menu = $(".ban-actions-menu");

    $(document).scroll(function () {
        menu.css("display", "none");
    });

    $(".chat__dialog").scroll(function () {
        var menu = $(".ban-actions-menu");
        menu.css("display", "none");
    });

});