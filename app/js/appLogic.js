var resultTempForNewsBlock = `<div class="news__item">
                      <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
                      <div class="news_tag">Новости</div>
                      <h4 class="news__header">Riot Games перестала принимать заявки на тестовый сервер</h4>
                      <p class="news__preview-text">
                       Компания Riot Games временно закрыла регистрацию на тестовый сервер League of Legends. Согласно анонсу, решение связано с плохой работой сайта PBE (Public Beta Environment). Riot Games возобновит прием заявок после того, как портал приведут в рабочее состояние.
                      </p><span class="news__data">04.02.2017</span>
                    </div>
                    <div class="news__item">
                      <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
                      <div class="news_tag">Новости</div>
                      <h4 class="news__header">Selfless распустила состав по CS:GO 
По материалам киберспортивного портала CyberSport.ru</h4>
                      <p class="news__preview-text">
                        Организация Selfless Gaming распустила состав по Counter-Strike: Global Offensive. Три киберспортсмена продолжат играть вместе. Информация была опубликована на официальном сайте организации.
По материалам киберспортивного портала CyberSport.ru
                      </p><span class="news__data">04.02.2017</span>
                    </div>
                    <div class="news__item">
                      <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
                      <div class="news_tag">Новости</div>
                      <h4 class="news__header">Andi: «Командам из СНГ не хватает дисциплины и коммуникации»</h4>
                      <p class="news__preview-text">
                        Новый тренер Natus Vincere G2A Андрей «Andi» Прохоров в интервью GameInside.ua рассказал, как он попал в организацию, какие у него обязанности в коллективе
                      </p><span class="news__data">04.02.2017</span>
                    </div>`;



$(document).ready(function() {
    //Обновление новосте при нажатии на стрелки
    (function () {
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

    })();

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

        //Клик на кнопку бана(всплывающее окно)
        $(".chat-container").on("click", function (e) {
            e.stopPropagation();
            var chatBanButton = $(this).find(".chat_ban-actions");
            var tName = e.target.className;
            if (tName === "chat_ban-actions") {
                userName =  $(e.target).parent().find(".chat__user-name").text();
                console.log(userName);
                var position = $(e.target).offset();
                var x = position.left;
                var y = position.top;
                var menu = $(".ban-actions-menu");
                var styles = {
                    display: "block",
                    opacity: 1,
                    top: y + 25,
                    left: x + 20
                };

                if (menu.css("display") == "none") {
                    menu.css(styles);

                } else {
                    menu.css( {display: "none"} );

                }
            }
            var chatSendDataButton = $('html').find(".ban-actions__act");
            chatSendDataButton.off("click", BanAction.sendData).on("click", BanAction.sendData);


        });

        return {
            displayMenu: getBanMenu,
            sendData: sendData,
            closeMenu: closeMenu,
            getMenu: (function () {
                return menu;
            })()
        }
    })();

    $( ".ban-actions-menu__close" ).click(BanAction.closeMenu);

    $(document).scroll(function () {
        BanAction.getMenu.css("display", "none");
    });

    $(".chat__dialog").scroll(function () {
        BanAction.getMenu.css("display", "none");
    });

    //Вообще перестает отображать банменю
    window.onclick = function(event) {
        if (!$(event.target).closest($(".ban-actions-menu")).length) {
            $(".ban-actions-menu").css( {display: "none"} );
        }
    };

    //Отправка сообщения на сервер. ЧAT
    (function () {
        var chatDialog = $(".chat__dialog");

        function isBottom() {
            var isBottom = true;
            var scrollBottom = chatDialog.scrollTop() + chatDialog.height();
            if (scrollBottom !== chatDialog.prop("scrollHeight")) {
                return false;
            }
            return true;
        }

        //Спустить скролл вниз
        function scrollDown(el) {
            el.animate({ scrollTop: el.prop("scrollHeight")}, 400);
        }

        $(document).ready(function() {
            scrollDown(chatDialog);
        });

        //Кнопка для скролла вниз. Если скролл не внизу то показать кнопку. Иначе скрыть
        chatDialog.scroll(function () {
            var buttonToBottom = $(".chat-container__toBottom");
            var isB = isBottom();
            if (!isB) {
                buttonToBottom.addClass("isScrolled");
            } else {
                buttonToBottom.removeClass("isScrolled");
            }
        });

        //Кнопка для скролла вниз. Обработчик нажатия
        $("#toBottom").on("click", function (e) {
            scrollDown(chatDialog);
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
                    if (isBottom()) scrollDown(chatDialog);
                    appendMessage(dataMessage);

                },
                error: function (result) {
                    //Тест. Потом убрать
                    //Ессли проскролили сообщения то при добалении новой не скролить вниз. Отобразить кнопку для скролинга вниз
                    if (isBottom()) scrollDown(chatDialog);
                    //Тест. Потом убрать
                    appendMessage(dataMessage);
                    console.log('Error :(');
                }
            });
        });
    })();



//Добавление сообщения в чат. Добавление обработчиков на кнопки бана
    var appendMessage = function appendMessage(dataMessage) {
        // var messege = $('<li class="chat__messenge"><a class="chat_ban-actions"><i aria-hidden="true" class="fa fa-ban"></i></a><div class="chat__user">' +
        // '<div class="chat__avatar"><img src="https://support.rockstargames.com/system/photos/0001/4510/9157/profile_image_877736018_61840.png"></div>' +
        // '<em class="chat__user-name">' + name +'</em>' +
        // '<em class="chat__time">' + time + '</em></div>' +
        // '<p class="chat__messenge-content">' + text + ' [' + room + '/' + counterIds + ']' + '</p></li>');

        var messege = $('<li class="chat__messenge"><a class="chat_ban-actions"></a><div class="chat__user">' +
            '<div class="chat__avatar"><img src="https://support.rockstargames.com/system/photos/0001/4510/9157/profile_image_877736018_61840.png"></div>' +
            '<em class="chat__user-name">' + "Poollooer" +'</em>' +
            '<em class="chat__time">' + "12:25" + '</em></div>' +
            '<p class="chat__messenge-content">' + "кэшированию информации, чтобы на их платформах контент предоставлялся пользователю с оптимальной скоростью. Поэтому использование АМ"  + '</p></li>');

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


