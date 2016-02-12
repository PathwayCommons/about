$(function(){ // document ready

    $("#explore-form").submit(function() {
        var geneTxt = $("#gene-text").val();
        if(geneTxt.search(",") > 0) {
            // comma separators, clean-up the spaces
            geneTxt = geneTxt.replace(/ /g, " ");
        } else if (geneTxt.search(" ") > 0) {
            // space separators, replace them with commas
            geneTxt = geneTxt.replace(/ /g, ",");
        } else { /* nothing */ }

        window.location
            = "http://sanderlab.org/pcviz/#neighborhood/" + geneTxt;
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
    

    /*  Use the PC2 web api (/log) to set the numbers on the page:
     *	 - total no. requests (excluding errors);
     *   - total no. unique client IPs;  
     *   TODO use http://pathwaycommons.baderlab.org/log/ when testing. Also, switch to ELK, Kibana once ready...
     */  
   	// AJAX calls to the remote PC2 server should work because PC2 supports CORS
   	$.getJSON('http://www.pathwaycommons.org/pc2/log/totalok', function(tok) {
   		$('.pc2_tok').text(tok);
   	}).error(function() {$('.pc2_tok').text(0);});
    	
   	$.getJSON('http://www.pathwaycommons.org/pc2/log/totalip', function(tip) {
   		$('.pc2_tip').text(tip);
   	}).error(function() {$('.pc2_tip').text(0);});


    $("#announcement").hide().slideDown(1000);
    $("#announcement-close").click(function(e) { 
        e.preventDefault();
        $("#announcement").fadeOut();
    });
});
