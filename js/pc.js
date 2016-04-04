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

    $("#pcviz-form").submit(function() {
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

    // Initialize dataTables
    // Add the 'paginate' class to pagingation module
    $('#citation-table').DataTable({
      searching: true,
      ordering:  true,
      paging: true
    });

    $("#announcement").hide().slideDown(1000);
    $("#announcement-close").click(function(e) { 
        e.preventDefault();
        $("#announcement").fadeOut();
    });

    // Google Analytics
    $(function() {

      // a.ga-publication
      // must conform to <a class="ga-publication" href="" >title</a>
      $("a, button").on('click',function(e){
        var url = $(this).attr("href");
        console.log("Click event: " + url);
        ga('send',
          'event',              // Slot as event
          'link',               // Category
          window.location.href, // Action
          url);                 // Label
      });

      //

    });

});
