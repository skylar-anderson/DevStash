DevStash is a useful tool for expediting local user interface development.
----------

DevStash is a jQuery plugin that extends jQuery.ajax(), allowing you to store a cache of AJAX requests that can later be used for "instant" loading of your local app.  DevStash is prefect for UI developers building large-scale AJAX driven Javascrupt UI's.  With DevStash enabled, pages will begin refreshing immediately and you can even work 'offline'.  DevStash even works with higher level frameworks like Backbone.js or Knockout.js.


Installing DevStash
----------

DevStash attaches itself to jQuery AJAX, so to install, all you need to do is ensure you load DevStash.js **after** jQuery but **before** you make any AJAX requests. Simply refer to the contents of the script after loading jQuery but before making any AJAX calls and you will begin being able to record the responses of all XHR's on the current domain..


Begin Recording your XHR cache
----------

Once the script is loaded, you can begin recording XHR's by entering the following in your JS console:

    $.DevStash("capture"); // Begin capturing XHR requests

The current page should then refresh, and all subsequent XHR requests will be recorded for this domain.


Using your XHR cache
----------

Once you have recorded enough XHR's to be useful for your development and you are ready to begin using your cache, simply enter the following in your JS console:

    $.DevStash("load");  // Use local cache if the requested URL has been cached.

   
Debugging DevStash.js
----------

Both capture and load receive an optional parameter 'debug' which dictates whether to output to the browser console or not when loading/capturing cache.

	$.DevStash("capture", true);
	$.DevStash("load", true);

If your code attempts to request an XHR that hasn't yet been recorded, a traditional XHR request will be performed.