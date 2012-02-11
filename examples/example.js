$(document).ready(function($){
  
  var defers = [];
  var start = new Date().getTime();
  var end;
  var urls = [
    "http://search.twitter.com/search.json?q=backbone.js&result_type=mixed",
    "http://search.twitter.com/search.json?q=javascript&result_type=mixed",
    "http://search.twitter.com/search.json?q=jquery&result_type=mixed",
    "http://search.twitter.com/search.json?q=html&result_type=mixed",
    "http://search.twitter.com/search.json?q=css&result_type=mixed",
    "http://search.twitter.com/search.json?q=google&result_type=mixed",
    "http://search.twitter.com/search.json?q=facebook&result_type=mixed",
    "http://search.twitter.com/search.json?q=twitter&result_type=mixed",
    "http://search.twitter.com/search.json?q=github&result_type=mixed",
    "http://search.twitter.com/search.json?q=linkedin&result_type=mixed",
    "http://search.twitter.com/search.json?q=reddit&result_type=mixed",
    "http://search.twitter.com/search.json?q=pinterest&result_type=mixed",
    "http://search.twitter.com/search.json?q=chrome&result_type=mixed",
    "http://search.twitter.com/search.json?q=firefox&result_type=mixed",
    "http://search.twitter.com/search.json?q=safari&result_type=mixed",
    "http://search.twitter.com/search.json?q=apple&result_type=mixed",
    "http://search.twitter.com/search.json?q=microsoft&result_type=mixed",
  ];
  var output = $("#output");

  var log = function(stuff) {
    output.append($("<div class='line'>"+stuff+"</div>"));
  }

  if(localStorage && localStorage.writeToCache) {
    log("<strong>Loading From Web ...</strong>");
  } else if(localStorage && localStorage.loadFromCache) {
    log("<strong>Loading From Cache ...</strong>");
  }

  $.ajaxSetup({
    type: "GET",
    dataType: "jsonp",
  });

  var getNextURL = function(i) {
    
    var start = new Date().getTime();
    var index = i || 0;

    $.ajax({
      url: urls[index],
      success: function() {

        var elapsed = new Date().getTime() - start;
        log("<i>" + urls[index] + "</i> loaded in " + elapsed + 'ms');

        if(urls[index + 1]) {
          getNextURL(index+1)
        } else {
          onFinish();
        }

      }  
    });

  }

  var onFinish = function() {
    var elapsed = new Date().getTime() - start;
    log("<strong>Total time elapsed: " + elapsed + 'ms</strong>');    
  }

  getNextURL();

});

