// var resultTemp = `<div class="news__item">
//                       <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
//                       <div class="news_tag">Новости</div>
//                       <h4 class="news__header">TaZ:»ЯНовая статьятурниров»</h4>
//                       <p class="news__preview-text">
//                         Ldldldldldldl
//                       </p><span class="news__data">04.02.2017</span>
//                     </div>
//                     <div class="news__item">
//                       <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
//                       <div class="news_tag">Новости</div>
//                       <h4 class="news__header">TaZ:»Новая статья»</h4>
//                       <p class="news__preview-text">
//
//                         Katowice 2017. Слот выиграла наша команда EYESPORTS female.
//                       </p><span class="news__data">04.02.2017</span>
//                     </div>
//                     <div class="news__item">
//                       <div class="news__img"><img alt="imf cyber" src="http://mulehorngaming.com/wp-content/uploads/2015/12/gamer-wallpaperswallpaper-gamer-controllers-artwork-gamer-wallpaper-gamingholic-g1unpxck.jpg"></div>
//                       <div class="news_tag">Новости</div>
//                       <h4 class="news__header">Новая статьяу</h4>
//                       <p class="news__preview-text">
//                         Винсент «Happy» Шопенгауэр
//                         создает новую команду в рамках
//                         грядущего французского решафла.
//                         Happy строит новую боевую
//                         команду …
//                       </p><span class="news__data">04.02.2017</span>
//                     </div>`;
//
//
//
// $(document).ready(function() {
//     var newsDeriction = 'next';
//     var isLoaded = true;
//
//
//     $(".news").on("click", function (e) {
//         if (!isLoaded) return;
//         var headerHeight = $(".news__header").css("height");
//         var newsContainer = $(".news__container");
//         var newsPosts = $(".news__container").children();
//         var arrowDeriction = e.target.parentNode;
//         var arrowClassName = arrowDeriction.className;
//
//         if (arrowClassName == "news__arrow-l") {
//             newsDeriction = 'priv';
//             sendAjaxNews("SomeServlet/_SomeMethod", newsDeriction, replaceNewsPosts);
//         } else if (arrowClassName == "news__arrow-r") {
//             newsDeriction = 'next';
//             sendAjaxNews("SomeServlet/_SomeMethod", newsDeriction, replaceNewsPosts);
//         } else return;
//
//         function replaceNewsPosts() {
//             newsContainer.css("opacity", 0);
//             setTimeout(function () {
//                 var parseNews = $.parseHTML(resultTemp);
//                 newsPosts.remove();
//                 newsContainer.append(parseNews);
//                 $(".news__header").height(headerHeight);
//                 newsContainer.css("opacity", 1);
//                 isLoaded = true;
//             },300);
//             isLoaded = false;
//         }
//
//         function sendAjaxNews(methodName, newsDeriction, callback) {
//             $.ajax({
//                 type: "POST",
//                 url: methodName, // Вызываемый метод на сервере
//                 // url: "SomeServlet/_SomeMethod", // Вызываемый метод на сервере
//                 contentType: "'application/x-www-form-urlencoded; charset=UTF-8",
//                 data: {newsDeriction: newsDeriction},
//                 dataType: "json",
//                 success: function (result) {
//                     console.log(newsDeriction);
//                     //  returning something
//                     console.log('result... ' + result);
//
//                 },
//                 error: function (result) {
//                     callback();
//                 }
//             });
//         }
//
//     });
//
//
// });
//
