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
    // Event handler for all .ga classed elements
    $(".ga").on('click',function(e){
      var
        self,
        category = "",
        action = "click",
        label = "",
        self = $(this),
        send = true
        ;

      if(self.hasClass("ga-publications"))
      {
        category = "Publications";
        label = self.text();
      }
      else if(self.hasClass("ga-apps"))
      {
        category = "Apps";
        label = self.text();
      }
      else if(self.hasClass("ga-faq"))
      {
        category = "FAQ";
        label = self.children("h4").text();
      }
      else if(self.hasClass("ga-contact"))
      {
        category = "Contact";
        self.children("i").attr("class", function(i, val){
          //make sure the second element is classed fa-<label>...
          if(val) label = val.split(" ")[0];
        });
      }
      else
      {
        send = false;
      }

      if(send){
        ga('send', 'event', category, action, label);
        //console.info("Event - Category: %s; Action: %s; Label: %s", category, action, label);
      }

    });

    // Google Analytics depth tracking plugin (scrolldepth.parsnip.io/)
    jQuery.scrollDepth({
      minHeight: 0,
      elements: ["#apps", "#faq", "#publications", "#contact"],
      percentage: false,
      userTiming: false,
      pixelDepth: false,
      nonInteraction: false
    });

});
