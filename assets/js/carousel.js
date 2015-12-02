(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                var f = new Error("Cannot find module '" + o + "'");
                throw f.code = "MODULE_NOT_FOUND", f
            }
            var l = n[o] = {
                exports: {}
            };
            t[o][0].call(l.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, l, l.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        $(document).ready((function(_this) {
            return function() {
                return app.init();
            };
        })(this));

        window.settings = {};

        window.app = {};

        app.init = function() {
            return app.buildCarousel();
        };

        app.buildCarousel = function() {
            var swipeOptions;
            swipeOptions = {
                triggerOnTouchEnd: true,
                swipeStatus: carousel.swipeStatus,
                allowPageScroll: 'horizontal',
                threshold: 75
            };
            carousel.obj = $('#carousel');
            carousel.obj.swipe(swipeOptions);
            settings.winW = 217;
            settings.len = carousel.obj.find(".carousel-list li").length;
            settings.currentIndex = 0;
            settings.speed = 500;
            return carousel.setUp();
        };

        window.carousel = {};

        carousel.setUp = function() {
            carousel.setSizes();
            if (carousel.obj.attr("time-interval")) {
                settings.updateCount = $('#carousel').attr("duration-slide");
            }
            if (carousel.obj.attr("bullets")) {
                carousel.buildBullets();
            }
            if (carousel.obj.attr("arrows")) {
                return carousel.buildArrows();
            }
        };

        carousel.setSizes = function() {
            settings.winW = 217;
            carousel.obj.find(".carousel-list").css("width", settings.winW * settings.len);
            return carousel.obj.css("max-height", carousel.obj.find(".carousel-list li").height());
        };

        carousel.swipeStatus = function(event, phase, direction, distance) {
            var duration;
            if (phase === 'move' && (direction === 'left' || direction === 'right')) {
                duration = 0;
                if (direction === 'left') {
                    return carousel.scrollImages((settings.winW * settings.currentIndex) + distance, duration);
                } else if (direction === 'right') {
                    return carousel.scrollImages((settings.winW * settings.currentIndex) - distance, duration);
                }
            } else if (phase === 'cancel') {
                return carousel.scrollImages(settings.winW * settings.currentIndex, settings.speed);
            } else if (phase === 'end') {
                if (direction === 'right') {
                    return carousel.prev();
                } else if (direction === 'left') {
                    return carousel.next();
                }
            }
        };

        carousel.buildBullets = function() {
            var className, i, j, ref;
            carousel.obj.append("<ul class='bullets'></ul>");
            for (i = j = 0, ref = settings.len - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
                if (i === 0) {
                    className = "bullet selected";
                } else {
                    className = "bullet";
                }
                $(".bullets").append("<li id='bl-" + i + "' class='" + className + "'></li>");
            }
            return $(".bullet").bind("click", carousel.bulletsControl);
        };

        carousel.buildArrows = function() {
            $('section .container').append("<div class='arrows'><div class='left'></div><div class='right'></div></div>");
            return $(".left, .right").bind("click", carousel.arrowsControl);
        };

        carousel.prev = function() {
            settings.currentIndex = Math.max(settings.currentIndex - 1, 0);
            carousel.scrollImages(settings.winW * settings.currentIndex, settings.speed);
            carousel.updateBullets();
            return console.log(settings.currentIndex);
        };

        carousel.next = function() {
            settings.currentIndex = Math.min(settings.currentIndex + 1, settings.len - 1);
            carousel.scrollImages(settings.winW * settings.currentIndex, settings.speed);
            carousel.updateBullets();
            return console.log(settings.currentIndex);
        };

        carousel.scrollImages = function(distance, duration) {
            var value;
            $(".carousel-list").css('transition-duration', (duration / 1000).toFixed(1) + 's');
            value = (distance < 0 ? '' : '-') + Math.abs(distance).toString();
            $(".carousel-list").css({
                '-moz-transform': "translate(" + value + "px,0)",
                '-ms-transform': "translate(" + value + "px,0)",
                '-webkit-transform': "translate(" + value + "px,0)",
                'transform': "translate(" + value + "px,0)"
            });
            return carousel.updateArrows();
        };

        carousel.arrowsControl = function() {
            if ($(this).hasClass("right")) {
                carousel.next();
            } else {
                carousel.prev();
            }
            carousel.updateArrows();
            return carousel.resetTimer();
        };

        carousel.updateArrows = function() {
            var targetArrow;
            $(".left, .right").css("opacity", 1);
            targetArrow = null;
            if (settings.currentIndex === settings.len - 1) {
                targetArrow = $(".right");
            } else if (settings.currentIndex === 0) {
                targetArrow = $(".left");
            }
            if (targetArrow !== null) {
                return targetArrow.css("opacity", 0.2);
            }
        };

        carousel.bulletsControl = function() {
            var currentId;
            currentId = $(this).attr("id").substring(3, 4);
            if (settings.currentIndex !== $(this).attr("id").substring(3, 4)) {
                carousel.scrollImages(settings.winW * $(this).attr("id").substring(3, 4), settings.speed);
                settings.currentIndex = currentId;
                carousel.updateBullets();
            }
            return carousel.resetTimer();
        };

        carousel.updateBullets = function() {
            $(".bullet").removeClass("selected");
            return $("#bl-" + settings.currentIndex).addClass("selected");
        };

        carousel.updateTimer = function() {
            return settings.updateCount = window.setInterval((function(_this) {
                return function() {
                    if (settings.currentIndex === settings.len - 1) {
                        settings.currentIndex = -1;
                    }
                    return carousel.next();
                };
            })(this), settings.updateCount * 1000);
        };

        carousel.resetTimer = function() {
            return carousel.clearTimer();
        };

        carousel.clearTimer = function() {
            return window.clearInterval(settings.updateCount);
        };



    }, {}]
}, {}, [1]);
