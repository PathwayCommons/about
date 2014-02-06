$(function(){ // document ready

    $("#find-form").submit(function() {
        //TODO
        return false;
    });

    $("a.smooth-scroll").click(function(e) {
        e.preventDefault();

        var whereTo = $($(this).attr("href")).offset().top - 5;

        $('html, body').animate({
            scrollTop: whereTo
        }, 500);
    });

    $("a.top-scroll").click(function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 300);
    });

    $(".tile .btn").each(function() {
        var button = this;
        var btnLink = $(this).attr("href");

        $(button).parent().click(function(e) {
            e.preventDefault();
            window.open(btnLink, "_blank");
        });
    });

    // Track outbound links in Google Analytics
    $(function() {
        $("a, button").on('click',function(e){
            var url = $(this).attr("href");
            ga('send', 'event', 'link', window.location.href, url);
        });
    });

});
