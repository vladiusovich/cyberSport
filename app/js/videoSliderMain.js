var mainScrolValue=0;
$(document).ready(function(){
    var videoitemsvar = document.getElementsByClassName('video-item');
    for(var i=5; i<videoitemsvar.length; ++i)
    {
        videoitemsvar[i].style.display = 'none';
    }
});
$('.rightStrike').click(function(){
    var videoitemsvar = document.getElementsByClassName('video-item');
    var j=mainScrolValue+5;
    if(j<=videoitemsvar.length) {
        mainScrolValue += 5;
        for (var i = 0; i < videoitemsvar.length; ++i) {
            videoitemsvar[i].style.display = 'none';
        }
        for (var i = j; i < j + 5; ++i) {
            videoitemsvar[i].style.display = 'block';
        }
    }
});
$('.leftStrike').click(function(){
    var videoitemsvar = document.getElementsByClassName('video-item');
    var j=mainScrolValue-5;
    if(j>=0) {
        mainScrolValue -= 5;

        for (var i = 0; i < videoitemsvar.length; ++i) {
            videoitemsvar[i].style.display = 'none';
        }
        for (var i = j; i < j + 5; ++i) {
            videoitemsvar[i].style.display = 'block';
        }
    }
});


