var jsonTest = {
    "NewsViewModelList": [
        {
            "NewsId": 29,
            "Author": "admin",
            "Title": "Новость от admin про CSGo",
            "Content": "Эту новость про CSGo написал admin",
            "PublishDate": "/Date(1486253417577)/",
            "PathToImage": "/Content/Images/News/_default1.jpg"
        },
        {
            "NewsId": 25,
            "Author": "admin",
            "Title": "Новость от admin про CSGo",
            "Content": "Эту новость про CSGo написал admin",
            "PublishDate": "/Date(1485853417577)/",
            "PathToImage": "/Content/Images/News/_default1.jpg"
        },
        {
            "NewsId": 21,
            "Author": "admin",
            "Title": "Новость от admin про CSGo",
            "Content": "Эту новость про CSGo написал admin",
            "PublishDate": "/Date(1485453417577)/",
            "PathToImage": "/Content/Images/News/_default1.jpg"
        },
        {
            "NewsId": 17,
            "Author": "admin",
            "Title": "Новость от admin про CSGo",
            "Content": "Эту новость про CSGo написал admin",
            "PublishDate": "/Date(1485053417577)/",
            "PathToImage": "/Content/Images/News/_default1.jpg"
        },
        {
            "NewsId": 13,
            "Author": "admin",
            "Title": "Новость от admin про CSGo",
            "Content": "Эту новость про CSGo написал admin",
            "PublishDate": "/Date(1484653417577)/",
            "PathToImage": "/Content/Images/News/_default1.jpg"
        }
    ],

    "PageInfo": {
        "PageNumber": 1,
        "PageSize": 5,
        "TotalItems": 8,
        "TotalPages": 2
    }
}

//use strict

$(document).ready(function() {
    //Обновление новосте при нажатии на стрелки
    (function () {
        var pageTitle = {
            cs: "CS GO",
            paragon: "Paragon",
            dota: "Dota 2",
            wot: "World of tanks",
        }
        var directlyPageTitle = $('head > title').html();
        var newsPageDirectly = 1,
             isLoaded = true;

        // При нажатии на стрелки в блоке новостей отправка ajax за след/пред новостями
        $(".news").on("click", function (e) {
            if (!isLoaded) return;

                var headerHeight = $(".news__header").css("height"),
                newsContainer = $(".news__container"),
                newsPosts = $(".news__container").children(),
                arrowDeriction = e.target.parentNode,
                arrowClassName = arrowDeriction.className;

            var pageTitleId = getIdOfPage(directlyPageTitle);

            newsPageDirectly = getPageNumber(arrowClassName, newsPageDirectly);



            console.log("Page namber: ",newsPageDirectly);
            var sendNewsParams = {
                theme: pageTitleId,
                page: newsPageDirectly,
                newsPerPage: 3
            }

            var ppp = getNewPosts("/News/GetPagedNews", sendNewsParams, replaceNewsPosts);

            //Все функции
            function replaceNewsPosts() {
                newsContainer.css("opacity", 0);
                isLoaded = false;

                setTimeout(function () {
                    // var parseNews = jQuery.parseJSON(jsonTest);
                    // var parseNews;
                    var newsArray = jsonTest.NewsViewModelList;
                    newsArray.map(function (obj, index) {
                        if (index > 2) return;

                        newsItem = $(
                            '<div class="news__item">' +
                            '<div class="news__img">' +
                            '<img src=http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg >' +
                            '</div>' +
                            '<div class="news_tag">Новости</div>' +
                            '<h4 class="news__header">' +
                            obj.Title +
                            '</h4>' +
                            '<p class="news__preview-text">' +
                            obj.Content +
                            ' </p>' +
                            '<span class="news__data">' +
                            obj.PublishDate +
                            '</span>' +
                            '</div>'
                        );
                        newsContainer.append(newsItem);
                    });

                    newsPosts.remove();
                    $(".news__header").height(headerHeight);
                    newsContainer.css("opacity", 1);

                    isLoaded = true;
                },300);
            }


        });


        //Получить предыдущие посты для мобилки
        $(".news__more-news button").on('click', function (e) {
            var pageTitleId = getIdOfPage(directlyPageTitle);
            newsPageDirectly += 1;
            var sendNewsParams = {
                theme: pageTitleId,
                page: newsPageDirectly,
                newsPerPage: 3
            }

            console.log("Page #: ",newsPageDirectly);

            var headerHeight = $(".news__header").css("height"),
                newsContainer = $(".news__container"),
                newsPosts = $(".news__container").children(),
                arrowDeriction = e.target.parentNode,
                arrowClassName = arrowDeriction.className;

            getNewPosts("/News/GetPagedNewsMobil", sendNewsParams, replaceNewsPostsMobile)

            function replaceNewsPostsMobile() {
                    var newsArray = jsonTest.NewsViewModelList;
                    newsArray.map(function (obj, index) {
                        if (index > 2) return;

                        newsItem = $(
                            '<div class="news__item">' +
                            '<div class="news__img">' +
                            '<img src=http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg >' +
                            '</div>' +
                            '<div class="news_tag">Новости</div>' +
                            '<h4 class="news__header">' +
                            obj.Title +
                            '</h4>' +
                            '<p class="news__preview-text">' +
                            obj.Content +
                            ' </p>' +
                            '<span class="news__data">' +
                            obj.PublishDate +
                            '</span>' +
                            '</div>'
                        );
                        newsContainer.append(newsItem);
                    });

                    // newsPosts.remove();
                    $(".news__header").height(headerHeight);
            }


        });

        function getNewPosts(methodName, newsParams, callback) {
            $.ajax({
                type: "POST",
                url: methodName, // Вызываемый метод на сервере
                contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
                data: newsParams,
                dataType: "json",
                success: function (result) {
                    //  return something
                    console.log('result... ' + result);

                },
                error: function (result) {
                    // return result;
                    callback();
                }
            });
        }

        function getIdOfPage(pageType) {
            console.log(pageType);
            switch (pageType) {
                case pageTitle.cs: return 1;
                case pageTitle.paragon: return 2;
                case pageTitle.dota: return 3;
                case pageTitle.wot: return 4;
                default:  return 5;
            }
        }

        function getPageNumber(arrowClassName, newsPageDirectly) {
            if (arrowClassName == "news__arrow-l") {
                if (newsPageDirectly == 1) return newsPageDirectly;
                return newsPageDirectly -= 1;
            } else if (arrowClassName == "news__arrow-r") {
                return newsPageDirectly += 1;
            } else return newsPageDirectly;
        }
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
        // var messege = $('<li class="chat__messenge"><a class="chat_ban-actions">' +
        //     '<i aria-hidden="true" class="fa fa-ban"></i></a><div class="chat__user">' +
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

//Поиск игроков .В личном кабинете
(function () {
    var searchButton = $("#search_button");
    var searchInput = $("#search_input");

    searchInput.keypress(function (e) {
        console.log(this.value);
    })

    searchButton.on('click', function (e) {
        var requestGemer = searchInput[0].value;
        var gamerListWrapper =  $("#mCSB_2");
        var gamerList;

        $.ajax({
            type: "POST",
            url: "SomeServlet/getSearchListOfGamers",
            contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
            data: {requestGemer: requestGemer},
            dataType: "json",
            success: function (result) {
                console.log('Yiiii');
            },
            error: function (result) {
                gamerList = $('#mCSB_2_container');
                gamerList.empty();

                for (var i = 0; i < 20; i++) {
                    var li = $('<li></li>').attr('class', 'search__item');
                    var a = $('<a></a>');
                    var img = $('<img>').attr('src', '../img/user-img.jpg');
                    var span = $('<span>' +'NickName' + i + '</span>').attr('class', 'name');
                    a.append(img);
                    li.append(a);
                    li.append(span);
                    gamerList.append(li[0]);
                }
                gamerListWrapper.append(gamerList);
            }
        });
    })
})();


