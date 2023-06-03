(function () {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    let birthday = "Nov 06, 2021 09:30:00",
        countDown = new Date(birthday).getTime(),
        x = setInterval(function () {
            let now = new Date().getTime(),
                distance = countDown - now;

            (document.getElementById("days").innerText = Math.floor(distance / day)),
                (document.getElementById("hours").innerText = Math.floor(
                    (distance % day) / hour
                )),
                (document.getElementById("minutes").innerText = Math.floor(
                    (distance % hour) / minute
                )),
                (document.getElementById("seconds").innerText = Math.floor(
                    (distance % minute) / second
                ));

            //do something later when date is reached
            if (distance < 0) {
                document.getElementById("days").innerText = "0";
                document.getElementById("hours").innerText = "0";
                document.getElementById("minutes").innerText = "0";
                document.getElementById("seconds").innerText = "0";

                $ui = `<p class="counter-note">Tədbir artıq başlayıb!</p>`;
                $('#countdown .container').prepend($ui);

                clearInterval(x);
            }
            //seconds
        }, 0);

    $('.menu-list a').click(function (e) {
        e.preventDefault();
        let fixedHeight = $('.secondary-header').outerHeight();
        let id = $(this).attr("href");
        $("html, body").animate({ scrollTop: $(id).offset().top - fixedHeight + 1 }, 0);
        $(this).addClass('active');
    });


    if ($(window).width() > 1200 && $('.speakers-wrapper .col-xl-3').length == 6) {
        $('.speakers-wrapper .col-xl-3:first-child, .speakers-wrapper .col-xl-3:nth-child(4)').addClass('vertical-center');
    }

    if ($(window).width() < 1200) {
        $('#countdown .row').removeClass('gx-5');
    }

    $(window).resize(function () {
        if ($(window).width() < 1200) {
            $('#countdown .row').removeClass('gx-5');
            $('.speakers-wrapper .col-xl-3:first-child, .speakers-wrapper .col-xl-3:nth-child(4)').removeClass('vertical-center');
        } else {
            $('#countdown .row').addClass('gx-5');
            if ($('.speakers-wrapper .col-xl-3').length == 6) {
                $('.speakers-wrapper .col-xl-3:first-child, .speakers-wrapper .col-xl-3:nth-child(4)').addClass('vertical-center');
            }
        }
    });

    $("#header .menu-toggle").click(function () {
        $(".mobile-menu").toggleClass("active");
    });

    $(".mobile-menu").click(function (event) {
        if ($(event.target).is(this)) {
            $(this).removeClass("active")
        }
    });

    $('.menu-list.mobile li a').click(function () {
        $(".mobile-menu").removeClass("active");
    });

})();

$(window).on('load', function () {
    $('.preloader img').fadeOut(250);
    $('.preloader').delay(250).fadeOut(400);
    getCurSection();
    $windowTop = $(window).scrollTop();
    $offset = $("#header").height();
    $modalFlag = false;

    if ($windowTop > $offset)
        $('#header').addClass('fixed');

    $(window).scroll(function () {
        getCurSection();
        if ($(this).scrollTop() > $offset) {
            $('#header').addClass('fixed');
        } else {
            $('#header').removeClass('fixed');
        }

        if ($(this).scrollTop() > 200 && !$modalFlag) {
            $('#covidModal').modal('show');
            $modalFlag = true;
        }

        if ($(window).scrollTop() + $(window).height() == $(document).height()) {
            if (!$('#header .menu-list li:last-child a').hasClass('active')) {
                $('#header .menu-list a').removeClass('active');
                $('#header .menu-list li:last-child a').addClass('active');
            }
        }

    });

    function getCurSection() {
        let allSection = $("section");
        let fixedHeight = $('.secondary-header').outerHeight();
        let scrollTop = $(window).scrollTop();
        allSection.each(function () {
            let section = $(this);
            if (section.offset().top - fixedHeight <= scrollTop && scrollTop <= section.offset().top + section.outerHeight() - fixedHeight) {
                let targetID = section.attr("id");
                $('.menu-list a').not($(this)).removeClass("active");
                $('.menu-list a[data-id="' + targetID + '"]').addClass("active");
            }
        });
    }
});

