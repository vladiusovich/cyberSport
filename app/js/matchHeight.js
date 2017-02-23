$(document).ready(function() {
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

    $(".videos__list, .streams__list, .matches__table").mCustomScrollbar();

})