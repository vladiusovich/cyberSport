var resultTempForNewsBlock = `<div class="news__item">
                      <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
                      <div class="news_tag">Новости</div>
                      <h4 class="news__header">TaZ:»ЯНовая статьятурниров»</h4>
                      <p class="news__preview-text">
                        Ldldldldldldl
                      </p><span class="news__data">04.02.2017</span>
                    </div>
                    <div class="news__item">
                      <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
                      <div class="news_tag">Новости</div>
                      <h4 class="news__header">TaZ:»Новая статья»</h4>
                      <p class="news__preview-text">
                        
                        Katowice 2017. Слот выиграла наша команда EYESPORTS female.
                      </p><span class="news__data">04.02.2017</span>
                    </div>
                    <div class="news__item">
                      <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
                      <div class="news_tag">Новости</div>
                      <h4 class="news__header">Новая статьяу</h4>
                      <p class="news__preview-text">
                        Винсент «Happy» Шопенгауэр
                        создает новую команду в рамках
                        грядущего французского решафла.
                        Happy строит новую боевую
                        команду …
                      </p><span class="news__data">04.02.2017</span>
                    </div>`;



$(document).ready(function() {
    var newsDeriction = 'next';
    var isLoaded = true;
    // При нажатии на стрелки в блоке новостей отправка ajax за след/пред новостями
    $(".news").on("click", function (e) {
        if (!isLoaded) return;
        var headerHeight = $(".news__header").css("height");
        var newsContainer = $(".news__container");
        var newsPosts = $(".news__container").children();
        var arrowDeriction = e.target.parentNode;
        var arrowClassName = arrowDeriction.className;

        if (arrowClassName == "news__arrow-l") {
            newsDeriction = 'priv';
            sendAjaxNews("SomeServlet/_SomeMethod", newsDeriction, replaceNewsPosts);
        } else if (arrowClassName == "news__arrow-r") {
            newsDeriction = 'next';
            sendAjaxNews("SomeServlet/_SomeMethod", newsDeriction, replaceNewsPosts);
        } else return;

        function replaceNewsPosts() {
            newsContainer.css("opacity", 0);
            setTimeout(function () {
                var parseNews = $.parseHTML(resultTempForNewsBlock);
                newsPosts.remove();
                newsContainer.append(parseNews);
                $(".news__header").height(headerHeight);
                newsContainer.css("opacity", 1);
                isLoaded = true;
            },300);
            isLoaded = false;
        }

        function sendAjaxNews(methodName, newsDeriction, callback) {
            $.ajax({
                type: "POST",
                url: methodName, // Вызываемый метод на сервере
                // url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
                contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
                data: {newsDeriction: newsDeriction},
                dataType: "json",
                success: function (result) {
                    console.log(newsDeriction);
                    //  returning something
                    console.log('result... ' + result);

                },
                error: function (result) {
                    callback();
                }
            });
        }

    });

    //Кнопка бана
    var BanAction = (function () {
        var userName;
        var menu = $(".ban-actions-menu");

        function getBanMenu(e) {
            e.stopPropagation();
            menu.css("display", "none");
            userName = $(this).parent().find(".chat__user").find(".chat__user-name").text();
            console.log(userName);
            var position = $(this).offset();
            displayBanActions(position.left, position.top);
        }

        function closeMenu() {
            menu.css("display", "none");
        }


        function displayBanActions(x, y) {
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

    //Отправка сообщения на сервер. Чат !!!!!!!!!!!!!!!!!!! Доделай кнопку
    (function () {
        var chatDialog = $(".chat__dialog");
        function isBottom() {
            var isBottom = true;
            var scrollBottom = $(".chat__dialog").scrollTop() + $(".chat__dialog").height();
            console.log("scrollBottom: " + scrollBottom );
            console.log($(".chat__dialog").prop("scrollHeight"));

            if (scrollBottom !== $(".chat__dialog").prop("scrollHeight")) {
                return false;
            }
            return true;
        }


        $(".chat__dialog").scroll(function () {
            var buttonToBottom = $(".chat-container__toBottom");
            var isB = isBottom();
            if (!isB) {
                buttonToBottom.addClass("isScrolled");
            } else {
                buttonToBottom.removeClass("isScrolled");
            }
        });

        $("#toBottom").on("click", function (e) {
            chatDialog.animate({ scrollTop: $(".chat__dialog").prop("scrollHeight")}, 400);
        })

        $( ".chat__button" ).click(function () {
            var dataMessage = $("#chat__input-text").val();

            if (dataMessage == undefined || dataMessage == "") {
                return;
            }
            console.log(dataMessage);
            $.ajax({
                type: "POST",
                url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
                contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
                data: {dataMessage: dataMessage},
                dataType: "json",
                success: function (result) {
                    console.log('It worked!');
                    appendMessage(dataMessage);
                    chatDialog.animate({ scrollTop: $(".chat__dialog").prop("scrollHeight")}, 400);
                    //  returning something
                    console.log('result... ' + result);

                },
                error: function (result) {
                    //Тест. Потом убрать
                    //Ессли проскролили сообщения то при добалении новой не скролить вниз. Отобразить кнопку для скролинга вниз
                        if (!isBottom()) return;
                    chatDialog.animate({ scrollTop: $(".chat__dialog").prop("scrollHeight")}, 400);
                    //Тест. Потом убрать
                    appendMessage(dataMessage);
                    console.log('Error :(');
                }
            });
        });
    })();

    //Клик на кнопку бана(всплывающее окно)
    $(".chat-container").on("click", function (e) {
        var chatBanButton = $(this).find(".chat_ban-actions");
        var chatSendDataButton = $('html').find(".ban-actions__act");
        chatBanButton.off("click", BanAction.displayMenu).on("click", BanAction.displayMenu);
        chatSendDataButton.off("click", BanAction.sendData).on("click", BanAction.sendData);
    });

    $( ".ban-actions-menu__close" ).click(BanAction.closeMenu);

    $(document).scroll(function () {
        BanAction.getMenu.css("display", "none");
    });

    $(".chat__dialog").scroll(function () {
        BanAction.getMenu.css("display", "none");
    });

    window.onclick = function(event) {
        if (!$(event.target).closest(BanAction.getMenu).length) {
            BanAction.getMenu.css("display", "none");
        }
    }




//Добавление сообщения в чат. Добавление обработчиков на кнопки бана
    var appendMessage = function appendMessage(dataMessage) {
        // var messege = $('<li class="chat__messenge"><a class="chat_ban-actions"><i aria-hidden="true" class="fa fa-ban"></i></a><div class="chat__user">' +
        // '<div class="chat__avatar"><img src="https://support.rockstargames.com/system/photos/0001/4510/9157/profile_image_877736018_61840.png"></div>' +
        // '<em class="chat__user-name">' + name +'</em>' +
        // '<em class="chat__time">' + time + '</em></div>' +
        // '<p class="chat__messenge-content">' + text + ' [' + room + '/' + counterIds + ']' + '</p></li>');

        var messege = $('<li class="chat__messenge"><a class="chat_ban-actions"></a><div class="chat__user">' +
            '<div class="chat__avatar"><img src="https://support.rockstargames.com/system/photos/0001/4510/9157/profile_image_877736018_61840.png"></div>' +
            '<em class="chat__user-name">' + 34 +'</em>' +
            '<em class="chat__time">' + 12 + '</em></div>' +
            '<p class="chat__messenge-content">' + 234 + ' [' + 324234 + '/' + 234235 + ']' + '</p></li>');

        var chatBanButton = messege.find(".chat_ban-actions");
        var chatSendDataButton = $('html').find(".ban-actions__act");
        chatBanButton.off("click", BanAction.displayMenu).on("click", BanAction.displayMenu);
        chatSendDataButton.off("click", BanAction.sendData).on("click", BanAction.sendData);

        $("#team-chat").append(messege);
        // $(chatWindow).append(messege);

    }

    // Автоматическая выравнивание блоков
    $(function () {
        $('.news__header').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    });

    $(function () {
        $('[class*="col-"]').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    });

    $(".videos__list, .streams__list, .matches__table, .team__list, .search__list").mCustomScrollbar();

// Удалить рекламу на веременном сервере
    /*
     $('body > div').filter(function(){
     return $(this).css("height") === "65px";
     }).remove();
     $('body > center').remove();
     $('body > div[style~="opacity:"]').remove();
     */
});


// Чат ттугл
(function () {
    var toggleChat =   document.getElementsByClassName("chat__toggle")[0];
    var isToggle = false;
    var screenMd = 1024;

    function toggle() {
        var chat = document.getElementsByClassName("chat--aside")[0];
        var wrapper = document.getElementsByClassName("page-container")[0];
        var w = document.documentElement.clientWidth;

        if (!isToggle) {
            chat.style.transform = "translateX(0px)";
            if (w > screenMd) {
            }
            isToggle = true
        }
        else {
            chat.style.transform = "translateX(-310px)";
            wrapper.style.marginLeft = "0";
            isToggle = false;
        }
    }
    window.toggle = toggle;
})();

//Playlist for streams
(function () {
    var streams = $('.streams');
    streams.find('.videos__name').click(function () {
        var ref = $(this).attr('data-ref');

        var videoViewerIrame = $('#stream-viewer iframe');
        var iframe = $('<iframe frameborder="0" allowfullscreen></iframe>');
        iframe.attr("src", ref);
        videoViewerIrame.replaceWith(iframe);
    });
}());


