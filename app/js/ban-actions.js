
(function () {

})();

var user, userName;

$( ".chat_ban-actions" ).click(function() {
    // var peer = $(this).attr("data-peer");

    var menu = $(".ban-actions-menu");
    menu.css("display", "none");

    user = $(this).next();
    userName = user.find(".chat__user-name").text();

    var position = $(this).offset();
    display_ban_actions(position.top, position.left);

})

$( ".ban-actions__act" ).click(function() {


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

