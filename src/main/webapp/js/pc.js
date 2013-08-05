$(function(){ // document ready
    if (!!$('.sticky').offset()) { // make sure ".sticky" element exists
        var stickyTop = $('.sticky').offset().top; // returns number
        $(window).scroll(function(){ // scroll event
            var windowTop = $(window).scrollTop(); // returns number
            if (stickyTop < windowTop) {
                $('.sticky').css({ position: 'fixed', top: 5 });
            } else {
                $('.sticky').css('position','static');
            }
        });
    }

    $("#explore-form").submit(function() {
        window.location
            = "http://awabi.cbio.mskcc.org/cpath2-demo/#neighborhood/" + $("#gene-text").val().replace(/ /g, "");
        return false;
    });
});
