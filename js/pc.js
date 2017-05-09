$(function(){ // document ready
    $("#pcviz-form").submit(function() {
        var geneTxt = $("#pcviz-gene-text").val();
        if(geneTxt.search(",") > 0) {
            // comma separators, clean-up the spaces
            geneTxt = geneTxt.replace(/ /g, " ");
        } else if (geneTxt.search(" ") > 0) {
            // space separators, replace them with commas
            geneTxt = geneTxt.replace(/ /g, ",");
        } else { /* nothing */ }

        window.location = "http://www.pathwaycommons.org/pcviz/#neighborhood/" + geneTxt;
        return false;
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
