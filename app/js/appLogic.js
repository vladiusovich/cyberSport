// use strict;

$(document).ready(function() {


  //Обновление новосте при нажатии на стрелки. Доделать
  (function () {
      const pageTitle = {
          cs: "CS GO",
          paragon: "Paragon",
          dota: "Dota 2",
          wot: "World of tanks",
      }
      var directlyPageTitle = $('head > title').html(),
          newsPageDirectly = 1,
          latestArrow,
          isLoaded = true;

      // При нажатии на стрелки в блоке новостей отправка ajax за след/пред новостями
      $(".news").on("click", function (e) {
          if (!isLoaded) return;

          var headerHeight = $(".news__header").css("height"),
              newsContainer = $(".news__container"),
              newsPosts = newsContainer.children(),
              pageInfo,
              sendNewsParams,
              arrowDeriction = e.target.parentNode,
              arrowClassName = arrowDeriction.className;

          var pageTitleId = getIdOfPage(directlyPageTitle);
          newsPageDirectly = getPageNumber(arrowClassName, newsPageDirectly);

          sendNewsParams = {
              theme: 2,
              page: newsPageDirectly,
              newsPerPage: 3
          }

          if (arrowClassName == 'news__arrow-l' || arrowClassName == 'news__arrow-r') {
              getNewPosts("/News/GetPagedNews", sendNewsParams, replaceNewsPosts);
          }

          //Замена новыми постами
          function replaceNewsPosts(result) {
              newsContainer.css("opacity", 0);
              isLoaded = false;
              pageInfo = result.PageInfo;
              disaibleNewsArrow(arrowDeriction, pageInfo);

              setTimeout(function () {
                  var newsArray = result.NewsViewModelList;
                  newsArray.map(function (obj, index) {
                      if (index > 2) return;
                      newsContainer.append(fillBlank(obj));
                  });

                  newsPosts.remove();
                  $(".news__header").height(headerHeight);
                  newsContainer.css("opacity", 1);

                  isLoaded = true;
              },300);
          }
      });

      //Получить предыдущие посты для моб. устройств
      $(".news__more-news button").on('click', function (e) {
          var pageTitleId = getIdOfPage(directlyPageTitle);
          newsPageDirectly += 1;

          var sendNewsParams = {
              theme: pageTitleId,
              page: newsPageDirectly,
              newsPerPage: 3
          }

          var headerHeight = $(".news__header").css("height"),
              newsContainer = $(".news__container"),
              newsPosts = newsContainer.children(),
              arrowDeriction = e.target.parentNode,
              arrowClassName = arrowDeriction.className;

          getNewPosts("/News/GetPagedNewsMobil", sendNewsParams, replaceNewsPostsMobile)

          function replaceNewsPostsMobile() {
              var newsArray = result.NewsViewModelList;
              newsArray.map(function (obj, index) {
                  if (index > 2) return;
                  newsContainer.append(fillBlank(obj));
              });

              $(".news__header").height(headerHeight);
          }
      });

  //Функции

      function fillBlank(obj) {
        newsItem = $(
            '<div class="news__item">' +
            '<div class="news__img">' +
            '<a href="#"><img src=http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg ></a>' +
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
        return newsItem;
      }

      function getNewPosts(methodName, newsParams, callback) {
          $.ajax({
              type: "GET",
              url: methodName,
              contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
              data: newsParams,
              dataType: "json",
              success: function (result) {
                  console.log('result ', result);
                  callback(result);
              },
              error: function (result) {
                  console.log('result fail ', result);
              }
          });
      }

      function getIdOfPage(pageType) {
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

      function disaibleNewsArrow(arrow, pageInfo) {
        if (pageInfo.PageNumber == pageInfo.TotalPages) {
          $(arrow).css({ visibility: 'hidden'});
        } else if (pageInfo.PageNumber == 1) {
            $(arrow).css({ visibility: 'hidden'});
        } else {
          $(latestArrow).css({ visibility: 'visible'});
        }
        latestArrow = arrow;
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

    $(".videos__list, .streams__list, .matches__table, .team__list, .search__list").mCustomScrollbar({alwaysShowScrollbar: 1});

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



//Управление командой. Командир
(function() {
  var isDeleteState = false,
      wasClickOn,
      containerList,
      containerListLatest,
      buttonDeleteGamers = $('.commands__delete-gamer'),
      buttonChangeCommandor = $('.commands__change-commander'),
      idGamersToServer = [];
  var commandsAction = $('.commands__actions');

  $('.commands__change-commander').on('click', function() {
    if(isDeleteState) return;

    var checkItem = $('<input type="radio" name="changeCommandor"/>'),
        commandsControl = $('.commands__control')
        arrayItems = $('#mCSB_1_container').children(),
    containerList = $('#mCSB_1_container');
    containerListLatest = containerList.clone()
    commandsAction.css({visibility: "visible"});

    wasClickOn = 'change-commander';
    disableButtons(buttonDeleteGamers);

    containerList.children().prepend(checkItem);
    isDeleteState = true;
  });


  $('.commands__delete-gamer').on('click', function(e) {
    if(isDeleteState) return;

    var checkItem = $('<input type="checkbox"/>'),
        commandsControl = $('.commands__control')
        arrayItems = $('#mCSB_1_container').children(),
    containerList = $('#mCSB_1_container');
    containerListLatest = containerList.clone()
    commandsAction.css({visibility: "visible"});

    wasClickOn = 'delete-gamer';

    disableButtons(buttonChangeCommandor);

    containerList.children().prepend(checkItem);
    isDeleteState = true;
  });

  $('.commands__cancel').on('click', function (e) {
    enableButtons(buttonChangeCommandor);
    enableButtons(buttonDeleteGamers);

    containerList.replaceWith(containerListLatest);
    commandsAction.css({visibility: "hidden"});
    isDeleteState = false;
  });

  $('.commands__ok').on('click', function (e) {
    var items = containerList.children();
    for(var o of items) {
      var $o = $(o);
      if($o.children().prop("checked")) {
        idGamersToServer.push($o.attr('data-id'));
      }
    }

    if(idGamersToServer.length === 0) return;

    console.log('idGamersToServer ', idGamersToServer);
    switch (wasClickOn) {
      case 'delete-gamer': sendGamersId('/deleteFromTeam', idGamersToServer);break;
      case 'change-commander': sendGamersId('/changeCommanderForTeam', idGamersToServer);break;
    }

    idGamersToServer = [];

    enableButtons(buttonChangeCommandor);
    enableButtons(buttonDeleteGamers);

    containerList.replaceWith(containerListLatest);
    commandsAction.css({visibility: "hidden"});
    isDeleteState = false;
  });

  $('.search__invite').on('click', function (e) {
    var id = $(this).parent().attr('data-id');
    sendInvite('/inviteToTeam', id, $(this));
  });

//тупо копипастил. Недльзя так
  function sendGamersId(methodName, data) {
      $.ajax({
          type: "GET",
          url: methodName,
          contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
          data: data,
          dataType: "json",
          success: function (result) {
            //Прислать новый список игроков в команде и заменить им старый
              console.log('result ', result);
          },
          error: function (result) {
              console.log('result fail ', result);
          }
      });
  }
//тупо копипастил. Недльзя так
  function sendInvite(methodName, data, button) {
      $.ajax({
          type: "GET",
          url: methodName,
          contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
          data: data,
          dataType: "json",
          success: function (result) {
            //Если выслали, то заменить эту кнопку на кнопку "Приглашение отправлено"
              console.log('result ', result);
          },
          error: function (result) {
            button.text('Отправлено');
            disableButtons(button);
            console.log('result fail ', this);
          }
      });
  }

  function enableButtons(button) {
    button.removeAttr("style");
    button.removeAttr("disabled");
  }

  function disableButtons(button) {
    button.css({color: "gray"});
    button.attr("disabled", "true");
  }

})();
