// ==UserScript==
// @name        VK music downloader
// @namespace   new.vk.com
// @include     https://vk.com/*
// @version     2
// @grant       none
// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  // Note, jQ replaces $ to avoid conflicts.
  jQ(document).on("click", ".audio_row", function(event){
    var row = this;
    
    setTimeout(function(){
      var fileLocation = getAudioPlayer().getCurrentAudio()[2];
      var fileName = getAudioPlayer().getCurrentAudio()[3];
      if(fileLocation) {
        // get row id
        var rowId = jQ(row).attr("id");
        var downloadLinkId = "download"+rowId;
        // if not found, append link
        if(jQ("#"+downloadLinkId).length == 0) {
          jQ(row).find('.audio_info').append('<div id="'+ downloadLinkId +'" class="audio_title_wrap">Download <a target="_blank" href="'+ fileLocation +'">'+ fileName +'</a></div>');
        }
      }
    }, 500);
  });
}
// load jQuery and execute the main function
addJQuery(main);