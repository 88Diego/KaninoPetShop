function accordion() {
    $('#accordion a.trigger').on('click', function(e) {
        e.preventDefault();
        if (!$(this).parent('li').hasClass('active')) {
            accordionShowItem($(this));
        }
    });
}

function accordionHideItem() {
    $('#accordion .content').slideUp();
    $('#accordion .active').removeClass();
}

function accordionShowItem(elem) {
    accordionHideItem();
    $(elem).next().slideDown(function() {

    });
    $(elem).parent('li').addClass('active');
}


var indexAtual = 0;

function bannerHome() {
    var banners = $('figure a').length;

    window.setInterval((function() {
        if (indexAtual === banners - 1) {
            indexAtual = -1;
        }
        fadeBanner(indexAtual);
    }), 5000);
}

function fadeBanner(index) {
    indexAtual = index + 1;
    $('figure a.active').fadeOut('300', function() {
        $($('figure a')[indexAtual]).addClass('active').fadeIn(300);
        $(this).removeClass();
    });
}

function navMobile() {
    $('.triggerNav').on('click', function() {
        $('header nav').toggle();
    });
}

function init() {
    accordion();
    bannerHome();
    navMobile();
}

$(document).ready(function() {
    init();
});
