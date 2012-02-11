DevStash is a useful tool for expediting local development.
----------
DevStash requires jQuery to operate.  Simply refer to the contents of the script after loading jQuery but before making any AJAX calls and you will begin being able to record the responses of all XHR's on the current domain..


Recording your XHR cache
----------
Once the script is loaded, you can begin recording XHR's by entering the following in your JS console:

    $.DevStash("capture"); // Begin capturing XHR requests

The current page should then refresh, and all subsequent XHR requests will be recorded for this domain.


Using your XHR cache
----------
Once you have recorded enough XHR's to be useful for your development and you are ready to begin using your cache, simply enter the following in your JS console:

    $.DevStash.("load");  // Use local cache if the requested URL has been cached.

   
Debugging DevStash.js
----------
Both captujre and load receive an optional parameter 'debug' which dictates whether to output to the browser console or not.

	$.DevStash.("capture", true);
	$.DevStash.("load", true);

If your code attempts to request an XHR that hasn't yet been recorded, a traditional XHR request will be performed.