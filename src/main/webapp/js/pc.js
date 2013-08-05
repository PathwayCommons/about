$(function(){ // document ready

    $("#explore-form").submit(function() {
        window.location
            = "http://awabi.cbio.mskcc.org/cpath2-demo/#neighborhood/" + $("#gene-text").val().replace(/ /g, "");
        return false;
    });
});
