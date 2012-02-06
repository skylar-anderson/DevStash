(function() {

  "use strict";

  var DevStash = {

    getCacheItem: function(key) {

      if(localStorage && localStorage.getItem && localStorage.getItem(key) && localStorage.loadFromCache) {

        this.log("--[ Loading From Cache ]-- " + key);
        this.log(JSON.parse(localStorage.getItem(key)));

        return JSON.parse(localStorage.getItem(key));  

      } else {

        return false;

      }

    },
    setCacheItem: function(key, obj) {

      if(localStorage && localStorage.setItem && localStorage.writeToCache) {

        this.log("--[ Saving To Cache ]-- " + key);
        this.log(obj);

        localStorage.setItem(key, JSON.stringify(obj));  

      }

    },
    capture: function(debug) {

      localStorage.debugCache = debug;

      delete localStorage.loadFromCache;
      localStorage.writeToCache = true;

      location.reload(true);      

    },
    load: function(debug) {

      localStorage.debugCache = debug;

      delete localStorage.writeToCache;
      localStorage.loadFromCache = true;

      location.reload(true);      

    },
    loadFromCache: function() {
      return localStorage && localStorage.loadFromCache;
    },
    writeToCache: function() {
      return localStorage && localStorage.writeToCache;
    },
    cleanKey: function(k) {
      return k.replace(/.*\/rest/, '/rest');
    },
    log: function(stuff) {
      if(console && console.log && localStorage && localStorage.debugCache) {
        console.log(stuff);
      }
    }


  };

  var aj = $.ajax; 

  $.ajax = function(options) {

    var key = DevStash.cleanKey(options.url);
    var oSuccess = options.success;
    var oBeforeSend = options.beforeSend;

    var newOptions = {

      beforeSend: function() {

        if(DevStash.loadFromCache() && DevStash.getCacheItem(key)) {

          var successData = DevStash.getCacheItem(key);
          setTimeout(function() {
            oSuccess(successData.data, successData.textStatus, successData.jqXHR);          
          }, 0);

          return false;

        } else {

          return typeof oBeforeSend === 'function' ? oBeforeSend.apply(this, arguments) : true;

        }

      },
      success: function(data, textStatus, jqXHR) {

        if(DevStash.writeToCache()) {

          DevStash.setCacheItem(key, {
            data: data,
            textStatus:textStatus,
            jqXHR: jqXHR
          });  

        }

        if(typeof oSuccess === 'function') {

          oSuccess.apply(this, arguments);          

        }

      }
    };

    aj($.extend({}, options, newOptions));

  };

  window.DevStash = DevStash;
  
}());