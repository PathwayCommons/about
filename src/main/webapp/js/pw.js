$(function(){ // document ready

    $("#find-form").submit(function() {
    	var keyword = $("#keyword-text").val();
    	
    	if(keyword)
    		window.location = "pathways.html?find=" + encodeURIComponent(keyword);
    	
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
    
    
    // Query PC2 web service - search for pathways
    $(function() {
    	var keyword = urlParam('find');
    	$("#keyword-text").val(keyword);
    	
    	//TODO get top_pathways or search for pathways, and update '#pathways-list'
    	
    	return false;
    });

});

function urlParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
