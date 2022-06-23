$(function(){ // document ready

  var env = 'beta';

  // URL for PC resource links
  var pcBaseUrl = "https://www.pathwaycommons.org/";
  var pcBaseUrlBeta = "https://beta.pathwaycommons.org/";
  var pcAppsBaseUrl = "https://apps.pathwaycommons.org/";
  var pcAppsBaseUrlBeta = "https://appsbeta.pathwaycommons.org/";

  $(".pc-url").each(function(i, a) {
    var e = $(a);
    var baseUrl = pcBaseUrl;
    if( e.hasClass( 'has-beta' ) && env != 'production' ) {
        baseUrl = pcBaseUrlBeta;
    }
    e.attr('href', baseUrl+e.attr('href'));
  });

  $(".apps-url").each(function(i, a) {
    var e = $(a);
    var baseUrl = pcAppsBaseUrl;
    if( e.hasClass( 'has-beta' ) && env != 'production' ) {
        baseUrl = pcAppsBaseUrlBeta;
    }
    e.attr('href', baseUrl+e.attr('href'));
  });

  $(".on-beta").each(function(i, a) {
    if( env == 'production' ) $(a).css("display", "none");
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
      var baseUrl = env != 'production' ? pcAppsBaseUrlBeta : pcAppsBaseUrl;
      window.open(`${baseUrl}search?type=Pathway&q=` + encodeURIComponent(geneTxt), "_blank");
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
    elements: ["#search", "#pcviz", "#training", "#data", "#tools", "#faq", "#contact"],
    percentage: false,
    userTiming: false,
    pixelDepth: false,
    nonInteraction: false
  });

});
