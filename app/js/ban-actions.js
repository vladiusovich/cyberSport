//
// var BanAction = (function () {
//     var userName;
//     var menu = $(".ban-actions-menu");
//
//     function getBanMenu(e) {
//         e.stopPropagation();
//         menu.css("display", "none");
//         userName = $(this).parent().find(".chat__user").find(".chat__user-name").text();
//         console.log(userName);
//         var position = $(this).offset();
//         displayBanActions(position.left, position.top);
//     }
//
//     function closeMenu() {
//         menu.css("display", "none");
//     }
//
//
//
//
//     function displayBanActions(x, y) {
//         var menu = $(".ban-actions-menu");
//         var menuWidth = menu.css("width");
//         var left = (x + 20);
//         var styles = {
//             display: "block",
//             opacity: 1,
//             top: y + 25,
//             left: left
//         };
//
//         if (menu.css("display") == "none") {
//             menu.css(styles);
//
//         } else {
//             menu.css( {display: "none"} );
//
//         }
//     }
//
//     function sendData() {
//         var banOption = $("input[type='radio']:checked").val();
//
//         if (banOption == undefined) {
//             return;
//         }
//         console.log(banOption + "  -- " + userName);
//         $.ajax({
//             type: "POST",
//             url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
//             contentType: "application/json; charset=utf-8",
//             data: {banOption: banOption, userName: userName},
//             dataType: "json",
//             success: function (result) {
//                 console.log('It worked!');
//                 //  returning something
//                 console.log('result... ' + result);
//
//             },
//             error: function (result) {
//                 console.log('Error :(');
//             }
//         });
//     }
//
//     return {
//         displayMenu: getBanMenu,
//         sendData: sendData,
//         closeMenu: closeMenu,
//         getMenu: (function () {
//             return menu;
//         })()
//     }
// })();
//
//
// $(document).ready(function(){
//
//
// //Отправка сообщения на сервер. Чат
//     $( ".chat__button" ).click(function () {
//         var dataMessage = $("#chat__input-text").val();
//
//         if (dataMessage == undefined || dataMessage == "") {
//             return;
//         }
//         console.log(dataMessage);
//         $.ajax({
//             type: "POST",
//             url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
//             contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
//             data: {dataMessage: dataMessage},
//             dataType: "json",
//             success: function (result) {
//                 console.log('It worked!');
//                 appendMessage(dataMessage);
//                 //  returning something
//                 console.log('result... ' + result);
//
//             },
//             error: function (result) {
//                 console.log('Error :(');
//             }
//         });
//     });
//
//
//
//
//
//
//
// //Добавление сообщения в чат. Добавление обработчиков на кнопки бана
//     var appendMessage = function (dataMessage) {
//         // var messege = $('<li class="chat__messenge"><a class="chat_ban-actions"><i aria-hidden="true" class="fa fa-ban"></i></a><div class="chat__user">' +
//         // '<div class="chat__avatar"><img src="https://support.rockstargames.com/system/photos/0001/4510/9157/profile_image_877736018_61840.png"></div>' +
//         // '<em class="chat__user-name">' + name +'</em>' +
//         // '<em class="chat__time">' + time + '</em></div>' +
//         // '<p class="chat__messenge-content">' + text + ' [' + room + '/' + counterIds + ']' + '</p></li>');
//
//         var messege = $('<li class="chat__messenge"><a class="chat_ban-actions"></a><div class="chat__user">' +
//             '<div class="chat__avatar"><img src="https://support.rockstargames.com/system/photos/0001/4510/9157/profile_image_877736018_61840.png"></div>' +
//             '<em class="chat__user-name">' + 34 +'</em>' +
//             '<em class="chat__time">' + 12 + '</em></div>' +
//             '<p class="chat__messenge-content">' + 234 + ' [' + 324234 + '/' + 234235 + ']' + '</p></li>');
//
//         var chatBanButton = messege.find(".chat_ban-actions");
//         var chatSendDataButton = $('html').find(".ban-actions__act");
//         chatBanButton.off("click", BanAction.displayMenu).on("click", BanAction.displayMenu);
//         chatSendDataButton.off("click", BanAction.sendData).on("click", BanAction.sendData);
//
//         $("#team-chat").append(messege);
//         // $(chatWindow).append(messege);
//
//     }
//
//
//
//
//
//
//     $( ".ban-actions-menu__close" ).click(BanAction.closeMenu);
//
//     $(document).scroll(function () {
//         BanAction.getMenu.css("display", "none");
//     });
//
//     $(".chat__dialog").scroll(function () {
//         BanAction.getMenu.css("display", "none");
//     });
//
// // Удалить рекламу н веременном сервере
//     /*
//     $('body > div').filter(function(){
//             return $(this).css("height") === "65px";
//         }).remove();
//     $('body > center').remove();
//     $('body > div[style~="opacity:"]').remove();
// */
// });
//
// window.onclick = function(event) {
//     if (!$(event.target).closest(BanAction.getMenu).length) {
//         BanAction.getMenu.css("display", "none");
//     }
// }
//
//
//
