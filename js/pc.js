$(function(){ // document ready

    $("#explore-form button").click(function() {
        var geneTxt = $("#gene-text").val();
        if(geneTxt.search(",") > 0) {
            // comma separators, clean-up the spaces
            geneTxt = geneTxt.replace(/ /g, " ");
        } else if (geneTxt.search(" ") > 0) {
            // space separators, replace them with commas
            geneTxt = geneTxt.replace(/ /g, ",");
        } else { /* nothing */ }

        window.location = "http://beta.pathwaycommons.org/pcviz/#neighborhood/" + geneTxt;
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

    // Initialize data-tables
    $.extend( $.fn.dataTableExt.oStdClasses, {
        "sWrapper": "dataTables_wrapper form-inline"
    });

    $('#citation-table').dataTable({
        "sDom": "<'row'<'span5'l><'span5'f>r>t<'row'<'span5'i><'span5'p>>",
	"aaSorting": [[ 3, "desc" ], [1, "asc"] ],
	"sPaginationType": "bootstrap"
    });

    $("#announcement").hide().slideDown(1000);
    $("#announcement-close").click(function(e) { 
        e.preventDefault();
        $("#announcement").fadeOut();
    });
});
