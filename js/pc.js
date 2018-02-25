$(function(){ // document ready

  // URL prefix for PC resource links on the main page:
  var pcBaseUrl = "http://www.pathwaycommons.org/";
  $(".pc-url").each(function(i, a) {
    var e = $(a);
    e.attr('href', pcBaseUrl+e.attr('href'));
  });

  $("#pcviz-form").submit(function() {
      var geneTxt = $("#pcviz-gene-text").val();
      if(geneTxt.search(",") > 0) {
          // comma separators, clean-up the spaces
          geneTxt = geneTxt.replace(/ /g, " ");
      } else if (geneTxt.search(" ") > 0) {
          // space separators, replace them with commas
          geneTxt = geneTxt.replace(/ /g, ",");
      } else { /* nothing */ }

      window.open(pcBaseUrl + "pcviz/#neighborhood/" + geneTxt, "_blank");
      return false;
  });

  $("#pathway-search-form").submit(function() {
      var geneTxt = $("#pathway-search-query-text").val();
      window.open("http://apps.pathwaycommons.org/search?type=Pathway&q=" + encodeURIComponent(geneTxt), "_blank");
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
    else if(self.hasClass("ga-training"))
    {
      category = "Training";
      label = self.find(".pc-list-group-item-text .pc-list-group-item-title").text();
    }
    else if(self.hasClass("ga-data"))
    {
      category = "Data";
      label = self.find(".pc-list-group-item-text .pc-list-group-item-title").text();
    }
    else if(self.hasClass("ga-tools"))
    {
      category = "Tools";
      label = self.find(".pc-list-group-item-text .pc-list-group-item-title").text();
    }
    else if(self.hasClass("ga-faq"))
    {
      category = "FAQ";
      label = self.find(".faq-question").text();
    }
    else if(self.hasClass("ga-contact"))
    {
      category = "Contact";

      if(self.hasClass("ga-social")){
        self.children("i").attr("class", function(i, val){
          if(val) label = val.split(" ")[0];
        });
      } else {
        label = self.text();
      }
    }
    else
    {
      send = false;
    }

    if(send){
      ga('send', 'event', category, action, label);
      console.info("Event - Category: %s; Action: %s; Label: %s", category, action, label);
    }

  });

  // Google Analytics depth tracking plugin (scrolldepth.parsnip.io/)
  jQuery.scrollDepth({
    minHeight: 0,
    elements: ["#apps", "#training", "#data", "#tools", "#faq", "#contact"],
    percentage: false,
    userTiming: false,
    pixelDepth: false,
    nonInteraction: false
  });

});
