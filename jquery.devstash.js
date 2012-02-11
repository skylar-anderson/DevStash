/*!
 * DevStash v1.0.0
 * http://devstash.it
 * https://github.com/sandersonet/DevStash
 *
 * Author: Skylar Anderson
 * anderson@skylar.me
 */
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
      return k;
    },
    log: function(stuff) {
      if(console && console.log && localStorage && localStorage.debugCache) {
        console.log(stuff);
      }
    }


  };

  var aj = jQuery.ajax; 

  jQuery.ajax = function(options) {

    var key,
    oSuccess,
    oBeforeSend,
    parameters;

    if(typeof options === "string") {

      key = options;
      parameters = { url: key };

    } else if(typeof options === "object") {      

      parameters = options;
      key = options.url;
      oSuccess = options.success;
      oBeforeSend = options.beforeSend;

    }

    var newOptions = {

      beforeSend: function() {

        var successData = DevStash.getCacheItem(key);

        if(DevStash.loadFromCache() && successData) {

          if(typeof oSuccess === 'function') {

            setTimeout(function() {
              oSuccess(successData.data, successData.textStatus, successData.jqXHR);          
            }, 5);  

          } else if(typeof $.ajaxSettings.success === "function") {

            setTimeout(function() {
              $.ajaxSettings.success(successData.data, successData.textStatus, successData.jqXHR);          
            }, 5);  

          }
                    
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

          return oSuccess.apply(this, arguments);          

        }

      }
    };

    return aj(jQuery.extend({}, parameters, newOptions));

  };

  $.extend({
    DevStash: function(func, arg) {
      switch(func) {
        case "load":
          DevStash.load(arg);
          break;
        case "capture":
          DevStash.capture(arg);
          break;
      }
    }
  })
  
}());